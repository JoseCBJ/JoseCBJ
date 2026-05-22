import { Card } from './ui/card';
import { Input } from './ui/input';
import { Calendar, Users, FileText, Search, Bell, LogOut, Stethoscope, Clock } from 'lucide-react';
import { mockAppointments, mockPatients } from '../lib/mockData';

interface NewProfessionalDashboardProps {
  onViewPatient: (patientId: string) => void;
  onNewAppointment: () => void;
  onViewMonthlySchedule: () => void;
  onManagePrescriptions: () => void;
  onViewDailyActivities: (patientId: string, date: string) => void;
  onManageMySchedule?: () => void;
  onStartDailySchedule?: () => void;
  onOpenDailyScheduleWithPatient?: (appointmentId: string) => void;
}

export function NewProfessionalDashboard({ 
  onViewPatient, 
  onNewAppointment, 
  onViewMonthlySchedule,
  onManagePrescriptions,
  onViewDailyActivities,
  onManageMySchedule,
  onStartDailySchedule,
  onOpenDailyScheduleWithPatient
}: NewProfessionalDashboardProps) {
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2025-11-01');
  const activePatientsCount = mockPatients.length;
  const prescriptionsCount = 15;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base">Portal do Profissional</h1>
                <p className="text-xs text-gray-500">APAE - Sistema de Saúde</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Consultas Hoje</p>
                <p className="text-4xl">{todayAppointments.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Pacientes Ativos</p>
                <p className="text-4xl">{activePatientsCount}</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Receitas Emitidas</p>
                <p className="text-4xl">{prescriptionsCount}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Patient */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Buscar Paciente</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Nome, CPF ou prontuário..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={onStartDailySchedule}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Iniciar Agenda Diária</p>
                    <p className="text-xs text-gray-500">Consultas de hoje</p>
                  </div>
                </button>
                <button 
                  onClick={onManagePrescriptions}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Gerenciar Receitas</p>
                    <p className="text-xs text-gray-500">Prescrições e renovações</p>
                  </div>
                </button>
                <button 
                  onClick={onViewMonthlySchedule}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Ver Agenda do Mês</p>
                    <p className="text-xs text-gray-500">Visualização mensal</p>
                  </div>
                </button>
                <button 
                  onClick={() => onViewDailyActivities('1', '2025-11-01')}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Atividades do Dia</p>
                    <p className="text-xs text-gray-500">Ver atividades do paciente</p>
                  </div>
                </button>
                {onManageMySchedule && (
                  <button 
                    onClick={onManageMySchedule}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                  >
                    <div className="p-2 bg-gray-100 rounded">
                      <Clock className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Abrir Agenda Profissional</p>
                      <p className="text-xs text-gray-500">Configurar disponibilidade</p>
                    </div>
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div>
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-4 w-4 text-gray-600" />
                <h2 className="text-base">Agenda de Hoje</h2>
              </div>
              <div className="space-y-4">
                {todayAppointments.slice(0, 5).map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => onOpenDailyScheduleWithPatient && onOpenDailyScheduleWithPatient(appointment.id)}
                    className="w-full pb-4 border-b border-gray-100 last:border-0 last:pb-0 text-left hover:bg-gray-50 rounded-lg px-2 py-2 -mx-2 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        appointment.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        appointment.status === 'in-progress' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {appointment.status === 'completed' ? 'Concluída' :
                         appointment.status === 'in-progress' ? 'Retorno' :
                         'Consulta'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 hover:text-emerald-600 transition-colors">{appointment.patientName}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}