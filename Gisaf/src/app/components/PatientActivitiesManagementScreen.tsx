import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User, Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockPatients } from '../lib/mockData';
import { useState } from 'react';

interface PatientActivitiesManagementScreenProps {
  onBack: () => void;
}

export function PatientActivitiesManagementScreen({ onBack }: PatientActivitiesManagementScreenProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [historyDays, setHistoryDays] = useState(7);

  // Mock activities data - last 14 days
  const mockActivities = {
    '1': [
      { date: '2025-11-02', day: 'Sábado', activities: [
        { time: '09:00', type: 'Psicologia', professional: 'Dr. Carlos Eduardo', status: 'Concluída', feedback: 'Excelente', notes: 'Ótima evolução na comunicação' },
        { time: '14:00', type: 'Fisioterapia', professional: 'Dra. Fernanda Lima', status: 'Concluída', feedback: 'Bom', notes: 'Progresso nos exercícios motores' },
      ]},
      { date: '2025-11-01', day: 'Sexta-feira', activities: [
        { time: '10:00', type: 'Fonoaudiologia', professional: 'Dra. Juliana Mendes', status: 'Concluída', feedback: 'Bom', notes: 'Vocabulário expandiu, boa participação' },
      ]},
      { date: '2025-10-31', day: 'Quinta-feira', activities: [
        { time: '09:00', type: 'Terapia Ocupacional', professional: 'Dra. Patricia Santos', status: 'Concluída', feedback: 'Excelente', notes: 'Excelente coordenação motora fina' },
        { time: '15:00', type: 'Psicologia', professional: 'Dr. Carlos Eduardo', status: 'Concluída', feedback: 'Regular', notes: 'Dia mais agitado, dispersão' },
      ]},
      { date: '2025-10-30', day: 'Quarta-feira', activities: [
        { time: '11:00', type: 'Fisioterapia', professional: 'Dra. Fernanda Lima', status: 'Concluída', feedback: 'Bom', notes: 'Mantém evolução constante' },
      ]},
      { date: '2025-10-29', day: 'Terça-feira', activities: [
        { time: '09:00', type: 'Fonoaudiologia', professional: 'Dra. Juliana Mendes', status: 'Concluída', feedback: 'Excelente', notes: 'Articulação melhorou significativamente' },
        { time: '14:00', type: 'Psicologia', professional: 'Dr. Carlos Eduardo', status: 'Concluída', feedback: 'Excelente', notes: 'Comportamento muito positivo' },
      ]},
      { date: '2025-10-28', day: 'Segunda-feira', activities: [
        { time: '10:00', type: 'Terapia Ocupacional', professional: 'Dra. Patricia Santos', status: 'Concluída', feedback: 'Bom', notes: 'Atividades de vida diária melhorando' },
      ]},
      { date: '2025-10-27', day: 'Domingo', activities: []},
    ],
    '2': [
      { date: '2025-11-02', day: 'Sábado', activities: [
        { time: '10:00', type: 'Fisioterapia', professional: 'Dra. Fernanda Lima', status: 'Concluída', feedback: 'Excelente', notes: 'Amplitude de movimento aumentou' },
      ]},
      { date: '2025-11-01', day: 'Sexta-feira', activities: [
        { time: '14:00', type: 'Terapia Ocupacional', professional: 'Dra. Patricia Santos', status: 'Concluída', feedback: 'Excelente', notes: 'Controle postural excelente' },
      ]},
      { date: '2025-10-31', day: 'Quinta-feira', activities: []},
      { date: '2025-10-30', day: 'Quarta-feira', activities: [
        { time: '09:00', type: 'Fisioterapia', professional: 'Dra. Fernanda Lima', status: 'Concluída', feedback: 'Bom', notes: 'Pequena fadiga muscular' },
      ]},
      { date: '2025-10-29', day: 'Terça-feira', activities: [
        { time: '11:00', type: 'Terapia Ocupacional', professional: 'Dra. Patricia Santos', status: 'Concluída', feedback: 'Excelente', notes: 'Conseguiu ficar em pé com apoio' },
      ]},
      { date: '2025-10-28', day: 'Segunda-feira', activities: [
        { time: '10:00', type: 'Fisioterapia', professional: 'Dra. Fernanda Lima', status: 'Concluída', feedback: 'Excelente', notes: 'Ótima sessão de alongamento' },
      ]},
      { date: '2025-10-27', day: 'Domingo', activities: []},
    ],
  };

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
  const patientActivities = selectedPatientId && mockActivities[selectedPatientId as keyof typeof mockActivities]
    ? mockActivities[selectedPatientId as keyof typeof mockActivities].slice(0, historyDays)
    : [];

  // Calculate stats
  const allActivities = patientActivities.flatMap(day => day.activities);
  const totalActivities = allActivities.length;
  const excellentCount = allActivities.filter(a => a.feedback === 'Excelente').length;
  const goodCount = allActivities.filter(a => a.feedback === 'Bom').length;
  const regularCount = allActivities.filter(a => a.feedback === 'Regular').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-lg">Gestão de Atividades dos Pacientes</h1>
              <p className="text-xs text-gray-500">Acompanhamento de atividades e progresso</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Patient List */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-base mb-4">Selecione um Paciente</h3>
                <div className="space-y-2">
                  {mockPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                        selectedPatientId === patient.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        selectedPatientId === patient.id ? 'bg-cyan-100' : 'bg-blue-100'
                      }`}>
                        <User className={`h-5 w-5 ${
                          selectedPatientId === patient.id ? 'text-cyan-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.cidDescription}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Activities */}
          <div className="lg:col-span-2">
            {!selectedPatientId ? (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-12 text-center text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Selecione um paciente para ver suas atividades</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Patient Header & Controls */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-base mb-1">{selectedPatient?.name}</h2>
                        <p className="text-sm text-gray-600">{selectedPatient?.cidDescription}</p>
                      </div>
                      <Badge className="bg-blue-600">{totalActivities} atividades</Badge>
                    </div>

                    {/* History Period Control */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Histórico:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setHistoryDays(Math.max(1, historyDays - 1))}
                          disabled={historyDays <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm px-4 py-1 bg-white border rounded">{historyDays} dias</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setHistoryDays(Math.min(30, historyDays + 1))}
                          disabled={historyDays >= 30}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <Button
                          size="sm"
                          variant={historyDays === 7 ? 'default' : 'outline'}
                          onClick={() => setHistoryDays(7)}
                          className={historyDays === 7 ? 'bg-cyan-600' : ''}
                        >
                          7 dias
                        </Button>
                        <Button
                          size="sm"
                          variant={historyDays === 14 ? 'default' : 'outline'}
                          onClick={() => setHistoryDays(14)}
                          className={historyDays === 14 ? 'bg-cyan-600' : ''}
                        >
                          14 dias
                        </Button>
                        <Button
                          size="sm"
                          variant={historyDays === 30 ? 'default' : 'outline'}
                          onClick={() => setHistoryDays(30)}
                          className={historyDays === 30 ? 'bg-cyan-600' : ''}
                        >
                          30 dias
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 bg-white border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-2xl">{totalActivities}</p>
                  </Card>
                  <Card className="p-4 bg-white border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-600 mb-1">Excelente</p>
                    <p className="text-2xl text-green-600">{excellentCount}</p>
                  </Card>
                  <Card className="p-4 bg-white border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-600 mb-1">Bom</p>
                    <p className="text-2xl text-blue-600">{goodCount}</p>
                  </Card>
                  <Card className="p-4 bg-white border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-600 mb-1">Regular</p>
                    <p className="text-2xl text-orange-600">{regularCount}</p>
                  </Card>
                </div>

                {/* Activities Timeline */}
                <div className="space-y-4">
                  {patientActivities.map((dayData, index) => (
                    <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm">
                              {new Date(dayData.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500">{dayData.day}</p>
                          </div>
                          <Badge variant="secondary" className="ml-auto">
                            {dayData.activities.length} {dayData.activities.length === 1 ? 'atividade' : 'atividades'}
                          </Badge>
                        </div>

                        {dayData.activities.length === 0 ? (
                          <div className="text-center py-6 text-gray-400 text-sm">
                            Nenhuma atividade registrada
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {dayData.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded">
                                      <Clock className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm mb-1">{activity.type}</p>
                                      <p className="text-xs text-gray-600">{activity.professional}</p>
                                      <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2 items-end">
                                    <Badge variant="secondary" className="text-xs">
                                      {activity.status}
                                    </Badge>
                                    <Badge className={
                                      activity.feedback === 'Excelente' ? 'bg-green-600' :
                                      activity.feedback === 'Bom' ? 'bg-blue-600' :
                                      'bg-orange-600'
                                    }>
                                      {activity.feedback}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="pl-12">
                                  <p className="text-sm text-gray-700">{activity.notes}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
