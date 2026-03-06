#!/usr/bin/env bash
set -euo pipefail

# Move to repo root (script can be run from anywhere)
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." &>/dev/null && pwd)"
cd "$REPO_ROOT"

# -------- helpers --------
log() { printf "\n[%s] %s\n" "$(date '+%H:%M:%S')" "$*"; }
die() { printf "\nERROR: %s\n" "$*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

confirm() {
  read -r -p "$1 [y/N] " reply
  case "${reply:-}" in
    y|Y|yes|YES) return 0 ;;
    *) return 1 ;;
  esac
}

# -------- preflight --------
need_cmd node
need_cmd npm

if [ ! -f "package.json" ]; then
  die "package.json not found. Are you in the project root?"
fi

# -------- prisma check --------
log "Checking Prisma CLI..."

if ! npx prisma -v >/dev/null 2>&1; then
  die "Prisma CLI not found. Install it with: npm install -D prisma"
fi

log "Prisma CLI OK."

# -------- DB connectivity --------
log "Checking database connectivity..."

if ! npx prisma db pull >/dev/null 2>&1; then
  die "Database connection failed. Check DATABASE_URL."
fi

log "Database connection OK."

# -------- migration status --------
log "Checking migrations..."

STATUS_FILE=$(mktemp)

set +e
npx prisma migrate status >"$STATUS_FILE" 2>&1
STATUS_CODE=$?
set -e

cat "$STATUS_FILE"

if [ $STATUS_CODE -ne 0 ]; then
  rm -f "$STATUS_FILE"
  die "prisma migrate status failed."
fi

if grep -Eqi "pending|not yet been applied|have not been applied" "$STATUS_FILE"; then
  rm -f "$STATUS_FILE"

  log "Pending migrations detected."

  if confirm "Run migrations now?"; then
    log "Running migrations..."
    npx prisma migrate dev
    log "Migrations applied."
  else
    die "Pending migrations. Run 'npx prisma migrate dev'."
  fi
else
  rm -f "$STATUS_FILE"
  log "Migrations are up to date."
fi

# -------- build --------
log "Building project..."
npm run build

# -------- start --------
log "Starting dev server..."

exec npx nodemon --exec tsx src/main/server.ts
