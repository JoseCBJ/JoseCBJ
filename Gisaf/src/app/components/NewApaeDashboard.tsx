import { Card } from './ui/card';
import { Users, Activity, Calendar, UserPlus, Bell, LogOut, Building2, FileText, Star, Clock, CalendarPlus } from 'lucide-react';
import { mockPatients, mockProfessionals, mockAppointments } from '../lib/mockData';

interface NewApaeDashboardProps {
  onManagePatients: () => void;
  onManageProfessionals: () => void;
  onManageSchedule: () => void;
  onAddPatient: () => void;
  onAddProfessional: () => void;
  onViewActivities: () => void;
  onViewFeedbacks: () => void;
  onNewMedicalRecordForm?: () => void;
  onCreateAppointment?: () => void;
  onManageAppointments?: () => void;
  onScheduleManagement?: () => void;
  onCreateSchedule?: () => void;
}

export function NewApaeDashboard({ 
  onManagePatients,
  onManageProfessionals,
  onManageSchedule,
  onAddPatient,
  onAddProfessional,
  onViewActivities,
  onViewFeedbacks,
  onNewMedicalRecordForm,
  onCreateAppointment,
  onManageAppointments,
  onScheduleManagement,
  onCreateSchedule
}: NewApaeDashboardProps) {
  const totalPatients = mockPatients.length;
  const activeProfessionals = mockProfessionals.length;
  const monthAppointments = mockAppointments.length * 8; // Simulating monthly data

  const recentActivities = [
    { title: 'Novo paciente cadastrado', time: '10 min atrás' },
    { title: 'Consulta agendada para Dr. Silva', time: '23 min atrás' },
    { title: 'Avaliação recebida (5 estrelas)', time: '1 hora atrás' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base">Portal Administrativo</h1>
                <p className="text-xs text-gray-500">APAE - Cidade do Sudeste</p>
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
                <p className="text-sm text-gray-600 mb-2">Total de Pacientes</p>
                <p className="text-4xl">{totalPatients}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Profissionais Ativos</p>
                <p className="text-4xl">{activeProfessionals}</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Activity className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Consultas do Mês</p>
                <p className="text-4xl">{monthAppointments}</p>
              </div>
              <div className="p-2 bg-cyan-50 rounded-lg">
                <Calendar className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Management */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Gestão Rápida</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={onNewMedicalRecordForm}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Cadastrar Paciente</p>
                    <p className="text-xs text-gray-500">Novo registro no sistema</p>
                  </div>
                </button>

                <button 
                  onClick={onAddProfessional}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <UserPlus className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Cadastrar Profissional</p>
                    <p className="text-xs text-gray-500">Adicionar ao corpo clínico</p>
                  </div>
                </button>

                <button 
                  onClick={onCreateSchedule}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <CalendarPlus className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Criação de Agenda</p>
                    <p className="text-xs text-gray-500">Configurar nova agenda</p>
                  </div>
                </button>

                <button 
                  onClick={onCreateAppointment}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Criar Consulta</p>
                    <p className="text-xs text-gray-500">Nova consulta no sistema</p>
                  </div>
                </button>

                <button 
                  onClick={onManageAppointments}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Gestão Consultas</p>
                    <p className="text-xs text-gray-500">Visualizar e gerenciar</p>
                  </div>
                </button>
              </div>
            </Card>

            {/* Management Modules */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Módulos de Gestão</h2>
              <div className="space-y-3">
                <button 
                  onClick={onCreateSchedule}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <CalendarPlus className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Criação de Agenda</span>
                </button>
                <button 
                  onClick={onScheduleManagement}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <CalendarPlus className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Gestão de Agenda</span>
                </button>
                <button 
                  onClick={onManagePatients}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Gestão de Pacientes</span>
                </button>
                <button 
                  onClick={onManageProfessionals}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <Activity className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Gestão de Profissionais</span>
                </button>
                <button 
                  onClick={onViewActivities}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Gestão de Atividades</span>
                </button>
                <button 
                  onClick={onManageAppointments}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Gestão Consultas</span>
                </button>
                <button 
                  onClick={onManageSchedule}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Controle de Agendamentos</span>
                </button>
                <button 
                  onClick={onViewFeedbacks}
                  className="flex items-center gap-3 p-3 w-full border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-left"
                >
                  <Star className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Visualizar Feedbacks</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div>
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Atividades Recentes</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}