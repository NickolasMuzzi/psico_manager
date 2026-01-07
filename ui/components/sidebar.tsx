"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Users, FileText, Settings, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "appointments", label: "Agendamentos", icon: Calendar, href: "/agendamentos" },
    { id: "patients", label: "Pacientes", icon: Users, href: "/pacientes" },
    { id: "sessions", label: "Atendimentos", icon: FileText, href: "/atendimentos" },
    { id: "settings", label: "Configurações", icon: Settings, href: "/settings" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">PsicoManager</h2>
          <p className="text-xs text-muted-foreground">Gestão Clínica</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-sm font-medium text-foreground mb-1">Dica do Dia</h3>
        <p className="text-xs text-muted-foreground">
          Mantenha suas anotações organizadas para um melhor acompanhamento dos pacientes.
        </p>
      </div>
    </aside>
  )
}
