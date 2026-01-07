export default function SettingsLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 border-r border-border bg-card p-6 animate-pulse">
        <div className="h-10 bg-secondary rounded mb-8" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-secondary rounded" />
          ))}
        </div>
      </div>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-12 bg-secondary rounded animate-pulse" />
          <div className="h-64 bg-secondary rounded animate-pulse" />
          <div className="h-48 bg-secondary rounded animate-pulse" />
        </div>
      </main>
    </div>
  )
}
