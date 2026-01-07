"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Save, User, Bell, Lock, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [reminderTime, setReminderTime] = useState("24")

  const handleSaveSettings = () => {
    console.log("[v0] Saving settings...")
    // Save settings logic here
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Configurações</h1>
              <p className="text-muted-foreground mt-1">Gerencie suas preferências e configurações do sistema</p>
            </div>
            <Button onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          {/* Profile Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle className="text-foreground">Perfil Profissional</CardTitle>
              </div>
              <CardDescription>Informações sobre seu perfil profissional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Dr. Silva" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crp">CRP</Label>
                  <Input id="crp" defaultValue="06/123456" className="bg-background border-border" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="dr.silva@email.com"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 98765-4321" className="bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input id="specialty" defaultValue="Psicologia Clínica" className="bg-background border-border" />
              </div>
            </CardContent>
          </Card>

          {/* Appointment Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle className="text-foreground">Configurações de Agendamento</CardTitle>
              </div>
              <CardDescription>Defina suas preferências para consultas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-duration">Duração Padrão da Sessão</Label>
                  <Select defaultValue="50">
                    <SelectTrigger id="session-duration" className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="50">50 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-value">Valor da Sessão</Label>
                  <Input id="session-value" defaultValue="R$ 150,00" className="bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="working-hours">Horário de Atendimento</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input id="start-time" type="time" defaultValue="08:00" className="bg-background border-border" />
                  <Input id="end-time" type="time" defaultValue="18:00" className="bg-background border-border" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="text-foreground">Notificações</CardTitle>
              </div>
              <CardDescription>Configure como deseja receber lembretes e notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">Receba lembretes de consultas por email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">Receba lembretes de consultas por SMS</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Tempo de Antecedência do Lembrete</Label>
                <Select value={reminderTime} onValueChange={setReminderTime}>
                  <SelectTrigger id="reminder-time" className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora antes</SelectItem>
                    <SelectItem value="2">2 horas antes</SelectItem>
                    <SelectItem value="24">24 horas antes</SelectItem>
                    <SelectItem value="48">48 horas antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                <CardTitle className="text-foreground">Segurança</CardTitle>
              </div>
              <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" className="bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" className="bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" className="bg-background border-border" />
              </div>
              <Button variant="outline">Alterar Senha</Button>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle className="text-foreground">Faturamento</CardTitle>
              </div>
              <CardDescription>Informações de pagamento e plano</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div>
                  <p className="font-medium text-foreground">Plano Profissional</p>
                  <p className="text-sm text-muted-foreground">R$ 99,00/mês</p>
                </div>
                <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
              </div>
              <div className="space-y-2">
                <Label>Método de Pagamento</Label>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expira em 12/2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Alterar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
