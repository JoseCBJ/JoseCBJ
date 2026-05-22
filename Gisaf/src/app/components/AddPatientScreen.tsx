import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ArrowLeft, Save, Plus, X, Search, User, Phone, Heart, Users, FileText, Trash2, GraduationCap, CreditCard, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { searchCID, CIDEntry } from '../lib/cidDatabase';
import { mockPatients } from '../lib/mockData';

interface Responsible {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  relationship: string;
}

interface AddPatientScreenProps {
  onBack: () => void;
  onSave: () => void;
  patientId?: string;
}

export function AddPatientScreen({ onBack, onSave, patientId }: AddPatientScreenProps) {
  const isEditMode = !!patientId;
  const existingPatient = isEditMode ? mockPatients.find(p => p.id === patientId) : null;

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [observations, setObservations] = useState('');

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [newResponsibleName, setNewResponsibleName] = useState('');
  const [newResponsibleCpf, setNewResponsibleCpf] = useState('');
  const [newResponsiblePhone, setNewResponsiblePhone] = useState('');
  const [newResponsibleRelationship, setNewResponsibleRelationship] = useState('');

  const [selectedCIDs, setSelectedCIDs] = useState<CIDEntry[]>([]);
  const [cidSearch, setCidSearch] = useState('');
  const [showCIDResults, setShowCIDResults] = useState(false);
  const [cidSearchResults, setCidSearchResults] = useState<CIDEntry[]>([]);

  // Novos campos
  const [matricula, setMatricula] = useState('');
  const [attendsSchool, setAttendsSchool] = useState(false);
  const [isSpecialSchool, setIsSpecialSchool] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasAllergy, setHasAllergy] = useState(false);
  const [currentMedication, setCurrentMedication] = useState('');

  useEffect(() => {
    if (isEditMode && existingPatient) {
      setName(existingPatient.name);
      setDateOfBirth(existingPatient.dateOfBirth);
      setCpf(existingPatient.cpf);
      setPhone(existingPatient.phone || '');
      setAddress(existingPatient.address);

      // Carregar responsável existente
      if (existingPatient.responsible && existingPatient.responsibleContact) {
        setResponsibles([{
          id: '1',
          name: existingPatient.responsible,
          cpf: '',
          phone: existingPatient.responsibleContact,
          relationship: 'Responsável Principal'
        }]);
      }

      // Carregar CIDs existentes (suporta múltiplos CIDs separados por vírgula)
      if (existingPatient.cid && existingPatient.cidDescription) {
        const cidCodes = existingPatient.cid.split(',').map(c => c.trim());
        const cidDescriptions = existingPatient.cidDescription.split(',').map(d => d.trim());

        const cidsToLoad: CIDEntry[] = cidCodes.map((code, index) => ({
          code: code,
          description: cidDescriptions[index] || code,
          category: 'Diagnóstico Existente'
        }));

        setSelectedCIDs(cidsToLoad);
      }
    } else {
      // Gerar matrícula automaticamente para novos pacientes
      const generatedMatricula = `PAC${Date.now().toString().slice(-8)}`;
      setMatricula(generatedMatricula);
    }
  }, [isEditMode, existingPatient]);

  const handleCIDSearch = (query: string) => {
    setCidSearch(query);
    if (query.length >= 2) {
      const results = searchCID(query).slice(0, 10);
      setCidSearchResults(results);
      setShowCIDResults(true);
    } else {
      setCidSearchResults([]);
      setShowCIDResults(false);
    }
  };

  const addCID = (cid: CIDEntry) => {
    if (!selectedCIDs.find(c => c.code === cid.code)) {
      setSelectedCIDs([...selectedCIDs, cid]);
    }
    setCidSearch('');
    setShowCIDResults(false);
  };

  const removeCID = (code: string) => {
    setSelectedCIDs(selectedCIDs.filter(c => c.code !== code));
  };

  const addResponsible = () => {
    if (newResponsibleName && newResponsiblePhone) {
      const newResponsible: Responsible = {
        id: Date.now().toString(),
        name: newResponsibleName,
        cpf: newResponsibleCpf,
        phone: newResponsiblePhone,
        relationship: newResponsibleRelationship
      };
      setResponsibles([...responsibles, newResponsible]);
      
      // Limpar campos
      setNewResponsibleName('');
      setNewResponsibleCpf('');
      setNewResponsiblePhone('');
      setNewResponsibleRelationship('');
    }
  };

  const removeResponsible = (id: string) => {
    setResponsibles(responsibles.filter(r => r.id !== id));
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
                <h1 className="text-lg">{isEditMode ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}</h1>
                <p className="text-xs text-gray-500">
                  {isEditMode ? 'Atualize os dados do paciente' : 'Preencha os dados do paciente'}
                </p>
              </div>
            </div>
            <Button onClick={onSave} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Save className="h-4 w-4" />
              {isEditMode ? 'Salvar Alterações' : 'Salvar Cadastro'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Dados Pessoais Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base">Dados Pessoais</h3>
                  <p className="text-xs text-gray-500">Informações básicas do paciente</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ex: João da Silva Santos"
                    className="bg-gray-50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                  <Input 
                    id="dateOfBirth" 
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)} 
                    type="date"
                    className="bg-gray-50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input 
                    id="cpf" 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                    placeholder="000.000.000-00"
                    className="bg-gray-50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    placeholder="00.000.000-0"
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input
                    id="matricula"
                    value={matricula}
                    disabled
                    className="bg-gray-100 text-gray-600 cursor-not-allowed"
                    placeholder="Gerado automaticamente"
                  />
                  <p className="text-xs text-gray-500">ID único gerado automaticamente</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contato Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-emerald-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base">Contato</h3>
                  <p className="text-xs text-gray-500">Telefones e endereço</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone Principal</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(11) 98765-4321"
                    className="bg-gray-50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone2">Telefone Secundário</Label>
                  <Input 
                    id="phone2" 
                    value={phone2} 
                    onChange={(e) => setPhone2(e.target.value)} 
                    placeholder="(11) 3456-7890"
                    className="bg-gray-50" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Rua, número, bairro, cidade - Estado, CEP"
                    className="bg-gray-50" 
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Escola Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-amber-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base">Informações Escolares</h3>
                  <p className="text-xs text-gray-500">Dados sobre a instituição de ensino</p>
                </div>
              </div>
              <div className="space-y-4">
                {/* Pergunta 1: Frequenta escola? */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="attendsSchool"
                    checked={attendsSchool}
                    onChange={(e) => {
                      setAttendsSchool(e.target.checked);
                      if (!e.target.checked) {
                        setIsSpecialSchool(false);
                        setSchoolName('');
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <Label htmlFor="attendsSchool" className="cursor-pointer mb-0">
                    Paciente frequenta escola
                  </Label>
                </div>

                {/* Pergunta 2: É escola especial? (só aparece se frequenta escola) */}
                {attendsSchool && (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <input
                      type="checkbox"
                      id="isSpecialSchool"
                      checked={isSpecialSchool}
                      onChange={(e) => setIsSpecialSchool(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                    />
                    <Label htmlFor="isSpecialSchool" className="cursor-pointer mb-0">
                      É uma escola especial
                    </Label>
                  </div>
                )}

                {/* Pergunta 3: Nome da escola (só aparece se frequenta escola) */}
                {attendsSchool && (
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Nome da Escola</Label>
                    <Input
                      id="schoolName"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: EMEF Paulo Freire"
                      className="bg-gray-50"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Convênio Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-indigo-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base">Convênio Médico</h3>
                  <p className="text-xs text-gray-500">Informações sobre plano de saúde</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="hasInsurance"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <Label htmlFor="hasInsurance" className="cursor-pointer mb-0">
                    Paciente possui convênio médico
                  </Label>
                </div>
                {hasInsurance && (
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Operadora do Convênio</Label>
                    <Input
                      id="insuranceProvider"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      placeholder="Ex: Unimed, Bradesco Saúde, SulAmérica"
                      className="bg-gray-50"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Responsáveis Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-purple-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base">Responsáveis</h3>
                  <p className="text-xs text-gray-500">Cadastre os responsáveis pelo paciente</p>
                </div>
              </div>

              {/* Lista de Responsáveis */}
              {responsibles.length > 0 && (
                <div className="mb-6 space-y-3">
                  {responsibles.map((resp) => (
                    <div key={resp.id} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-900">{resp.name}</p>
                          {resp.relationship && (
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs">
                              {resp.relationship}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                          {resp.cpf && <span>CPF: {resp.cpf}</span>}
                          <span>Tel: {resp.phone}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeResponsible(resp.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Adicionar Novo Responsável */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm">Adicionar Novo Responsável</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Input 
                      value={newResponsibleName}
                      onChange={(e) => setNewResponsibleName(e.target.value)}
                      placeholder="Nome completo do responsável *"
                      className="bg-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      value={newResponsibleCpf}
                      onChange={(e) => setNewResponsibleCpf(e.target.value)}
                      placeholder="CPF"
                      className="bg-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      value={newResponsiblePhone}
                      onChange={(e) => setNewResponsiblePhone(e.target.value)}
                      placeholder="Telefone *"
                      className="bg-white" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Input 
                      value={newResponsibleRelationship}
                      onChange={(e) => setNewResponsibleRelationship(e.target.value)}
                      placeholder="Parentesco (ex: Mãe, Pai, Tio, Avó)"
                      className="bg-white" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={addResponsible}
                  className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                  disabled={!newResponsibleName || !newResponsiblePhone}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Responsável
                </Button>
              </div>
            </div>
          </Card>

          {/* Informações Médicas Card */}
          <Card className="bg-white shadow-sm border-l-4 border-l-red-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base">Informações Médicas</h3>
                  <p className="text-xs text-gray-500">CID, condições prévias e medicamentos</p>
                </div>
              </div>

              {/* Condições Prévias */}
              <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <Label className="text-sm text-orange-900 mb-0">Condições Prévias</Label>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasHypertension"
                        checked={hasHypertension}
                        onChange={(e) => setHasHypertension(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor="hasHypertension" className="cursor-pointer mb-0 text-sm">
                        Hipertensão
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasAllergy"
                        checked={hasAllergy}
                        onChange={(e) => setHasAllergy(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor="hasAllergy" className="cursor-pointer mb-0 text-sm">
                        Alergia
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentMedication">Medicação Atual</Label>
                    <Input
                      id="currentMedication"
                      value={currentMedication}
                      onChange={(e) => setCurrentMedication(e.target.value)}
                      placeholder="Descreva medicamentos em uso contínuo"
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* CID Search */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="cidSearch">Buscar CID *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="cidSearch"
                    value={cidSearch}
                    onChange={(e) => handleCIDSearch(e.target.value)}
                    placeholder="Digite o código CID ou nome da doença (ex: F84.0, Autismo, Down)"
                    className="pl-10 bg-gray-50"
                  />
                  
                  {showCIDResults && cidSearchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {cidSearchResults.map((cid) => (
                        <button
                          key={cid.code}
                          onClick={() => addCID(cid)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                  {cid.code}
                                </span>
                                <span className="text-xs text-gray-500">{cid.category}</span>
                              </div>
                              <p className="text-sm text-gray-900">{cid.description}</p>
                            </div>
                            <Plus className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Digite pelo menos 2 caracteres para buscar. O paciente pode ter múltiplos CIDs.
                </p>
              </div>

              {/* Selected CIDs */}
              {selectedCIDs.length > 0 && (
                <div className="space-y-2 mb-4">
                  <Label>CIDs Selecionados</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCIDs.map((cid) => (
                      <Badge 
                        key={cid.code}
                        className="bg-blue-600 hover:bg-blue-700 pr-1 text-xs py-1.5"
                      >
                        <span className="mr-2">{cid.code} - {cid.description}</span>
                        <button
                          onClick={() => removeCID(cid.code)}
                          className="ml-1 hover:bg-blue-800 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Medical Info */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Alergias</Label>
                  <Textarea 
                    id="allergies" 
                    value={allergies} 
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Descreva alergias conhecidas (medicamentos, alimentos, etc.)"
                    rows={2}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Medicamentos em Uso</Label>
                  <Textarea 
                    id="medications" 
                    value={medications} 
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="Liste os medicamentos que o paciente utiliza atualmente"
                    rows={2}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações Gerais</Label>
                  <Textarea 
                    id="observations" 
                    value={observations} 
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Informações adicionais relevantes sobre o paciente"
                    rows={3}
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-sm border-cyan-200">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-cyan-600 mt-0.5" />
                <div>
                  <h4 className="text-sm text-cyan-900 mb-2">Informação Importante</h4>
                  <p className="text-xs text-cyan-700 leading-relaxed">
                    Preencha todos os campos obrigatórios (*) para concluir o cadastro. 
                    As informações médicas e de responsáveis são essenciais para um atendimento adequado.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}