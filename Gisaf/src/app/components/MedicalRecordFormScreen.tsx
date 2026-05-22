import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Heart, 
  Users, 
  Phone, 
  Mail, 
  Upload,
  X,
  Plus,
  Trash2
} from 'lucide-react';

interface Responsavel {
  id: string;
  grauParentesco: string;
  foto?: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  ocupacao: string;
  notificacoesWhatsApp: string;
}

interface MedicalRecordFormScreenProps {
  onBack: () => void;
  onSave?: () => void;
  patientId?: string;
}

export function MedicalRecordFormScreen({ onBack, onSave }: MedicalRecordFormScreenProps) {
  // Estados para campos condicionais
  const [cadastroStatus, setCadastroStatus] = useState('active');
  const [frequentaEscola, setFrequentaEscola] = useState<string>('');
  const [utilizaMedicamentos, setUtilizaMedicamentos] = useState<string>('');
  const [possuiAlergia, setPossuiAlergia] = useState<string>('');
  const [possuiComorbidade, setPossuiComorbidade] = useState<string>('');
  const [possuiConvenio, setPossuiConvenio] = useState<string>('');
  const [liberadoAtividade, setLiberadoAtividade] = useState<string>('');
  const [autorizacaoImagem, setAutorizacaoImagem] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Estados para CIDs (multi-select)
  const [selectedCids, setSelectedCids] = useState<string[]>([]);
  const [cidInput, setCidInput] = useState('');

  // Estados para responsáveis (lista dinâmica)
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);

  // Checkboxes de mobilidade
  const [mobilidade, setMobilidade] = useState({
    cadeiraRodas: false,
    cadeiraBanho: false,
    calcadoOrtopedico: false,
    andador: false,
    ortese: false,
    protese: false,
    muleta: false,
    bengala: false,
  });

  // Lista de CIDs comuns (simulando autocomplete)
  const cidsComuns = [
    'F84.0 - Autismo infantil',
    'F84.5 - Síndrome de Asperger',
    'F70 - Retardo mental leve',
    'F71 - Retardo mental moderado',
    'F72 - Retardo mental grave',
    'F90.0 - Transtorno de déficit de atenção com hiperatividade',
    'G80.0 - Paralisia cerebral espástica',
    'Q90 - Síndrome de Down',
    'F80.1 - Transtorno expressivo de linguagem',
    'F82 - Transtorno específico do desenvolvimento motor',
  ];

  const filteredCids = cidsComuns.filter(cid =>
    cid.toLowerCase().includes(cidInput.toLowerCase())
  );

  const addCid = (cid: string) => {
    if (!selectedCids.includes(cid)) {
      setSelectedCids([...selectedCids, cid]);
      setCidInput('');
    }
  };

  const removeCid = (cid: string) => {
    setSelectedCids(selectedCids.filter(c => c !== cid));
  };

  const addResponsavel = () => {
    const newResponsavel: Responsavel = {
      id: Date.now().toString(),
      grauParentesco: '',
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      ocupacao: '',
      notificacoesWhatsApp: '',
    };
    setResponsaveis([...responsaveis, newResponsavel]);
  };

  const removeResponsavel = (id: string) => {
    setResponsaveis(responsaveis.filter(r => r.id !== id));
  };

  const updateResponsavel = (id: string, field: keyof Responsavel, value: string) => {
    setResponsaveis(responsaveis.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  // Calcular idade baseado na data de nascimento
  const calcularIdade = (dataNasc: string) => {
    if (!dataNasc) return '';
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade >= 0 ? `${idade} anos` : '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.();
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-lg">Cadastrar Paciente</h1>
              <p className="text-xs text-gray-500">Cadastro completo do paciente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. DADOS PESSOAIS */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-base">Dados Pessoais</h2>
                  <p className="text-xs text-gray-500">Informações de identificação do paciente</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input id="nome" placeholder="Nome completo do paciente" required />
                </div>

                <div>
                  <Label htmlFor="nomeSocial">Nome Social</Label>
                  <Input id="nomeSocial" placeholder="Nome social (se aplicável)" />
                </div>

                <div>
                  <Label htmlFor="prontuario">Nº do Prontuário *</Label>
                  <Input id="prontuario" placeholder="Ex: 2025-0001" required />
                </div>

                <div>
                  <Label htmlFor="dataCadastro">Data de Cadastro *</Label>
                  <Input id="dataCadastro" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                </div>

                <div>
                  <Label htmlFor="situacaoCadastro">Situação do Cadastro *</Label>
                  <Select value={cadastroStatus} onValueChange={setCadastroStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="areaAtendimento">Área de Atendimento *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assistance">Assistência</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dataEntrada">Data de Entrada</Label>
                  <Input id="dataEntrada" type="date" />
                </div>

                <div>
                  <Label htmlFor="dataSaida">Data de Saída</Label>
                  <Input id="dataSaida" type="date" />
                </div>

                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" required />
                </div>

                <div>
                  <Label htmlFor="rg">RG</Label>
                  <Input id="rg" placeholder="00.000.000-0" />
                </div>

                <div>
                  <Label htmlFor="dataEmissaoRg">Data de Emissão do RG</Label>
                  <Input id="dataEmissaoRg" type="date" />
                </div>

                <div>
                  <Label htmlFor="ra">RA (Registro de Aluno)</Label>
                  <Input id="ra" placeholder="Número do RA" />
                </div>

                <div>
                  <Label htmlFor="certidaoNascimento">Nº da Certidão de Nascimento</Label>
                  <Input id="certidaoNascimento" placeholder="Número da certidão" />
                </div>

                <div>
                  <Label htmlFor="livroFolha">Livro/Folha</Label>
                  <Input id="livroFolha" placeholder="Ex: Livro 123, Folha 45" />
                </div>

                <div>
                  <Label htmlFor="cartorio">Cartório</Label>
                  <Input id="cartorio" placeholder="Nome do cartório" />
                </div>

                <div>
                  <Label htmlFor="naturalidade">Naturalidade</Label>
                  <Input id="naturalidade" placeholder="Cidade/UF de nascimento" />
                </div>

                <div>
                  <Label htmlFor="sexo">Sexo *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                      <SelectItem value="not_informed">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input 
                    id="dataNascimento" 
                    type="date" 
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="idade">Idade</Label>
                  <Input 
                    id="idade" 
                    value={calcularIdade(dataNascimento)}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="ocupacao">Ocupação</Label>
                  <Input id="ocupacao" placeholder="Ocupação do paciente" />
                </div>

                <div>
                  <Label htmlFor="carteiraPcd">Nº da Carteira PCD</Label>
                  <Input id="carteiraPcd" placeholder="Número da carteira" />
                </div>

                <div>
                  <Label htmlFor="nis">Nº do Cartão NIS</Label>
                  <Input id="nis" placeholder="Número NIS" />
                </div>

                <div>
                  <Label htmlFor="cns">Nº do Cartão SUS (CNS) *</Label>
                  <Input id="cns" placeholder="000 0000 0000 0000" required />
                </div>

                <div>
                  <Label htmlFor="raca">Raça/Cor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branca">Branca</SelectItem>
                      <SelectItem value="preta">Preta</SelectItem>
                      <SelectItem value="parda">Parda</SelectItem>
                      <SelectItem value="amarela">Amarela</SelectItem>
                      <SelectItem value="indigena">Indígena</SelectItem>
                      <SelectItem value="not_informed">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Mobilidade */}
              <div className="space-y-4">
                <Label className="text-sm">Recursos de Mobilidade</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries({
                    cadeiraRodas: 'Cadeira de Rodas',
                    cadeiraBanho: 'Cadeira de Banho',
                    calcadoOrtopedico: 'Calçado Ortopédico',
                    andador: 'Andador',
                    ortese: 'Órtese',
                    protese: 'Prótese',
                    muleta: 'Muleta',
                    bengala: 'Bengala',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={mobilidade[key as keyof typeof mobilidade]}
                        onCheckedChange={(checked) =>
                          setMobilidade({ ...mobilidade, [key]: checked })
                        }
                      />
                      <Label htmlFor={key} className="text-sm cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Informações de Saúde */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoDeficiencia">Tipo de Deficiência</Label>
                  <Input id="tipoDeficiencia" placeholder="Descreva o tipo de deficiência" />
                </div>

                <div>
                  <Label htmlFor="transtornos">Transtornos</Label>
                  <Input id="transtornos" placeholder="Descreva transtornos, se houver" />
                </div>

                <div className="md:col-span-2">
                  <Label>Códigos CID (Diagnósticos)</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Digite para buscar e adicionar múltiplos códigos CID
                  </p>
                  
                  {/* Campo de busca */}
                  <div className="relative">
                    <Input
                      placeholder="Buscar CID (ex: F84.0, Autismo...)"
                      value={cidInput}
                      onChange={(e) => setCidInput(e.target.value)}
                      className="mb-2"
                    />
                    
                    {/* Lista de sugestões autocomplete */}
                    {cidInput && filteredCids.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredCids.map((cid) => (
                          <button
                            key={cid}
                            type="button"
                            onClick={() => addCid(cid)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                          >
                            {cid}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tags dos CIDs selecionados */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCids.map((cid) => (
                      <div
                        key={cid}
                        className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm border border-emerald-200"
                      >
                        <span>{cid}</span>
                        <button
                          type="button"
                          onClick={() => removeCid(cid)}
                          className="hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedCids.length === 0 && (
                    <p className="text-xs text-gray-400 italic mt-2">
                      Nenhum CID adicionado ainda
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cbdfDominio">CBDF - Domínio</Label>
                  <Input id="cbdfDominio" placeholder="Domínio CBDF" />
                </div>

                <div>
                  <Label htmlFor="cbdfCodigo">CBDF - Código</Label>
                  <Input id="cbdfCodigo" placeholder="Código CBDF" />
                </div>
              </div>
            </div>
          </Card>

          {/* 2. ENDEREÇO E CONTATO */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base">Endereço e Contato</h2>
                  <p className="text-xs text-gray-500">Localização e formas de contato</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input id="cep" placeholder="00000-000" required />
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input id="endereco" placeholder="Rua, avenida, etc." required />
                </div>

                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input id="numero" placeholder="Nº" required />
                </div>

                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Apto, bloco, etc." />
                </div>

                <div>
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input id="bairro" placeholder="Nome do bairro" required />
                </div>

                <div>
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input id="cidade" placeholder="Nome da cidade" required />
                </div>

                <div>
                  <Label htmlFor="uf">UF *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosBrasileiros.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      E-mail
                    </div>
                  </Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>

                <div>
                  <Label htmlFor="telefoneResidencial">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      Telefone Residencial
                    </div>
                  </Label>
                  <Input id="telefoneResidencial" placeholder="(00) 0000-0000" />
                </div>

                <div>
                  <Label htmlFor="telefoneRecados">Telefone para Recados</Label>
                  <Input id="telefoneRecados" placeholder="(00) 00000-0000" />
                </div>

                <div>
                  <Label htmlFor="pessoaContato">Pessoa de Contato</Label>
                  <Input id="pessoaContato" placeholder="Nome da pessoa" />
                </div>
              </div>
            </div>
          </Card>

          {/* 3. SITUAÇÃO EDUCACIONAL, SAÚDE E SOCIOECONÔMICA */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-base">Situação Educacional, Saúde e Socioeconômica</h2>
                  <p className="text-xs text-gray-500">Informações complementares sobre a situação do paciente</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Frequenta escola */}
                <div className="space-y-3">
                  <Label>Frequenta escola regular? *</Label>
                  <RadioGroup value={frequentaEscola} onValueChange={setFrequentaEscola}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="escolaSim" />
                        <Label htmlFor="escolaSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="escolaNao" />
                        <Label htmlFor="escolaNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {frequentaEscola === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="nomeEscola">Nome da Escola</Label>
                      <Input id="nomeEscola" placeholder="Digite o nome da escola" />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Utiliza medicamentos */}
                <div className="space-y-3">
                  <Label>Utiliza medicamentos? *</Label>
                  <RadioGroup value={utilizaMedicamentos} onValueChange={setUtilizaMedicamentos}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="medicamentosSim" />
                        <Label htmlFor="medicamentosSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="medicamentosNao" />
                        <Label htmlFor="medicamentosNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {utilizaMedicamentos === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="quaisMedicamentos">Quais medicamentos?</Label>
                      <Textarea 
                        id="quaisMedicamentos" 
                        placeholder="Liste os medicamentos utilizados, dosagem e frequência"
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Possui alergia */}
                <div className="space-y-3">
                  <Label>Possui alergia? *</Label>
                  <RadioGroup value={possuiAlergia} onValueChange={setPossuiAlergia}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="alergiaSim" />
                        <Label htmlFor="alergiaSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="alergiaNao" />
                        <Label htmlFor="alergiaNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {possuiAlergia === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="quaisAlergias">Quais alergias?</Label>
                      <Textarea 
                        id="quaisAlergias" 
                        placeholder="Descreva as alergias e suas reações"
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Possui comorbidade */}
                <div className="space-y-3">
                  <Label>Possui comorbidade? *</Label>
                  <RadioGroup value={possuiComorbidade} onValueChange={setPossuiComorbidade}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="comorbidadeSim" />
                        <Label htmlFor="comorbidadeSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="comorbidadeNao" />
                        <Label htmlFor="comorbidadeNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {possuiComorbidade === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="quaisComorbidades">Quais comorbidades?</Label>
                      <Textarea 
                        id="quaisComorbidades" 
                        placeholder="Descreva as comorbidades"
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Possui convênio médico */}
                <div className="space-y-3">
                  <Label>Possui convênio médico? *</Label>
                  <RadioGroup value={possuiConvenio} onValueChange={setPossuiConvenio}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="convenioSim" />
                        <Label htmlFor="convenioSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="convenioNao" />
                        <Label htmlFor="convenioNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {possuiConvenio === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="nomeConvenio">Nome do Convênio</Label>
                      <Input id="nomeConvenio" placeholder="Digite o nome do convênio" />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Liberado para atividade física */}
                <div className="space-y-3">
                  <Label>Liberado para atividade física? *</Label>
                  <RadioGroup value={liberadoAtividade} onValueChange={setLiberadoAtividade}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="atividadeSim" />
                        <Label htmlFor="atividadeSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="atividadeNao" />
                        <Label htmlFor="atividadeNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {liberadoAtividade === 'yes' && (
                    <div className="pl-6 border-l-2 border-purple-200">
                      <Label htmlFor="dataLiberacao">Data de Liberação</Label>
                      <Input id="dataLiberacao" type="date" />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Convênios preferenciais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="convenioSaude">Convênio Preferencial - Saúde</Label>
                    <Input id="convenioSaude" placeholder="Nome do convênio" />
                  </div>
                  <div>
                    <Label htmlFor="convenioEducacao">Convênio Preferencial - Educação</Label>
                    <Input id="convenioEducacao" placeholder="Nome do convênio" />
                  </div>
                  <div>
                    <Label htmlFor="convenioAssistencia">Convênio Preferencial - Assistência Social</Label>
                    <Input id="convenioAssistencia" placeholder="Nome do convênio" />
                  </div>
                </div>

                <Separator />

                {/* Meio de transporte */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="transporteIda">Meio de Transporte (Ida)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprio">Veículo Próprio</SelectItem>
                        <SelectItem value="publico">Transporte Público</SelectItem>
                        <SelectItem value="escolar">Transporte Escolar</SelectItem>
                        <SelectItem value="apae">Transporte APAE</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transporteVolta">Meio de Transporte (Volta)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprio">Veículo Próprio</SelectItem>
                        <SelectItem value="publico">Transporte Público</SelectItem>
                        <SelectItem value="escolar">Transporte Escolar</SelectItem>
                        <SelectItem value="apae">Transporte APAE</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Autorização de imagem */}
                <div className="space-y-3">
                  <Label>Autorização de uso de imagem? *</Label>
                  <RadioGroup value={autorizacaoImagem} onValueChange={setAutorizacaoImagem}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="imagemSim" />
                        <Label htmlFor="imagemSim" className="cursor-pointer">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="imagemNao" />
                        <Label htmlFor="imagemNao" className="cursor-pointer">Não</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Observações */}
                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea 
                    id="observacoes" 
                    placeholder="Informações adicionais relevantes sobre o paciente..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* 4. RESPONSÁVEIS */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base">Responsáveis</h2>
                    <p className="text-xs text-gray-500">Adicione os responsáveis pelo paciente</p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  onClick={addResponsavel}
                  className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Responsável
                </Button>
              </div>

              {responsaveis.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-2">Nenhum responsável cadastrado</p>
                  <p className="text-xs text-gray-400">
                    Clique em "Adicionar Responsável" para incluir um responsável
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {responsaveis.map((responsavel, index) => (
                    <div 
                      key={responsavel.id} 
                      className="border border-gray-200 rounded-lg p-6 relative bg-gray-50"
                    >
                      {/* Botão de remover */}
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeResponsavel(responsavel.id)}
                        className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <h3 className="text-sm mb-4 text-gray-700">
                        Responsável {index + 1}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Grau de Parentesco */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <Label htmlFor={`grauParentesco-${responsavel.id}`}>
                            Grau de Parentesco *
                          </Label>
                          <Select 
                            value={responsavel.grauParentesco} 
                            onValueChange={(value) => updateResponsavel(responsavel.id, 'grauParentesco', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o grau de parentesco" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mae">Mãe</SelectItem>
                              <SelectItem value="pai">Pai</SelectItem>
                              <SelectItem value="avo">Avô/Avó</SelectItem>
                              <SelectItem value="tio">Tio/Tia</SelectItem>
                              <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                              <SelectItem value="primo">Primo/Prima</SelectItem>
                              <SelectItem value="tutor">Tutor Legal</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Foto */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <Label htmlFor={`foto-${responsavel.id}`}>Foto</Label>
                          <div className="mt-2 flex items-center gap-4">
                            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <Button type="button" variant="outline" className="gap-2">
                                <Upload className="h-4 w-4" />
                                Fazer upload da foto
                              </Button>
                              <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. Máximo 5MB.</p>
                            </div>
                          </div>
                        </div>

                        {/* Nome Completo */}
                        <div className="md:col-span-2">
                          <Label htmlFor={`nome-${responsavel.id}`}>Nome Completo *</Label>
                          <Input 
                            id={`nome-${responsavel.id}`}
                            value={responsavel.nome}
                            onChange={(e) => updateResponsavel(responsavel.id, 'nome', e.target.value)}
                            placeholder="Nome completo do responsável"
                          />
                        </div>

                        {/* CPF */}
                        <div>
                          <Label htmlFor={`cpf-${responsavel.id}`}>CPF *</Label>
                          <Input 
                            id={`cpf-${responsavel.id}`}
                            value={responsavel.cpf}
                            onChange={(e) => updateResponsavel(responsavel.id, 'cpf', e.target.value)}
                            placeholder="000.000.000-00"
                          />
                        </div>

                        {/* Telefone */}
                        <div>
                          <Label htmlFor={`telefone-${responsavel.id}`}>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              Telefone *
                            </div>
                          </Label>
                          <Input 
                            id={`telefone-${responsavel.id}`}
                            value={responsavel.telefone}
                            onChange={(e) => updateResponsavel(responsavel.id, 'telefone', e.target.value)}
                            placeholder="(00) 00000-0000"
                          />
                        </div>

                        {/* E-mail */}
                        <div className="md:col-span-2">
                          <Label htmlFor={`email-${responsavel.id}`}>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              E-mail
                            </div>
                          </Label>
                          <Input 
                            id={`email-${responsavel.id}`}
                            type="email"
                            value={responsavel.email}
                            onChange={(e) => updateResponsavel(responsavel.id, 'email', e.target.value)}
                            placeholder="email@exemplo.com"
                          />
                        </div>

                        {/* Ocupação */}
                        <div>
                          <Label htmlFor={`ocupacao-${responsavel.id}`}>Ocupação</Label>
                          <Input 
                            id={`ocupacao-${responsavel.id}`}
                            value={responsavel.ocupacao}
                            onChange={(e) => updateResponsavel(responsavel.id, 'ocupacao', e.target.value)}
                            placeholder="Profissão"
                          />
                        </div>

                        {/* Notificações WhatsApp */}
                        <div className="md:col-span-3">
                          <Label>Enviar notificações via WhatsApp?</Label>
                          <RadioGroup 
                            value={responsavel.notificacoesWhatsApp} 
                            onValueChange={(value) => updateResponsavel(responsavel.id, 'notificacoesWhatsApp', value)}
                          >
                            <div className="flex gap-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id={`whatsapp-yes-${responsavel.id}`} />
                                <Label htmlFor={`whatsapp-yes-${responsavel.id}`} className="cursor-pointer">Sim</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id={`whatsapp-no-${responsavel.id}`} />
                                <Label htmlFor={`whatsapp-no-${responsavel.id}`} className="cursor-pointer">Não</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 sticky bottom-0 bg-gray-50 py-4 border-t">
            <Button type="button" variant="outline" onClick={onBack}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Salvar Cadastro
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}