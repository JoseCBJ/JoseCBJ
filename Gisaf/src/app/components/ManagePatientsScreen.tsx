import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Search, Edit, Trash2, User, Plus, Eye } from 'lucide-react';
import { mockPatients } from '../lib/mockData';
import { useState } from 'react';

interface ManagePatientsScreenProps {
  onBack: () => void;
  onAddPatient: () => void;
  onViewPatient?: (patientId: string) => void;
  onEditPatient?: (patientId: string) => void;
}

export function ManagePatientsScreen({ onBack, onAddPatient, onViewPatient, onEditPatient }: ManagePatientsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm)
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
                <h1 className="text-lg">Gestão de Pacientes</h1>
                <p className="text-xs text-gray-500">Visualizar e gerenciar cadastros</p>
              </div>
            </div>
            <Button onClick={onAddPatient} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4" />
              Novo Paciente
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
                  placeholder="Buscar por nome ou CPF..." 
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total: <span className="text-gray-900">{filteredPatients.length} pacientes</span>
              </p>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Paciente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>CID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm">{patient.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} anos
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{patient.cpf}</TableCell>
                      <TableCell>
                        <p className="text-sm">{patient.responsible}</p>
                        <p className="text-xs text-gray-500">{patient.responsibleContact}</p>
                      </TableCell>
                      <TableCell>
                        {patient.cid && patient.cidDescription && (() => {
                          const cidCodes = patient.cid.split(',').map(c => c.trim());
                          const cidDescriptions = patient.cidDescription.split(',').map(d => d.trim());
                          
                          if (cidCodes.length > 1) {
                            return (
                              <div className="space-y-1">
                                <p className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded inline-block">
                                  {cidCodes[0]}
                                </p>
                                <p className="text-xs text-gray-900">{cidDescriptions[0]}</p>
                                <p className="text-xs text-gray-500">
                                  +{cidCodes.length - 1} {cidCodes.length - 1 === 1 ? 'outro' : 'outros'}
                                </p>
                              </div>
                            );
                          }
                          
                          return (
                            <>
                              <p className="text-xs">{patient.cid}</p>
                              <p className="text-xs text-gray-500">{patient.cidDescription}</p>
                            </>
                          );
                        })()}
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
                            onClick={() => onViewPatient && onViewPatient(patient.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => onEditPatient && onEditPatient(patient.id)}
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