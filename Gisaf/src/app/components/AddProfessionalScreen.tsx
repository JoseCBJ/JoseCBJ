import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

interface AddProfessionalScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const especialidadesDisponiveis = [
  'Neurologista Pediátrico',
  'Fisioterapeuta',
  'Fonoaudiólogo(a)',
  'Psicólogo(a)',
  'Terapeuta Ocupacional',
  'Pediatra',
  'Psiquiatra',
  'Nutricionista',
  'Ortopedista',
  'Oftalmologista',
  'Cardiologista',
  'Endocrinologista',
  'Assistente Social',
  'Educador Físico',
  'Musicoterapeuta',
  'Arte Terapeuta',
];

export function AddProfessionalScreen({ onBack, onSave }: AddProfessionalScreenProps) {
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<string[]>([]);
  const [especialidadeBusca, setEspecialidadeBusca] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [isPJ, setIsPJ] = useState(false);

  const especialidadesFiltradas = especialidadesDisponiveis.filter(
    (esp) =>
      esp.toLowerCase().includes(especialidadeBusca.toLowerCase()) &&
      !especialidadesSelecionadas.includes(esp)
  );

  const adicionarEspecialidade = (especialidade: string) => {
    if (!especialidadesSelecionadas.includes(especialidade)) {
      setEspecialidadesSelecionadas([...especialidadesSelecionadas, especialidade]);
    }
    setEspecialidadeBusca('');
    setMostrarDropdown(false);
  };

  const removerEspecialidade = (especialidade: string) => {
    setEspecialidadesSelecionadas(
      especialidadesSelecionadas.filter((esp) => esp !== especialidade)
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
                <h1 className="text-lg">Cadastrar Novo Profissional</h1>
                <p className="text-xs text-gray-500">Adicionar ao corpo clínico</p>
              </div>
            </div>
            <Button onClick={onSave} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Save className="h-4 w-4" />
              Salvar Cadastro
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Dados Pessoais</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" placeholder="Ex: Dr. Roberto Almeida" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input id="rg" placeholder="00.000.000-0" />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Informações Profissionais</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade *</Label>
                    <div className="relative">
                      <Input
                        id="specialty"
                        placeholder="Digite para buscar especialidades..."
                        value={especialidadeBusca}
                        onChange={(e) => setEspecialidadeBusca(e.target.value)}
                        onFocus={() => setMostrarDropdown(true)}
                        onBlur={() => setTimeout(() => setMostrarDropdown(false), 200)}
                      />
                      {mostrarDropdown && especialidadesFiltradas.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          <div className="py-1">
                            {especialidadesFiltradas.map((esp) => (
                              <button
                                key={esp}
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                onClick={() => adicionarEspecialidade(esp)}
                              >
                                {esp}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {especialidadesSelecionadas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {especialidadesSelecionadas.map((esp) => (
                          <Badge
                            key={esp}
                            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer flex items-center gap-1.5 px-3 py-1"
                            onClick={() => removerEspecialidade(esp)}
                          >
                            {esp}
                            <X className="h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registry">Registro Profissional *</Label>
                    <Input id="registry" placeholder="Ex: CRM-SP 123456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registryState">Estado do Registro</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workload">Carga Horária Semanal</Label>
                    <Input id="workload" placeholder="Ex: 40 horas" />
                  </div>
                </div>
              </div>

              {/* PJ Info */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <h3 className="text-sm">Pessoa Jurídica (PJ)</h3>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="isPJ"
                      checked={isPJ}
                      onCheckedChange={(checked) => setIsPJ(checked as boolean)}
                    />
                    <Label htmlFor="isPJ" className="cursor-pointer text-sm">
                      Profissional atua como PJ
                    </Label>
                  </div>
                </div>
                {isPJ && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social *</Label>
                      <Input
                        id="razaoSocial"
                        placeholder="Ex: Roberto Almeida Serviços Médicos LTDA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input id="nomeFantasia" placeholder="Ex: Clínica Dr. Roberto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                      <Input id="inscricaoEstadual" placeholder="000.000.000.000" />
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm mb-4 pb-2 border-b">Contato</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="profissional@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input id="phone" placeholder="(11) 98765-4321" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade - Estado, CEP"
                    />
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