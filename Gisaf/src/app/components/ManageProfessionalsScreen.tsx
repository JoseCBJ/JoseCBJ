import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Search, Edit, Trash2, Plus, User, Eye } from 'lucide-react';
import { mockProfessionals } from '../lib/mockData';
import { useState } from 'react';

interface ManageProfessionalsScreenProps {
  onBack: () => void;
  onAddProfessional: () => void;
  onViewProfessional?: (professionalId: string) => void;
  onEditProfessional?: (professionalId: string) => void;
}

export function ManageProfessionalsScreen({ onBack, onAddProfessional, onViewProfessional, onEditProfessional }: ManageProfessionalsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = mockProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-lg">Gestão de Profissionais</h1>
                <p className="text-xs text-gray-500">Gerenciar corpo clínico</p>
              </div>
            </div>
            <Button onClick={onAddProfessional} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4" />
              Novo Profissional
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por nome ou especialidade..." 
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total: <span className="text-gray-900">{filteredProfessionals.length} profissionais</span>
              </p>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Profissional</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfessionals.map((professional) => (
                    <TableRow key={professional.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm">{professional.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{professional.specialty}</TableCell>
                      <TableCell className="text-sm">{professional.crm}</TableCell>
                      <TableCell>
                        <p className="text-sm">{professional.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-600">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => onViewProfessional && onViewProfessional(professional.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => onEditProfessional && onEditProfessional(professional.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}