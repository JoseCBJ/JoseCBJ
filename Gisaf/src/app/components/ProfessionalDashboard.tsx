import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { mockAppointments, mockPatients } from '../lib/mockData';

interface ProfessionalDashboardProps {
  onViewPatient: (patientId: string) => void;
  onStartAppointment: (appointmentId: string) => void;
  onCreateDocument: () => void;
}

export function ProfessionalDashboard({ 
  onViewPatient, 
  onStartAppointment,
  onCreateDocument 
}: ProfessionalDashboardProps) {
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2025-11-01');
  const inProgress = todayAppointments.filter(apt => apt.status === 'in-progress');
  const upcoming = todayAppointments.filter(apt => apt.status === 'scheduled');
  const completed = todayAppointments.filter(apt => apt.status === 'completed');

  const recentPatients = mockPatients.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{todayAppointments.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              {upcoming.length} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Em Atendimento</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{inProgress.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              Atendimento em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{completed.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              Hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pacientes Ativos</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{mockPatients.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              Em acompanhamento
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
            <CardDescription>Sábado, 1 de Novembro de 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum agendamento para hoje</p>
            ) : (
              todayAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{appointment.time}</span>
                      <Badge 
                        variant={
                          appointment.status === 'completed' ? 'default' :
                          appointment.status === 'in-progress' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {appointment.status === 'completed' ? 'Concluído' :
                         appointment.status === 'in-progress' ? 'Em andamento' :
                         'Agendado'}
                      </Badge>
                    </div>
                    <p className="text-sm">{appointment.patientName}</p>
                    <p className="text-xs text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="flex gap-2">
                    {appointment.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => onStartAppointment(appointment.id)}
                      >
                        Iniciar
                      </Button>
                    )}
                    {appointment.status === 'in-progress' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewPatient(appointment.patientId)}
                      >
                        Ver Prontuário
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
            <CardDescription>Acessos rápidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div 
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewPatient(patient.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">{patient.name}</p>
                    <p className="text-xs text-gray-600">{patient.cidDescription}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Ver Prontuário
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={onCreateDocument} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Nova Receita
          </Button>
          <Button variant="outline" onClick={onCreateDocument} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Novo Atestado
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Ver Agenda Completa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
