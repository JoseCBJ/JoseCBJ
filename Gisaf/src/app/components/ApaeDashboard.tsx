import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, UserPlus, Calendar, Star, TrendingUp, Activity } from 'lucide-react';
import { mockPatients, mockProfessionals, mockAppointments, mockEvaluations } from '../lib/mockData';

interface ApaeDashboardProps {
  onManagePatients: () => void;
  onManageProfessionals: () => void;
  onManageSchedule: () => void;
  onViewEvaluations: () => void;
}

export function ApaeDashboard({ 
  onManagePatients,
  onManageProfessionals, 
  onManageSchedule,
  onViewEvaluations 
}: ApaeDashboardProps) {
  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(apt => apt.status === 'completed').length;
  const averageRating = mockEvaluations.reduce((acc, ev) => acc + ev.rating, 0) / mockEvaluations.length;
  const thisWeekAppointments = mockAppointments.filter(apt => {
    const date = new Date(apt.date);
    const today = new Date('2025-11-01');
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return date >= today && date <= weekFromNow;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pacientes Cadastrados</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{mockPatients.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              +2 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Profissionais</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{mockProfessionals.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              {mockProfessionals.length} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Consultas Este Mês</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{totalAppointments}</div>
            <p className="text-xs text-gray-600 mt-1">
              {completedAppointments} concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{averageRating.toFixed(1)}</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-3 w-3 ${star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gestão Rápida</CardTitle>
            <CardDescription>Gerenciar cadastros e agendas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={onManagePatients}
            >
              <Users className="h-4 w-4 mr-2" />
              Gerenciar Pacientes
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={onManageProfessionals}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Gerenciar Profissionais
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={onManageSchedule}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Gerenciar Agenda Clínica
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={onViewEvaluations}
            >
              <Star className="h-4 w-4 mr-2" />
              Ver Avaliações e Feedbacks
            </Button>
          </CardContent>
        </Card>

        {/* Week Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Próxima Semana</CardTitle>
            <CardDescription>{thisWeekAppointments.length} consultas agendadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {thisWeekAppointments.slice(0, 5).map((appointment) => (
              <div 
                key={appointment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="text-sm">{appointment.patientName}</p>
                  <p className="text-xs text-gray-600">
                    {appointment.professionalName} - {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs">{new Date(appointment.date).toLocaleDateString('pt-BR')}</p>
                  <p className="text-xs text-gray-600">{appointment.time}</p>
                </div>
              </div>
            ))}
            {thisWeekAppointments.length > 5 && (
              <Button variant="link" className="w-full">
                Ver todas as {thisWeekAppointments.length} consultas
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-3 border-l-4 border-green-500 bg-green-50 rounded">
            <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">Nova avaliação recebida</p>
              <p className="text-xs text-gray-600">
                {mockEvaluations[0].patientName} avaliou {mockEvaluations[0].professionalName} - 5 estrelas
              </p>
              <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">Consulta concluída</p>
              <p className="text-xs text-gray-600">
                Dr. Carlos Eduardo finalizou atendimento de Lucas Oliveira Santos
              </p>
              <p className="text-xs text-gray-500 mt-1">Há 3 horas</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
            <Users className="h-5 w-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">Novo paciente cadastrado</p>
              <p className="text-xs text-gray-600">
                Sofia Rodrigues foi adicionada ao sistema
              </p>
              <p className="text-xs text-gray-500 mt-1">Ontem</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Rated Professionals */}
      <Card>
        <CardHeader>
          <CardTitle>Profissionais Mais Bem Avaliados</CardTitle>
          <CardDescription>Baseado em avaliações dos pacientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProfessionals.slice(0, 3).map((professional, index) => {
              const professionalEvaluations = mockEvaluations.filter(
                ev => ev.professionalId === professional.id
              );
              const avgRating = professionalEvaluations.length > 0
                ? professionalEvaluations.reduce((acc, ev) => acc + ev.rating, 0) / professionalEvaluations.length
                : 5;
              
              return (
                <div 
                  key={professional.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                    </div>
                    <div>
                      <p className="text-sm">{professional.name}</p>
                      <p className="text-xs text-gray-600">{professional.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{avgRating.toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
