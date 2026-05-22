import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save, Calendar, User, Clock, FileText, History } from 'lucide-react';
import { mockAppointments, mockMedicalRecords } from '../lib/mockData';
import { useState } from 'react';

interface NewAppointmentScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function NewAppointmentScreen({ onBack, onSave }: NewAppointmentScreenProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  
  // Filtrar apenas consultas agendadas ou em andamento
  const availableAppointments = mockAppointments.filter(
    apt => apt.status === 'scheduled' || apt.status === 'in-progress'
  );

  const selectedAppointment = availableAppointments.find(
    apt => apt.id === selectedAppointmentId
  );

  // Buscar último registro de queixas e sintomas do mesmo tipo de consulta
  const getLastSymptomsRecord = () => {
    if (!selectedAppointment) return null;

    // Buscar registros médicos do mesmo paciente e mesmo tipo de consulta
    const patientRecords = mockMedicalRecords
      .filter(record => {
        // Encontrar a consulta relacionada ao registro
        const relatedAppointment = mockAppointments.find(
          apt => apt.id === record.appointmentId
        );
        
        // Filtrar apenas registros do mesmo paciente e mesmo tipo de consulta
        return (
          record.patientId === selectedAppointment.patientId &&
          relatedAppointment?.type === selectedAppointment.type
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Retornar o registro mais recente
    return patientRecords[0] || null;
  };

  const lastRecord = getLastSymptomsRecord();

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
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
                <h1 className="text-lg">Registrar Atendimento</h1>
                <p className="text-xs text-gray-500">Nova consulta</p>
              </div>
            </div>
            <Button 
              onClick={onSave} 
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedAppointmentId}
            >
              <Save className="h-4 w-4" />
              Salvar Atendimento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm mb-2 pb-2 border-b">Selecionar Consulta Agendada</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Selecione a consulta para a qual deseja registrar o atendimento
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="appointment">Consulta Agendada *</Label>
                <Select value={selectedAppointmentId} onValueChange={setSelectedAppointmentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma consulta agendada" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAppointments.map((apt) => (
                      <SelectItem key={apt.id} value={apt.id}>
                        {apt.patientName} - {apt.type} - {formatDate(apt.date)} às {apt.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {selectedAppointment && (
          <>
            <Card className="bg-white border border-gray-200 shadow-sm mb-6">
              <div className="p-6">
                <div className="space-y-4">
                  {/* Consultation Info - Read Only */}
                  <div>
                    <h3 className="text-sm mb-4 pb-2 border-b flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                      Informações da Consulta
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-500" />
                          Paciente
                        </Label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                          {selectedAppointment.patientName}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-gray-500" />
                          Tipo de Atendimento
                        </Label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                          {selectedAppointment.type}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          Data
                        </Label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                          {formatDate(selectedAppointment.date)}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-gray-500" />
                          Horário
                        </Label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                          {selectedAppointment.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Profissional:</strong> {selectedAppointment.professionalName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Histórico do Último Atendimento */}
                  {lastRecord && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-amber-600 rounded-lg">
                          <History className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-amber-900 mb-1">
                            Último Registro - {selectedAppointment.type}
                          </h4>
                          <p className="text-xs text-amber-700">
                            Atendimento em {formatDate(lastRecord.date)} com {lastRecord.professionalName}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-white rounded-md border border-amber-200">
                        <Label className="text-xs text-gray-600 mb-1 block">Queixas e Sintomas Anteriores:</Label>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{lastRecord.symptoms}</p>
                      </div>
                    </div>
                  )}

                  {/* Clinical Details */}
                  <div>
                    <h3 className="text-sm mb-4 pb-2 border-b">Detalhes Clínicos</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="symptoms">Queixas e Sintomas</Label>
                        <Textarea 
                          id="symptoms" 
                          placeholder="Descreva os sintomas e queixas apresentados pelo paciente..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="diagnosis">Avaliação / Diagnóstico</Label>
                        <Textarea 
                          id="diagnosis" 
                          placeholder="Avaliação clínica e diagnóstico..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="treatment">Conduta / Tratamento</Label>
                        <Textarea 
                          id="treatment" 
                          placeholder="Descreva o tratamento prescrito ou conduta adotada..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="observations">Observações Adicionais</Label>
                        <Textarea 
                          id="observations" 
                          placeholder="Observações gerais sobre o atendimento..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nextAppointment">Próximo Retorno</Label>
                        <Input id="nextAppointment" type="date" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}