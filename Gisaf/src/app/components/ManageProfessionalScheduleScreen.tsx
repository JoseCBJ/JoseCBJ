import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Save, Clock } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

interface ManageProfessionalScheduleScreenProps {
  professionalId?: string;
  onBack: () => void;
  onSave: () => void;
}

export function ManageProfessionalScheduleScreen({ 
  professionalId, 
  onBack, 
  onSave 
}: ManageProfessionalScheduleScreenProps) {
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [duracoesSelecionadas, setDuracoesSelecionadas] = useState<string[]>([]);
  const [horarioInicio, setHorarioInicio] = useState('08:00');
  const [horarioFim, setHorarioFim] = useState('17:00');
  const [temIntervalo, setTemIntervalo] = useState(true);
  const [horarioIntervaloInicio, setHorarioIntervaloInicio] = useState('12:00');
  const [horarioIntervaloFim, setHorarioIntervaloFim] = useState('13:00');
  const [tempoPersonalizado, setTempoPersonalizado] = useState('');
  const [mostrarCampoPersonalizado, setMostrarCampoPersonalizado] = useState(false);

  const diasDaSemana = [
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
  ];

  const duracoesDisponiveis = [
    { value: '30', label: '30 minutos' },
    { value: '45', label: '45 minutos' },
    { value: '60', label: '60 minutos' },
    { value: '90', label: '90 minutos' },
    { value: 'personalizado', label: 'Tempo personalizado' },
  ];

  const toggleDia = (dia: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const toggleDuracao = (duracao: string) => {
    if (duracao === 'personalizado') {
      setMostrarCampoPersonalizado(!mostrarCampoPersonalizado);
    }
    setDuracoesSelecionadas((prev) =>
      prev.includes(duracao)
        ? prev.filter((d) => d !== duracao)
        : [...prev, duracao]
    );
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
                <h1 className="text-lg">Abrir Agenda Profissional</h1>
                <p className="text-xs text-gray-500">
                  {professionalId ? 'Atualizar disponibilidade' : 'Configurar horários de atendimento'}
                </p>
              </div>
            </div>
            <Button onClick={onSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-base">Configuração de Agenda</h2>
                <p className="text-xs text-gray-500">Defina dias, horários e durações de atendimento</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Dias de Atendimento */}
              <div className="space-y-3">
                <Label>Dias de Atendimento *</Label>
                <p className="text-xs text-gray-500">Selecione os dias da semana disponíveis</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {diasDaSemana.map((dia) => (
                    <div
                      key={dia.value}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={dia.value}
                        checked={diasSelecionados.includes(dia.value)}
                        onCheckedChange={() => toggleDia(dia.value)}
                      />
                      <Label
                        htmlFor={dia.value}
                        className="cursor-pointer flex-1 text-sm"
                      >
                        {dia.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duração das Consultas */}
              <div className="space-y-3">
                <Label>Duração das Consultas *</Label>
                <p className="text-xs text-gray-500">Selecione uma ou mais opções disponíveis</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {duracoesDisponiveis.map((duracao) => (
                    <div
                      key={duracao.value}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={`duracao-${duracao.value}`}
                        checked={duracoesSelecionadas.includes(duracao.value)}
                        onCheckedChange={() => toggleDuracao(duracao.value)}
                      />
                      <Label
                        htmlFor={`duracao-${duracao.value}`}
                        className="cursor-pointer flex-1 text-sm"
                      >
                        {duracao.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {mostrarCampoPersonalizado && (
                  <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Label htmlFor="tempoPersonalizado" className="text-sm">
                      Tempo Personalizado (em minutos) *
                    </Label>
                    <Input
                      id="tempoPersonalizado"
                      type="number"
                      min="15"
                      max="240"
                      placeholder="Ex: 40"
                      value={tempoPersonalizado}
                      onChange={(e) => setTempoPersonalizado(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Digite um valor entre 15 e 240 minutos
                    </p>
                  </div>
                )}
              </div>

              {/* Horários de Atendimento */}
              <div className="space-y-3">
                <Label>Horários de Atendimento *</Label>
                <p className="text-xs text-gray-500">Defina o período de trabalho</p>
                
                {/* Horário de expediente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="horarioInicio" className="text-sm">Horário de Início</Label>
                    <Input
                      id="horarioInicio"
                      type="time"
                      value={horarioInicio}
                      onChange={(e) => setHorarioInicio(e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horarioFim" className="text-sm">Horário de Término</Label>
                    <Input
                      id="horarioFim"
                      type="time"
                      value={horarioFim}
                      onChange={(e) => setHorarioFim(e.target.value)}
                      className="text-center"
                    />
                  </div>
                </div>

                {/* Intervalo */}
                <div className="space-y-3 pt-3">
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <Checkbox
                      id="temIntervalo"
                      checked={temIntervalo}
                      onCheckedChange={(checked) => setTemIntervalo(checked as boolean)}
                    />
                    <Label
                      htmlFor="temIntervalo"
                      className="cursor-pointer flex-1 text-sm"
                    >
                      Possui horário de intervalo/almoço
                    </Label>
                  </div>
                  
                  {temIntervalo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-200">
                      <div className="space-y-2">
                        <Label htmlFor="horarioIntervaloInicio" className="text-sm">Início do Intervalo</Label>
                        <Input
                          id="horarioIntervaloInicio"
                          type="time"
                          value={horarioIntervaloInicio}
                          onChange={(e) => setHorarioIntervaloInicio(e.target.value)}
                          className="text-center"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horarioIntervaloFim" className="text-sm">Fim do Intervalo</Label>
                        <Input
                          id="horarioIntervaloFim"
                          type="time"
                          value={horarioIntervaloFim}
                          onChange={(e) => setHorarioIntervaloFim(e.target.value)}
                          className="text-center"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="mt-6 bg-emerald-50 border border-emerald-200">
          <div className="p-4">
            <p className="text-sm text-emerald-800">
              <strong>Resumo:</strong> Configure os dias, horários e duração de atendimento para otimizar 
              o agendamento de consultas. As configurações definidas aqui serão utilizadas para criar 
              a agenda automática do profissional.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}