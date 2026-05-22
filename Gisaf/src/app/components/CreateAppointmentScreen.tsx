import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface CreateAppointmentScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function CreateAppointmentScreen({ onBack, onSave }: CreateAppointmentScreenProps) {
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
                <h1 className="text-lg">Criar Consulta</h1>
                <p className="text-xs text-gray-500">Nova consulta no sistema</p>
              </div>
            </div>
            <Button onClick={onSave} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Save className="h-4 w-4" />
              Salvar Consulta
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Informações da Consulta</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Lucas Oliveira Santos</SelectItem>
                        <SelectItem value="2">Ana Paula Costa</SelectItem>
                        <SelectItem value="3">Pedro Henrique Silva</SelectItem>
                        <SelectItem value="4">Sofia Rodrigues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professional">Profissional *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Dr. Carlos Silva - Pediatria</SelectItem>
                        <SelectItem value="2">Dra. Maria Santos - Neurologia</SelectItem>
                        <SelectItem value="3">Dr. João Mendes - Psiquiatria</SelectItem>
                        <SelectItem value="4">Dra. Ana Costa - Fisioterapia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Atendimento *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="avaliacao">Avaliação</SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="retorno">Retorno</SelectItem>
                        <SelectItem value="terapia">Sessão de Terapia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário *</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}