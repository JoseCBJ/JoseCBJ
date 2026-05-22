import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  UserX, 
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertCircle,
  Save
} from 'lucide-react';
import { mockAppointments, mockPatients } from '../lib/mockData';
import { Appointment } from '../types';

interface DailyScheduleScreenProps {
  onBack: () => void;
  onStartAppointment: (appointmentId: string) => void;
  initialAppointmentId?: string;
}

interface AppointmentWithStatus extends Appointment {
  localStatus?: 'waiting' | 'in-progress' | 'completed' | 'absent';
}

export function DailyScheduleScreen({ onBack, onStartAppointment, initialAppointmentId }: DailyScheduleScreenProps) {
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Obter consultas de hoje
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2025-11-01');
  
  const [appointments, setAppointments] = useState<AppointmentWithStatus[]>(
    todayAppointments.map(apt => ({ 
      ...apt, 
      localStatus: apt.status 
    }))
  );

  // Encontrar o índice do appointment inicial, se fornecido
  const initialIndex = initialAppointmentId 
    ? appointments.findIndex(apt => apt.id === initialAppointmentId)
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const currentAppointment = appointments[currentIndex];

  // Estados do formulário de registro clínico
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [nextAppointment, setNextAppointment] = useState('');

  const handleMarkAsAbsent = () => {
    // Marcar como faltou e passar para próximo
    const updatedAppointments = [...appointments];
    updatedAppointments[currentIndex].localStatus = 'absent';
    setAppointments(updatedAppointments);

    // Avançar para próximo paciente
    if (currentIndex < appointments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleStartAppointment = () => {
    // Marcar como em atendimento
    const updatedAppointments = [...appointments];
    updatedAppointments[currentIndex].localStatus = 'in-progress';
    setAppointments(updatedAppointments);

    // Chamar função para iniciar atendimento
    onStartAppointment(currentAppointment.id);
  };

  const handleCompleteAppointment = () => {
    // Marcar como concluído e passar para próximo
    const updatedAppointments = [...appointments];
    updatedAppointments[currentIndex].localStatus = 'completed';
    setAppointments(updatedAppointments);

    // Limpar formulário
    setSymptoms('');
    setDiagnosis('');
    setTreatment('');
    setNotes('');
    setNextAppointment('');

    // Avançar para próximo paciente
    if (currentIndex < appointments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveAppointment = () => {
    // Salvar os dados do atendimento
    console.log('Salvando atendimento:', {
      symptoms,
      diagnosis,
      treatment,
      notes,
      nextAppointment
    });
    
    // Marcar como concluído
    handleCompleteAppointment();
  };

  const handleGoToAppointment = (index: number) => {
    setCurrentIndex(index);
  };

  const completedCount = appointments.filter(apt => apt.localStatus === 'completed').length;
  const absentCount = appointments.filter(apt => apt.localStatus === 'absent').length;
  const pendingCount = appointments.filter(apt => 
    apt.localStatus !== 'completed' && apt.localStatus !== 'absent'
  ).length;

  const getPatient = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-lg">Agenda Diária</h1>
                <p className="text-xs text-gray-500 capitalize">{today}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="h-3 w-3 mr-1" />
                {appointments.length} consultas
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Concluídas</p>
                  <p className="text-2xl">{completedCount}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Pendentes</p>
                  <p className="text-2xl">{pendingCount}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Faltaram</p>
                  <p className="text-2xl">{absentCount}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <UserX className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Appointment - 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Paciente Atual</CardTitle>
                  <Badge className={
                    currentAppointment?.localStatus === 'completed' ? 'bg-green-600' :
                    currentAppointment?.localStatus === 'absent' ? 'bg-red-600' :
                    currentAppointment?.localStatus === 'in-progress' ? 'bg-orange-500' :
                    'bg-blue-600'
                  }>
                    {currentAppointment?.localStatus === 'completed' ? 'Concluída' :
                     currentAppointment?.localStatus === 'absent' ? 'Faltou' :
                     currentAppointment?.localStatus === 'in-progress' ? 'Em Atendimento' :
                     'Aguardando'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {currentAppointment ? (
                  <>
                    {/* Consultation Information Card */}
                    <Card className="border border-gray-200 mb-6">
                      <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="text-base">Informações da Consulta</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Paciente</p>
                            <p className="text-sm font-medium">{currentAppointment.patientName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Tipo de Atendimento</p>
                            <p className="text-sm font-medium">
                              {currentAppointment.status === 'in-progress' ? 'Retorno' : 'Consulta Regular'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Data</p>
                            <p className="text-sm font-medium">
                              {new Date().toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Horário</p>
                            <p className="text-sm font-medium">{currentAppointment.time}</p>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900">
                            <span className="font-medium">Profissional:</span> {currentAppointment.professionalName}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Last Record - Yellow Alert Card */}
                    <Card className="border border-yellow-400 bg-yellow-50 mb-6">
                      <CardHeader className="border-b border-yellow-300 bg-yellow-100">
                        <div>
                          <CardTitle className="text-base text-gray-900">Último Registro - Fisioterapia</CardTitle>
                          <p className="text-xs text-gray-700 mt-1">
                            Atendimento em 10/03/2026 com {currentAppointment.professionalName}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-2 block">
                            Queixas e Sintomas Anteriores:
                          </label>
                          <div className="p-3 bg-white border border-yellow-300 rounded-lg">
                            <p className="text-sm text-gray-700">
                              Rigidez muscular, dificuldade de movimento, necessidade de alongamentos e fortalecimento.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Clinical Details Form */}
                    <Card className="border border-gray-200 mb-6">
                      <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="text-base">Detalhes Clínicos</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-5">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Queixas e Sintomas
                          </label>
                          <Textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Descreva os sintomas apresentados pelo paciente..."
                            className="min-h-[100px] resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Avaliação / Diagnóstico
                          </label>
                          <Textarea
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Avaliação clínica e diagnóstico..."
                            className="min-h-[100px] resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Conduta / Tratamento
                          </label>
                          <Textarea
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            placeholder="Tratamento prescrito e orientações..."
                            className="min-h-[100px] resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Observações Adicionais
                          </label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Observações gerais sobre o atendimento..."
                            className="min-h-[100px] resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Próximo Retorno
                          </label>
                          <Input
                            type="date"
                            value={nextAppointment}
                            onChange={(e) => setNextAppointment(e.target.value)}
                            className="max-w-xs"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        onClick={handleSaveAppointment}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Salvar Atendimento
                      </Button>

                      <div className="flex gap-3">
                        <Button 
                          onClick={onBack}
                          variant="outline"
                          className="flex-1 h-11"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Voltar
                        </Button>
                        <Button 
                          onClick={handleMarkAsAbsent}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-700 hover:bg-red-50 h-11"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Marcar Falta
                        </Button>
                      </div>

                      {/* Navigation */}
                      <div className="flex gap-3 pt-2">
                        <Button 
                          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                          variant="outline"
                          disabled={currentIndex === 0}
                          className="flex-1 h-11"
                        >
                          Anterior
                        </Button>
                        <Button 
                          onClick={() => currentIndex < appointments.length - 1 && setCurrentIndex(currentIndex + 1)}
                          variant="outline"
                          disabled={currentIndex === appointments.length - 1}
                          className="flex-1 h-11"
                        >
                          Próximo
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma consulta agendada para hoje</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Appointments List - 1/3 width */}
          <div>
            <Card className="border border-gray-200">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-base">Lista de Consultas</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {appointments.map((apt, index) => (
                    <button
                      key={apt.id}
                      onClick={() => handleGoToAppointment(index)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        index === currentIndex
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm">{apt.time}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            apt.localStatus === 'completed' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : apt.localStatus === 'absent'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : apt.localStatus === 'in-progress'
                              ? 'bg-orange-50 text-orange-700 border-orange-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {apt.localStatus === 'completed' ? '✓' :
                           apt.localStatus === 'absent' ? '✗' :
                           apt.localStatus === 'in-progress' ? '●' :
                           '○'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-900">{apt.patientName}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}