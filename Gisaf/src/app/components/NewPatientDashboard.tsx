import { Card } from './ui/card';
import { Calendar, FileText, Star, Bell, LogOut, Heart, Clock, CheckCircle2, Users } from 'lucide-react';
import { mockAppointments, mockPrescriptions } from '../lib/mockData';

interface NewPatientDashboardProps {
  patientId: string;
  onViewHistory: () => void;
  onEvaluateAppointments: () => void;
  onViewPrescriptions: () => void;
  onManageDependents: () => void;
}

export function NewPatientDashboard({ 
  patientId,
  onViewHistory,
  onEvaluateAppointments,
  onViewPrescriptions,
  onManageDependents
}: NewPatientDashboardProps) {
  const currentPatientId = patientId || '1';
  
  const patientAppointments = mockAppointments.filter(
    apt => apt.patientId === currentPatientId
  );
  
  const upcomingAppointments = patientAppointments.filter(
    apt => apt.status === 'scheduled'
  ).slice(0, 3);
  
  const completedCount = patientAppointments.filter(
    apt => apt.status === 'completed'
  ).length;

  const activePrescriptions = mockPrescriptions.filter(
    presc => presc.patientId === currentPatientId && presc.status === 'active'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base">Portal do Paciente</h1>
                <p className="text-xs text-gray-500">APAE - Acompanhamento</p>
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
        {/* Welcome Banner */}
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-8 shadow-lg">
          <h2 className="text-xl mb-2">Olá, Maria Santos! 👋</h2>
          <p className="text-sm opacity-90">Acompanhamento de Lucas Oliveira Santos</p>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Próximas Consultas</p>
                <p className="text-4xl">{upcomingAppointments.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Consultas Realizadas</p>
                <p className="text-4xl">{completedCount}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Receitas Ativas</p>
                <p className="text-4xl">{activePrescriptions}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={onViewHistory}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Ver Histórico</p>
                    <p className="text-xs text-gray-500">Consultas anteriores</p>
                  </div>
                </button>

                <button 
                  onClick={onEvaluateAppointments}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Star className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Avaliar Atendimentos</p>
                    <p className="text-xs text-gray-500">Deixe seu feedback</p>
                  </div>
                </button>

                <button 
                  onClick={onViewPrescriptions}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Receitas e Documentos</p>
                    <p className="text-xs text-gray-500">Visualizar prescrições</p>
                  </div>
                </button>

                <button 
                  onClick={onManageDependents}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Gerenciar Dependentes</p>
                    <p className="text-xs text-gray-500">Adicionar ou editar dependentes</p>
                  </div>
                </button>
              </div>
            </Card>

            {/* Progress Overview */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h2 className="text-base mb-4">Evolução do Tratamento</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                    <h3 className="text-sm">Progresso Positivo</h3>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">
                    Melhora significativa na comunicação não-verbal e redução de comportamentos repetitivos.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Último atendimento</p>
                    <p className="text-sm">25/10/2025</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Profissional</p>
                    <p className="text-sm">Dr. Carlos Eduardo</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div>
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-4 w-4 text-gray-600" />
                <h2 className="text-base">Próximas Consultas</h2>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Nenhuma consulta agendada
                  </p>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <p className="text-xs text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit' 
                          })} às {appointment.time}
                        </p>
                      </div>
                      <p className="text-sm mb-1">{appointment.professionalName}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                      <button className="text-xs text-purple-600 hover:text-purple-700 mt-2">
                        Cancelar consulta
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}