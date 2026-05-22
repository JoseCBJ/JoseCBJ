import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, FileText, TrendingUp, MessageSquare } from 'lucide-react';
import { mockAppointments, mockPatients } from '../lib/mockData';

interface PatientDailyActivitiesScreenProps {
  onBack: () => void;
  patientId: string;
  date: string;
}

export function PatientDailyActivitiesScreen({ onBack, patientId, date }: PatientDailyActivitiesScreenProps) {
  const patient = mockPatients.find(p => p.id === patientId);
  
  // Mock activities for the day
  const activities = [
    {
      id: '1',
      time: '09:00',
      type: 'Psicologia',
      professional: 'Dr. Carlos Eduardo',
      status: 'completed',
      notes: 'Sessão de terapia comportamental. Paciente demonstrou boa participação.',
      progress: 'good',
      observations: 'Melhora significativa na comunicação não-verbal. Lucas conseguiu manter contato visual por períodos mais longos (até 10 segundos). Respondeu positivamente aos estímulos visuais e demonstrou interesse em atividades de encaixe. Recomenda-se manter a frequência semanal e intensificar exercícios de interação social.',
    },
    {
      id: '2',
      time: '14:00',
      type: 'Fisioterapia',
      professional: 'Dra. Fernanda Lima',
      status: 'completed',
      notes: 'Exercícios motores e alongamento.',
      progress: 'excellent',
      observations: 'Excelente evolução motora. Conseguiu realizar todos os exercícios propostos com boa amplitude de movimento. Demonstrou mais equilíbrio durante atividades em pé. Força muscular nos membros inferiores aumentou visivelmente. Família relatou maior independência em casa. Próxima etapa: introduzir exercícios de marcha assistida.',
    },
    {
      id: '3',
      time: '16:00',
      type: 'Fonoaudiologia',
      professional: 'Dra. Juliana Mendes',
      status: 'completed',
      notes: 'Trabalho de linguagem expressiva.',
      progress: 'regular',
      observations: 'Progresso moderado na articulação de sons. Ainda apresenta dificuldade com fonemas /r/ e /l/. Vocabulário expandiu em 5 palavras novas esta semana. Família precisa ser orientada a realizar mais exercícios em casa. Paciente mostra interesse mas dispersa facilmente. Sugestão: sessões mais curtas e dinâmicas.',
    },
  ];

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
              <h1 className="text-lg">Atividades do Dia</h1>
              <p className="text-xs text-gray-500">
                {patient?.name} - {new Date(date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Patient Info */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base mb-1">{patient?.name}</h2>
                <p className="text-sm text-gray-600">{patient?.cidDescription}</p>
              </div>
              <Badge className="bg-blue-600">
                {activities.length} {activities.length === 1 ? 'atividade' : 'atividades'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Activities Timeline */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="bg-white border border-gray-200 shadow-sm">
              <div className="p-6">
                {/* Activity Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded">
                      <Clock className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">{activity.time}</p>
                      <p className="text-base">{activity.type}</p>
                      <p className="text-sm text-gray-600">{activity.professional}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge variant="secondary">Concluída</Badge>
                    <Badge className={
                      activity.progress === 'excellent' ? 'bg-green-600' :
                      activity.progress === 'good' ? 'bg-blue-600' :
                      'bg-orange-600'
                    }>
                      {activity.progress === 'excellent' ? 'Excelente' :
                       activity.progress === 'good' ? 'Bom' :
                       'Regular'}
                    </Badge>
                  </div>
                </div>

                {/* Quick Notes */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">{activity.notes}</p>
                  </div>
                </div>

                {/* Detailed Observations */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                    <h4 className="text-sm">Observações e Evolução</h4>
                  </div>
                  <p className="text-sm text-gray-700 ml-6">{activity.observations}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Adicionar Comentário
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Ver Detalhes Completos
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Daily Summary */}
        <Card className="bg-white border border-gray-200 shadow-sm mt-6">
          <div className="p-6">
            <h3 className="text-base mb-4">Resumo do Dia</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xs text-gray-600 mb-1">Excelente</p>
                <p className="text-2xl text-green-600">
                  {activities.filter(a => a.progress === 'excellent').length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-xs text-gray-600 mb-1">Bom</p>
                <p className="text-2xl text-blue-600">
                  {activities.filter(a => a.progress === 'good').length}
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-xs text-gray-600 mb-1">Regular</p>
                <p className="text-2xl text-orange-600">
                  {activities.filter(a => a.progress === 'regular').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
