import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface CreateRecordDialogProps {
  open: boolean;
  onClose: () => void;
  patientName?: string;
}

export function CreateRecordDialog({ open, onClose, patientName }: CreateRecordDialogProps) {
  const [recordType, setRecordType] = useState<'consultation' | 'prescription' | 'certificate'>('consultation');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Registro Médico</DialogTitle>
          <DialogDescription>
            {patientName ? `Paciente: ${patientName}` : 'Registrar atendimento ou emitir documento'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Record Type Selection */}
          <div className="space-y-2">
            <Label>Tipo de Registro</Label>
            <Select value={recordType} onValueChange={(value: any) => setRecordType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Registro de Consulta</SelectItem>
                <SelectItem value="prescription">Receita Médica</SelectItem>
                <SelectItem value="certificate">Atestado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Consultation Form */}
          {recordType === 'consultation' && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data do Atendimento</Label>
                  <Input id="date" type="date" defaultValue="2025-11-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" defaultValue="09:00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sinais Vitais</Label>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-xs">Peso (kg)</Label>
                    <Input id="weight" type="number" placeholder="0.0" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-xs">Altura (cm)</Label>
                    <Input id="height" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heartRate" className="text-xs">FC (bpm)</Label>
                    <Input id="heartRate" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="text-xs">Temp. (°C)</Label>
                    <Input id="temperature" type="number" placeholder="0.0" step="0.1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Sintomas e Queixas</Label>
                <Textarea 
                  id="symptoms" 
                  placeholder="Descreva os sintomas apresentados pelo paciente..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico / Avaliação</Label>
                <Textarea 
                  id="diagnosis" 
                  placeholder="Diagnóstico ou avaliação clínica..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment">Tratamento / Conduta</Label>
                <Textarea 
                  id="treatment" 
                  placeholder="Descreva o tratamento prescrito ou conduta adotada..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea 
                  id="observations" 
                  placeholder="Observações adicionais sobre o atendimento..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Prescription Form */}
          {recordType === 'prescription' && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="prescDate">Data de Emissão</Label>
                  <Input id="prescDate" type="date" defaultValue="2025-11-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Válida Até</Label>
                  <Input id="validUntil" type="date" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Medicamentos</Label>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="med1Name" className="text-xs">Nome do Medicamento</Label>
                    <Input id="med1Name" placeholder="Ex: Risperidona" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="med1Dosage" className="text-xs">Dosagem</Label>
                      <Input id="med1Dosage" placeholder="Ex: 0.5mg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="med1Frequency" className="text-xs">Frequência</Label>
                      <Input id="med1Frequency" placeholder="Ex: 1x ao dia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="med1Duration" className="text-xs">Duração</Label>
                      <Input id="med1Duration" placeholder="Ex: 60 dias" />
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  + Adicionar Medicamento
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescNotes">Observações</Label>
                <Textarea 
                  id="prescNotes" 
                  placeholder="Instruções adicionais para o paciente..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Certificate Form */}
          {recordType === 'certificate' && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="certDate">Data do Atestado</Label>
                  <Input id="certDate" type="date" defaultValue="2025-11-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certType">Tipo</Label>
                  <Select defaultValue="medical">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Atestado Médico</SelectItem>
                      <SelectItem value="accompany">Atestado de Acompanhamento</SelectItem>
                      <SelectItem value="therapy">Atestado de Terapia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certDays">Número de Dias</Label>
                <Input id="certDays" type="number" placeholder="Ex: 3" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certReason">Motivo / CID</Label>
                <Textarea 
                  id="certReason" 
                  placeholder="Descreva o motivo do atestado..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certNotes">Observações Adicionais</Label>
                <Textarea 
                  id="certNotes" 
                  placeholder="Informações complementares..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose}>
            Salvar Registro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
