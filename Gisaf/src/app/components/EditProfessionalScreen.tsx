import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { mockProfessionals } from '../lib/mockData';
import { useState } from 'react';

interface EditProfessionalScreenProps {
  professionalId: string;
  onBack: () => void;
  onSubmit: () => void;
}

export function EditProfessionalScreen({ professionalId, onBack, onSubmit }: EditProfessionalScreenProps) {
  const professional = mockProfessionals.find(p => p.id === professionalId);

  const [formData, setFormData] = useState({
    name: professional?.name || '',
    specialty: professional?.specialty || '',
    crm: professional?.crm || '',
    email: professional?.email || '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de salvar os dados
    console.log('Dados atualizados:', formData);
    onSubmit();
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
                <h1 className="text-lg">Editar Profissional</h1>
                <p className="text-xs text-gray-500">Atualizar informações do cadastro</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="bg-white border border-gray-200 shadow-sm mb-6">
            <div className="p-6">
              <h3 className="text-base mb-4">Informações Profissionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Especialidade *</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="mt-1"
                    placeholder="Ex: Psicólogo, Fisioterapeuta..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="crm">Registro Profissional *</Label>
                  <Input
                    id="crm"
                    value={formData.crm}
                    onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                    className="mt-1"
                    placeholder="Ex: CRM-SP 123456"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Institucional *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                    placeholder="profissional@apae.org"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm mb-6">
            <div className="p-6">
              <h3 className="text-base mb-4">Informações de Sistema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>ID do Profissional</Label>
                  <Input value={`#${professional.id}`} disabled className="mt-1 bg-gray-100" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input value="Ativo" disabled className="mt-1 bg-gray-100" />
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" onClick={onBack} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700 gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}