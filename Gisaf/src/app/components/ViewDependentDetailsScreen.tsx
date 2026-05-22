import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Heart,
  FileText,
  AlertCircle,
  Users
} from 'lucide-react';
import { Patient } from '../types';

interface ViewDependentDetailsScreenProps {
  patient: Patient;
  onBack: () => void;
  onEdit: () => void;
}

export function ViewDependentDetailsScreen({ patient, onBack, onEdit }: ViewDependentDetailsScreenProps) {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.dateOfBirth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-lg">Detalhes do Dependente</h1>
                <p className="text-xs text-gray-500">Informações cadastrais</p>
              </div>
            </div>
            <Button 
              onClick={onEdit}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Solicitar Alteração
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          
          {/* Patient Header */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-12 w-12 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl mb-1">{patient.name}</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {age} anos • CPF: {patient.cpf}
                  </p>
                  <Badge className="bg-green-600">Ativo</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base">Dados Pessoais</h3>
                  <p className="text-xs text-gray-500">Informações de identificação</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nome Completo</p>
                  <p className="text-sm">{patient.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">CPF</p>
                  <p className="text-sm">{patient.cpf}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">Data de Nascimento</p>
                  </div>
                  <p className="text-sm">{new Date(patient.dateOfBirth).toLocaleDateString('pt-BR')}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Idade</p>
                  <p className="text-sm">{age} anos</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base">Endereço e Contato</h3>
                  <p className="text-xs text-gray-500">Localização e telefone</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Endereço</p>
                  <p className="text-sm">{patient.address}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">Telefone</p>
                  </div>
                  <p className="text-sm">{patient.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Health Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base">Informações de Saúde</h3>
                  <p className="text-xs text-gray-500">Diagnóstico e condições</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">CID Principal</p>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <Badge className="bg-emerald-600">{patient.cid}</Badge>
                    <p className="text-sm text-gray-700">{patient.cidDescription}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-800 mb-1">
                        <strong>Informações Importantes</strong>
                      </p>
                      <p className="text-xs text-blue-700">
                        Para informações detalhadas sobre o tratamento e medicações, consulte a equipe médica da APAE.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Responsible Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base">Responsável</h3>
                  <p className="text-xs text-gray-500">Informações do responsável legal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nome do Responsável</p>
                  <p className="text-sm">{patient.responsible}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">Telefone</p>
                  </div>
                  <p className="text-sm">{patient.responsibleContact}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Help Section */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 mb-1">
                  <strong>Precisa atualizar alguma informação?</strong>
                </p>
                <p className="text-xs text-yellow-700">
                  Clique em "Solicitar Alteração" para enviar uma solicitação de atualização cadastral. 
                  A equipe administrativa da APAE irá analisar e processar sua solicitação.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
