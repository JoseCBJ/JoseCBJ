import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { mockPatients } from '../lib/mockData';
import { useState } from 'react';

interface NewPrescriptionScreenProps {
  onBack: () => void;
  onSave: () => void;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export function NewPrescriptionScreen({ onBack, onSave }: NewPrescriptionScreenProps) {
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
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
                <h1 className="text-lg">Nova Receita</h1>
                <p className="text-xs text-gray-500">Prescrever medicamentos</p>
              </div>
            </div>
            <Button onClick={onSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4" />
              Emitir Receita
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="space-y-6">
              {/* Patient Selection */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Informações da Receita</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map(patient => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Válida até *</Label>
                    <Input id="validUntil" type="date" />
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <h3 className="text-sm">Medicamentos Prescritos</h3>
                  <Button 
                    type="button"
                    size="sm" 
                    variant="outline" 
                    onClick={addMedication}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar Medicamento
                  </Button>
                </div>

                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`med-name-${index}`}>Nome do Medicamento *</Label>
                              <Input 
                                id={`med-name-${index}`}
                                placeholder="Ex: Risperidona"
                                value={med.name}
                                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`med-dosage-${index}`}>Dosagem *</Label>
                              <Input 
                                id={`med-dosage-${index}`}
                                placeholder="Ex: 0.5mg"
                                value={med.dosage}
                                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`med-frequency-${index}`}>Frequência *</Label>
                              <Input 
                                id={`med-frequency-${index}`}
                                placeholder="Ex: 1x ao dia (à noite)"
                                value={med.frequency}
                                onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`med-duration-${index}`}>Duração *</Label>
                              <Input 
                                id={`med-duration-${index}`}
                                placeholder="Ex: 60 dias"
                                value={med.duration}
                                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {medications.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMedication(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Instruções Adicionais</h3>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Observações</Label>
                  <textarea 
                    id="instructions"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none"
                    placeholder="Informações adicionais sobre a medicação, cuidados especiais, etc."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
