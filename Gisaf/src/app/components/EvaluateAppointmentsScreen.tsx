import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, Calendar, CheckCircle2 } from 'lucide-react';
import { mockAppointments } from '../lib/mockData';
import { useState } from 'react';
import { toast } from 'sonner';

interface EvaluateAppointmentsScreenProps {
  onBack: () => void;
  patientId: string;
}

export function EvaluateAppointmentsScreen({ onBack, patientId }: EvaluateAppointmentsScreenProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Get appointments from at least 1 week ago (7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const patientAppointments = mockAppointments
    .filter(apt => apt.patientId === patientId && apt.status === 'completed')
    .filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate <= oneWeekAgo;
    });

  // Add mock older appointments for demonstration
  const mockOlderAppointments = [
    { ...mockAppointments[0], id: '20', date: '2025-10-25', status: 'completed' as const },
    { ...mockAppointments[0], id: '21', date: '2025-10-18', status: 'completed' as const },
    { ...mockAppointments[0], id: '22', date: '2025-10-11', status: 'completed' as const },
  ];

  const allEvaluableAppointments = [...patientAppointments, ...mockOlderAppointments];

  const handleSubmitEvaluation = () => {
    console.log('Evaluation submitted:', { appointmentId: selectedAppointment, rating });
    
    // Show success toast
    toast.success('Avaliação enviada com sucesso!', {
      description: 'Agradecemos pelo seu feedback. Ele nos ajuda a melhorar nossos serviços.',
      duration: 4000,
    });
    
    setSelectedAppointment(null);
    setRating(0);
  };

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
              <h1 className="text-lg">Avaliar Atendimentos</h1>
              <p className="text-xs text-gray-500">Consultas realizadas aguardando avaliação</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <Star className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="text-sm mb-1">Sua opinião é importante!</h3>
                <p className="text-xs text-gray-600">
                  Avalie as consultas realizadas há pelo menos 1 semana. Seu feedback ajuda a melhorar 
                  nossos serviços e o atendimento aos pacientes.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {allEvaluableAppointments.length === 0 ? (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-12 text-center text-gray-500">
              <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Não há consultas pendentes de avaliação</p>
              <p className="text-xs text-gray-400 mt-1">
                Consultas podem ser avaliadas após 1 semana de realização
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {allEvaluableAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })} às {appointment.time}
                        </p>
                      </div>
                      <p className="text-base mb-1">{appointment.professionalName}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <Badge variant="secondary">Aguardando avaliação</Badge>
                  </div>

                  {selectedAppointment === appointment.id ? (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <p className="text-sm mb-3">Como você avalia este atendimento?</p>
                        <div className="flex justify-center gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star 
                                className={`h-8 w-8 ${
                                  star <= (hoveredRating || rating)
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-center text-xs text-gray-600">
                          {rating === 0 && 'Selecione uma avaliação'}
                          {rating === 1 && 'Muito insatisfeito'}
                          {rating === 2 && 'Insatisfeito'}
                          {rating === 3 && 'Regular'}
                          {rating === 4 && 'Satisfeito'}
                          {rating === 5 && 'Muito satisfeito'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-600">Comentário (opcional)</label>
                        <textarea 
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none"
                          placeholder="Conte-nos sobre sua experiência..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-3 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(null);
                            setRating(0);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleSubmitEvaluation}
                          disabled={rating === 0}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Enviar Avaliação
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedAppointment(appointment.id)}
                        className="w-full"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Avaliar Atendimento
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}