import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Search, Clock, Calendar, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { mockProfessionals } from '../lib/mockData';

interface ScheduleManagementScreenProps {
  onBack: () => void;
  onEditSchedule: (professionalId: string) => void;
  onViewDetails: (professionalId: string) => void;
}

// Mock data para agendas dos profissionais
const mockSchedules = [
  {
    professionalId: '1',
    days: ['segunda', 'terca', 'quarta', 'quinta', 'sexta'],
    startTime: '08:00',
    endTime: '17:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    consultationDuration: ['30', '60'],
  },
  {
    professionalId: '2',
    days: ['segunda', 'quarta', 'sexta'],
    startTime: '09:00',
    endTime: '18:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    consultationDuration: ['45', '60'],
  },
  {
    professionalId: '3',
    days: ['terca', 'quinta'],
    startTime: '08:00',
    endTime: '16:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    consultationDuration: ['60'],
  },
];

const dayLabels: { [key: string]: string } = {
  segunda: 'Seg',
  terca: 'Ter',
  quarta: 'Qua',
  quinta: 'Qui',
  sexta: 'Sex',
  sabado: 'Sáb',
};

export function ScheduleManagementScreen({ 
  onBack, 
  onEditSchedule,
  onViewDetails 
}: ScheduleManagementScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = mockProfessionals.filter((prof) =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScheduleForProfessional = (professionalId: string) => {
    return mockSchedules.find((schedule) => schedule.professionalId === professionalId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-lg">Gestão de Agenda</h1>
                <p className="text-xs text-gray-500">
                  Visualize e gerencie os horários dos profissionais
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <Card className="mb-6 bg-white border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Professionals List */}
        <div className="space-y-4">
          {filteredProfessionals.length === 0 ? (
            <Card className="p-8 text-center bg-white border border-gray-200">
              <p className="text-gray-500">Nenhum profissional encontrado</p>
            </Card>
          ) : (
            filteredProfessionals.map((professional) => {
              const schedule = getScheduleForProfessional(professional.id);
              
              return (
                <Card key={professional.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Professional Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white shrink-0">
                            {professional.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base mb-1">{professional.name}</h3>
                            <p className="text-sm text-gray-600">{professional.specialty}</p>
                            <p className="text-xs text-gray-500 mt-1">CRM: {professional.crm}</p>
                          </div>
                        </div>

                        {schedule ? (
                          <div className="space-y-3">
                            {/* Days */}
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Dias de Atendimento</p>
                                <div className="flex flex-wrap gap-1">
                                  {schedule.days.map((day) => (
                                    <span
                                      key={day}
                                      className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded text-xs"
                                    >
                                      {dayLabels[day]}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-2">
                              <Clock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Horário de Atendimento</p>
                                <p className="text-sm">
                                  {schedule.startTime} às {schedule.endTime}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Intervalo: {schedule.lunchStart} às {schedule.lunchEnd}
                                </p>
                              </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-start gap-2">
                              <Clock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Duração das Consultas</p>
                                <div className="flex flex-wrap gap-1">
                                  {schedule.consultationDuration.map((duration) => (
                                    <span
                                      key={duration}
                                      className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs"
                                    >
                                      {duration} min
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-800">
                              Agenda não configurada para este profissional
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 lg:shrink-0">
                        <Button
                          onClick={() => onViewDetails(professional.id)}
                          variant="outline"
                          className="gap-2 flex-1 lg:flex-initial"
                        >
                          <Eye className="h-4 w-4" />
                          Ver Detalhes
                        </Button>
                        <Button
                          onClick={() => onEditSchedule(professional.id)}
                          className="gap-2 bg-cyan-600 hover:bg-cyan-700 flex-1 lg:flex-initial"
                        >
                          <Edit className="h-4 w-4" />
                          {schedule ? 'Editar Agenda' : 'Configurar Agenda'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
