import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Edit, Eye } from 'lucide-react';
import { mockPatients } from '../lib/mockData';
import { Patient } from '../types';

interface ManageDependentsScreenProps {
  onBack: () => void;
  onViewDependent: (patient: Patient) => void;
  onEditDependent: (patient: Patient) => void;
  responsibleName: string;
}

export function ManageDependentsScreen({ 
  onBack, 
  onViewDependent, 
  onEditDependent,
  responsibleName 
}: ManageDependentsScreenProps) {
  // Filtrar pacientes que pertencem ao responsável atual
  const dependents = mockPatients.filter(
    patient => patient.responsible === responsibleName
  );

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
              <h1 className="text-lg">Meus Dependentes</h1>
              <p className="text-xs text-gray-500">Gerenciar informações dos dependentes</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Responsável:</strong> {responsibleName}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Você pode visualizar os dados dos seus dependentes e solicitar alterações quando necessário.
          </p>
        </div>

        {/* Dependents List */}
        <div className="space-y-4">
          {dependents.length === 0 ? (
            <Card className="p-12 bg-white border border-gray-200 shadow-sm text-center">
              <div className="max-w-sm mx-auto">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-base mb-2">Nenhum dependente encontrado</h3>
                <p className="text-sm text-gray-500">
                  Não há dependentes cadastrados para este responsável.
                </p>
              </div>
            </Card>
          ) : (
            dependents.map((dependent) => (
              <Card key={dependent.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base mb-1">{dependent.name}</h3>
                          <p className="text-sm text-gray-600">
                            {calculateAge(dependent.dateOfBirth)} anos • CPF: {dependent.cpf}
                          </p>
                        </div>
                        <Badge className="bg-green-600">Ativo</Badge>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Data de Nascimento</p>
                          <p className="text-sm">
                            {new Date(dependent.dateOfBirth).toLocaleDateString('pt-BR')}
                          </p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Telefone</p>
                          <p className="text-sm">{dependent.phone}</p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">CID Principal</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                              {dependent.cid}
                            </Badge>
                            <p className="text-xs text-gray-600">{dependent.cidDescription}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Endereço</p>
                          <p className="text-sm">{dependent.address}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="gap-2"
                          onClick={() => onViewDependent(dependent)}
                        >
                          <Eye className="h-4 w-4" />
                          Ver Detalhes
                        </Button>
                        <Button 
                          size="sm"
                          className="gap-2 bg-purple-600 hover:bg-purple-700"
                          onClick={() => onEditDependent(dependent)}
                        >
                          <Edit className="h-4 w-4" />
                          Solicitar Alteração
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>💡 Dica:</strong> Para solicitar alterações nos dados cadastrais, clique em "Solicitar Alteração". 
            A equipe administrativa da APAE irá revisar e processar sua solicitação.
          </p>
        </div>
      </main>
    </div>
  );
}
