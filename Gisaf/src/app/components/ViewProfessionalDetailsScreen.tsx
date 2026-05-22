import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Mail, FileText, Award, Briefcase } from 'lucide-react';
import { mockProfessionals } from '../lib/mockData';

interface ViewProfessionalDetailsScreenProps {
  professionalId: string;
  onBack: () => void;
  onEdit: () => void;
}

export function ViewProfessionalDetailsScreen({ professionalId, onBack, onEdit }: ViewProfessionalDetailsScreenProps) {
  const professional = mockProfessionals.find(p => p.id === professionalId);

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <p className="text-gray-600">Profissional não encontrado</p>
          <Button onClick={onBack} className="mt-4">Voltar</Button>
        </Card>
      </div>
    );
  }

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
                <h1 className="text-lg">Detalhes do Profissional</h1>
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
        {/* Professional Header Card */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl mb-2">{professional.name}</h2>
                    <div className="flex gap-3 mb-3">
                      <Badge className="bg-green-600">Ativo</Badge>
                      <Badge variant="outline">{professional.specialty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Registro Profissional</p>
                    <p className="text-sm">{professional.crm}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm">{professional.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-base">Informações Profissionais</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nome Completo</p>
                  <p className="text-sm">{professional.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Especialidade</p>
                  <p className="text-sm">{professional.specialty}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <Badge className="bg-green-600">Ativo</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Registration Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base">Registro e Certificações</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Registro Profissional</p>
                  <p className="text-sm">{professional.crm}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Conselho Regional</p>
                  <p className="text-sm">
                    {professional.crm.includes('CRM') ? 'Conselho Regional de Medicina' :
                     professional.crm.includes('CREFITO') ? 'Conselho Regional de Fisioterapia' :
                     professional.crm.includes('CRFa') ? 'Conselho Regional de Fonoaudiologia' :
                     professional.crm.includes('CRP') ? 'Conselho Regional de Psicologia' :
                     'Conselho Regional'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-base">Contato</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Institucional</p>
                  <p className="text-sm">{professional.email}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-base">Informações Adicionais</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID do Profissional</p>
                  <p className="text-sm">#{professional.id}</p>
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
