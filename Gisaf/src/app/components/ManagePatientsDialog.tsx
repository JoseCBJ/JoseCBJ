import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, UserPlus, Edit, Trash2, User } from 'lucide-react';
import { mockPatients } from '../lib/mockData';
import { useState } from 'react';

interface ManagePatientsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ManagePatientsDialog({ open, onClose }: ManagePatientsDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Gerenciar Pacientes</DialogTitle>
          <DialogDescription>
            Cadastrar, editar e visualizar pacientes
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="list" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" onClick={() => setShowAddForm(false)}>
              Lista de Pacientes
            </TabsTrigger>
            <TabsTrigger value="add" onClick={() => setShowAddForm(true)}>
              Novo Paciente
            </TabsTrigger>
          </TabsList>

          {/* Patients List */}
          <TabsContent value="list" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por nome ou CPF..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>CID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm">{patient.name}</p>
                            <p className="text-xs text-gray-600">
                              {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} anos
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{patient.cpf}</TableCell>
                      <TableCell>
                        <p className="text-sm">{patient.responsible}</p>
                        <p className="text-xs text-gray-600">{patient.responsibleContact}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs">{patient.cid}</p>
                        <p className="text-xs text-gray-600">{patient.cidDescription}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-600">Ativo</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Total: {filteredPatients.length} pacientes
            </div>
          </TabsContent>

          {/* Add Patient Form */}
          <TabsContent value="add" className="flex-1 overflow-y-auto mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Nome Completo *</Label>
                  <Input id="patientName" placeholder="Ex: João da Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 98765-4321" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, número, bairro - Cidade, Estado" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável *</Label>
                  <Input id="responsible" placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibleContact">Contato do Responsável *</Label>
                  <Input id="responsibleContact" placeholder="(11) 98765-4321" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cid">CID (Código)</Label>
                  <Input id="cid" placeholder="Ex: F84.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidDescription">Descrição CID</Label>
                  <Input id="cidDescription" placeholder="Ex: Autismo Infantil" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar Paciente
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
