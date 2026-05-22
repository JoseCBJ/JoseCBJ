import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Phone, MapPin, FileText, Calendar, Heart } from 'lucide-react';
import { mockPatients } from '../lib/mockData';

interface ViewPatientDetailsScreenProps {
  patientId: string;
  onBack: () => void;
  onEdit: () => void;
}

export function ViewPatientDetailsScreen({ patientId, onBack, onEdit }: ViewPatientDetailsScreenProps) {
  const patient = mockPatients.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <p className="text-gray-600">Paciente não encontrado</p>
          <Button onClick={onBack} className="mt-4">Voltar</Button>
        </Card>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

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
                <h1 className="text-lg">Detalhes do Paciente</h1>
                <p className="text-xs text-gray-500">Visualização completa do cadastro</p>
              </div>
            </div>
            <Button onClick={onEdit} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              Editar Cadastro
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Patient Header Card */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl mb-2">{patient.name}</h2>
                    <div className="flex gap-3 mb-3">
                      <Badge className="bg-green-600">Ativo</Badge>
                      <Badge variant="outline">{age} anos</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CPF</p>
                    <p className="text-sm">{patient.cpf}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Data de Nascimento</p>
                    <p className="text-sm">
                      {new Date(patient.dateOfBirth).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CID</p>
                    <p className="text-sm">{patient.cid} - {patient.cidDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base">Informações de Contato</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Responsável</p>
                  <p className="text-sm">{patient.responsible}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Telefone do Responsável</p>
                  <p className="text-sm">{patient.responsibleContact}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Telefone do Paciente</p>
                  <p className="text-sm">{patient.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-base">Endereço</h3>
              </div>
              <div>
                <p className="text-sm">{patient.address}</p>
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-base">Informações Médicas</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Diagnóstico(s) (CID)</p>
                  {patient.cid && patient.cidDescription && (() => {
                    const cidCodes = patient.cid.split(',').map(c => c.trim());
                    const cidDescriptions = patient.cidDescription.split(',').map(d => d.trim());
                    
                    return (
                      <div className="space-y-2">
                        {cidCodes.map((code, index) => (
                          <div key={code} className="p-3 bg-red-50 border border-red-100 rounded-lg">
                            <div className="flex items-start gap-2">
                              <span className="text-xs px-2 py-0.5 bg-red-200 text-red-800 rounded">
                                {code}
                              </span>
                              <p className="text-sm text-gray-900 flex-1">
                                {cidDescriptions[index] || code}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-base">Informações Adicionais</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID do Paciente</p>
                  <p className="text-sm">#{patient.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Data de Cadastro</p>
                  <p className="text-sm">
                    {new Date().toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button onClick={onBack} variant="outline" className="flex-1">
            Voltar à Lista
          </Button>
          <Button onClick={onEdit} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
            Editar Cadastro
          </Button>
        </div>
      </main>
    </div>
  );
}