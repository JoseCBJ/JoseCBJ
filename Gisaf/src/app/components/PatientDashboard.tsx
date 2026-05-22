import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, FileText, Star, TrendingUp, AlertCircle, CheckCircle2, Clock, Pill } from 'lucide-react';
import { mockAppointments, mockPrescriptions, mockProgressReports, mockMedicalRecords } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PatientDashboardProps {
  patientId: string;
  onViewHistory: () => void;
  onViewPrescriptions: () => void;
  onCancelAppointment: (appointmentId: string) => void;
  onRateService: (appointmentId: string) => void;
}

export function PatientDashboard({ 
  patientId,
  onViewHistory,
  onViewPrescriptions,
  onCancelAppointment,
  onRateService
}: PatientDashboardProps) {
  // For demo purposes, using patient ID '1'
  const currentPatientId = patientId || '1';
  
  const patientAppointments = mockAppointments.filter(
    apt => apt.patientId === currentPatientId
  );
  
  const upcomingAppointments = patientAppointments.filter(
    apt => apt.status === 'scheduled'
  );
  
  const completedAppointments = patientAppointments.filter(
    apt => apt.status === 'completed'
  );
  
  const patientPrescriptions = mockPrescriptions.filter(
    presc => presc.patientId === currentPatientId
  );
  
  const activePrescriptions = patientPrescriptions.filter(
    presc => presc.status === 'active'
  );
  
  const patientReports = mockProgressReports.filter(
    report => report.patientId === currentPatientId
  );
  
  const latestReport = patientReports[0];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Olá, Maria Santos! 👋</CardTitle>
          <CardDescription>
            Aqui você pode acompanhar o progresso de Lucas Oliveira Santos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Próxima Consulta</p>
                <p className="text-sm">
                  {upcomingAppointments.length > 0 
                    ? new Date(upcomingAppointments[0].date).toLocaleDateString('pt-BR')
                    : 'Nenhuma agendada'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Consultas Realizadas</p>
                <p className="text-sm">{completedAppointments.length} atendimentos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Evolução</p>
                <p className="text-sm">
                  {latestReport?.overallProgress === 'excellent' && 'Excelente'}
                  {latestReport?.overallProgress === 'good' && 'Boa'}
                  {latestReport?.overallProgress === 'regular' && 'Regular'}
                  {!latestReport && 'Em acompanhamento'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
            <CardDescription>{upcomingAppointments.length} agendadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhuma consulta agendada</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">{appointment.professionalName}</p>
                      <p className="text-xs text-gray-600">{appointment.type}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(appointment.date).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </div>
                    </div>
                    <Badge variant="secondary">Agendada</Badge>
                  </div>
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => onCancelAppointment(appointment.id)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                    >
                      Reagendar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Active Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Receitas Ativas</CardTitle>
            <CardDescription>{activePrescriptions.length} em vigência</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activePrescriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Pill className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhuma receita ativa</p>
              </div>
            ) : (
              activePrescriptions.map((prescription) => (
                <div 
                  key={prescription.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">{prescription.professionalName}</p>
                      <p className="text-xs text-gray-600">
                        Emitida em {new Date(prescription.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant="default" className="bg-green-600">Ativa</Badge>
                  </div>
                  <div className="space-y-2">
                    {prescription.medications.map((med, idx) => (
                      <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                        <p className="text-sm">{med.name} - {med.dosage}</p>
                        <p className="text-gray-600">{med.frequency}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <span className="text-gray-600">
                      Válida até {new Date(prescription.validUntil).toLocaleDateString('pt-BR')}
                    </span>
                    <Button size="sm" variant="link">
                      Solicitar Renovação
                    </Button>
                  </div>
                </div>
              ))
            )}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onViewPrescriptions}
            >
              Ver Todas as Receitas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Report */}
      {latestReport && (
        <Card>
          <CardHeader>
            <CardTitle>Último Relatório de Progresso</CardTitle>
            <CardDescription>
              {latestReport.professionalName} - {latestReport.period}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h4 className="text-sm">Conquistas</h4>
                </div>
                <ul className="space-y-2">
                  {latestReport.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <h4 className="text-sm">Desafios</h4>
                </div>
                <ul className="space-y-2">
                  {latestReport.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-sm mb-3">Próximos Passos</h4>
              <ul className="space-y-2">
                {latestReport.nextSteps.map((step, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewHistory}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-sm">Histórico Completo</h3>
              <p className="text-xs text-gray-600">Ver todos os atendimentos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-sm">Avaliar Atendimento</h3>
              <p className="text-xs text-gray-600">Dê seu feedback</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-sm">Nova Consulta</h3>
              <p className="text-xs text-gray-600">Agendar atendimento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
