import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ArrowLeft, Search, Edit, Trash2, Calendar, Plus, Clock, UserCheck, Eye, User, FileText } from 'lucide-react';
import { mockAppointments, mockPatients, mockProfessionals } from '../lib/mockData';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Appointment } from '../types';

interface ManageAppointmentsScreenProps {
  onBack: () => void;
  onAddAppointment: () => void;
}

export function ManageAppointmentsScreen({ onBack, onAddAppointment }: ManageAppointmentsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [showAvailability, setShowAvailability] = useState(false);
  const [searchMode, setSearchMode] = useState<'byDateTime' | 'byProfessional'>('byDateTime');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('');
  const [showProfessionalAvailability, setShowProfessionalAvailability] = useState(false);
  
  // Estados para os popups
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Estados para edição
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editProfessionalId, setEditProfessionalId] = useState('');

  // Horários disponíveis para busca
  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Gerar próximos 14 dias úteis
  const getNext14Days = () => {
    const days = [];
    const today = new Date();
    let count = 0;
    let currentDate = new Date(today);

    while (count < 14) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      // Pular sábado (6) e domingo (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(new Date(currentDate));
        count++;
      }
    }
    return days;
  };

  const next14Days = getNext14Days();

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = searchDate ? appointment.date === searchDate : true;
    const matchesTime = searchTime ? appointment.time === searchTime : true;

    return matchesSearch && matchesDate && matchesTime;
  });

  // Função para verificar horários disponíveis de um profissional específico
  const getProfessionalAvailableSlots = () => {
    if (!selectedProfessionalId) return [];

    const availableSlots: Array<{ date: Date; times: string[] }> = [];

    // Para cada dia dos próximos 14 dias
    next14Days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      
      // Consultas do profissional nesse dia
      const professionalAppointments = mockAppointments.filter(
        apt => apt.professionalId === selectedProfessionalId && apt.date === dateStr
      );

      // Horários ocupados nesse dia
      const busyTimes = professionalAppointments.map(apt => apt.time);

      // Horários disponíveis nesse dia
      const availableTimesForDay = availableTimes.filter(
        time => !busyTimes.includes(time)
      );

      if (availableTimesForDay.length > 0) {
        availableSlots.push({
          date: day,
          times: availableTimesForDay
        });
      }
    });

    return availableSlots;
  };

  const professionalAvailableSlots = getProfessionalAvailableSlots();
  const selectedProfessional = mockProfessionals.find(p => p.id === selectedProfessionalId);

  // Função para verificar profissionais disponíveis em determinada data/horário
  const getAvailableProfessionals = () => {
    if (!searchDate || !searchTime) return [];

    // Profissionais que já têm consulta naquele horário
    const busyProfessionals = mockAppointments
      .filter(apt => apt.date === searchDate && apt.time === searchTime)
      .map(apt => apt.professionalId);

    // Retornar profissionais que não estão ocupados
    return mockProfessionals.filter(prof => !busyProfessionals.includes(prof.id));
  };

  const availableProfessionals = getAvailableProfessionals();

  const handleSearchAvailability = () => {
    if (searchDate && searchTime) {
      setShowAvailability(true);
      setShowProfessionalAvailability(false);
    }
  };

  const clearFilters = () => {
    setSearchDate('');
    setSearchTime('');
    setShowAvailability(false);
  };

  const handleSearchProfessionalAvailability = () => {
    if (selectedProfessionalId) {
      setShowProfessionalAvailability(true);
      setShowAvailability(false);
    }
  };

  const clearProfessionalSearch = () => {
    setSelectedProfessionalId('');
    setShowProfessionalAvailability(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-600">Agendada</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-600">Confirmada</Badge>;
      case 'completed':
        return <Badge className="bg-gray-600">Realizada</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-600">Cancelada</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-600">Em Andamento</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Funções para abrir os diálogos
  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setViewDialogOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
    setEditProfessionalId(appointment.professionalId);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // Aqui você salvaria as alterações no banco de dados
    console.log('Salvando alterações:', {
      appointmentId: selectedAppointment?.id,
      newDate: editDate,
      newTime: editTime,
      newProfessionalId: editProfessionalId
    });
    setEditDialogOpen(false);
  };

  const getPatientInfo = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId);
  };

  const getProfessionalInfo = (professionalId: string) => {
    return mockProfessionals.find(p => p.id === professionalId);
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
                <h1 className="text-lg">Gestão de Consultas</h1>
                <p className="text-xs text-gray-500">Visualizar e gerenciar consultas</p>
              </div>
            </div>
            <Button onClick={onAddAppointment} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4" />
              Nova Consulta
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Mode Toggle */}
        <div className="mb-6 flex gap-2">
          <Button
            onClick={() => {
              setSearchMode('byDateTime');
              setShowProfessionalAvailability(false);
              clearProfessionalSearch();
            }}
            className={searchMode === 'byDateTime' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Buscar por Data/Horário
          </Button>
          <Button
            onClick={() => {
              setSearchMode('byProfessional');
              setShowAvailability(false);
              clearFilters();
            }}
            className={searchMode === 'byProfessional' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Buscar por Profissional
          </Button>
        </div>

        {/* Professional Search Section */}
        {searchMode === 'byProfessional' && (
          <Card className="bg-white border border-gray-200 shadow-sm mb-6">
            <div className="p-6">
              <h3 className="text-base mb-4">Verificar Disponibilidade de Profissional</h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="professionalSelect" className="text-sm mb-2 block">
                    Selecione o Profissional
                  </Label>
                  <Select
                    value={selectedProfessionalId}
                    onValueChange={(value) => setSelectedProfessionalId(value)}
                  >
                    <SelectTrigger id="professionalSelect" className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Escolha um profissional..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProfessionals.map(prof => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.name} - {prof.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Button 
                    onClick={handleSearchProfessionalAvailability}
                    disabled={!selectedProfessionalId}
                    className="gap-2 bg-cyan-600 hover:bg-cyan-700"
                  >
                    <Clock className="h-4 w-4" />
                    Ver Horários Disponíveis
                  </Button>
                  <Button 
                    onClick={clearProfessionalSearch}
                    variant="outline"
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por paciente, profissional ou tipo..." 
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchMode === 'byDateTime' && (
                <>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date" 
                      placeholder="Data" 
                      className="pl-10 bg-gray-50 border-gray-200"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Select
                      value={searchTime}
                      onValueChange={(value) => setSearchTime(value)}
                    >
                      <SelectTrigger className="pl-10 bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSearchAvailability} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                    <UserCheck className="h-4 w-4" />
                    Ver Disponibilidade
                  </Button>
                  <Button onClick={clearFilters} className="gap-2 bg-gray-600 hover:bg-gray-700">
                    Limpar Filtros
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total: <span className="text-gray-900">{filteredAppointments.length} consultas</span>
              </p>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm">
                              {new Date(appointment.date).toLocaleDateString('pt-BR', { 
                                day: '2-digit', 
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{appointment.patientName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{appointment.professionalName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{appointment.type}</p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewAppointment(appointment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditAppointment(appointment)}>
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

            {/* Available Professionals Section */}
            {showAvailability && (
              <Card className="mt-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base">Profissionais Disponíveis</h3>
                      <p className="text-xs text-gray-600">
                        {searchDate && new Date(searchDate).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'long',
                          year: 'numeric'
                        })} às {searchTime}
                      </p>
                    </div>
                  </div>

                  {availableProfessionals.length === 0 ? (
                    <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                      <p className="text-sm text-gray-600">
                        Nenhum profissional disponível neste horário.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tente selecionar outra data ou horário.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableProfessionals.map(professional => (
                        <div 
                          key={professional.id} 
                          className="p-4 bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <UserCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm mb-1">{professional.name}</p>
                              <p className="text-xs text-gray-600 mb-2">{professional.specialty}</p>
                              <Badge className="bg-emerald-600 text-xs">Disponível</Badge>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => {
                              // Aqui poderia abrir modal de agendamento com os dados pré-preenchidos
                              alert(`Agendar consulta com ${professional.name}`);
                            }}
                          >
                            Agendar Consulta
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Professional Availability Section */}
            {showProfessionalAvailability && (
              <Card className="mt-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base">Horários Disponíveis para {selectedProfessional?.name}</h3>
                      <p className="text-xs text-gray-600">
                        Próximos 14 dias úteis
                      </p>
                    </div>
                  </div>

                  {professionalAvailableSlots.length === 0 ? (
                    <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                      <p className="text-sm text-gray-600">
                        Nenhum horário disponível para {selectedProfessional?.name} nos próximos 14 dias úteis.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tente selecionar outro profissional.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {professionalAvailableSlots.map(slot => (
                        <div 
                          key={slot.date.toISOString()}
                          className="p-4 bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <UserCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm mb-1">
                                {slot.date.toLocaleDateString('pt-BR', { 
                                  day: '2-digit', 
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">Horários disponíveis:</p>
                              <div className="flex flex-wrap gap-2">
                                {slot.times.map(time => (
                                  <Badge key={time} className="bg-emerald-600 text-xs">{time}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => {
                              // Aqui poderia abrir modal de agendamento com os dados pré-preenchidos
                              alert(`Agendar consulta com ${selectedProfessional?.name}`);
                            }}
                          >
                            Agendar Consulta
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </Card>
      </main>

      {/* Dialog de Visualização */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-600" />
              Resumo da Consulta
            </DialogTitle>
            <DialogDescription>
              Detalhes completos da consulta selecionada.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              {/* Status */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(selectedAppointment.status)}
                </div>
              </div>

              {/* Grid com informações */}
              <div className="grid grid-cols-2 gap-4">
                {/* Data */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Data</p>
                      <p className="text-sm">
                        {new Date(selectedAppointment.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Horário */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Horário</p>
                      <p className="text-sm">{selectedAppointment.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paciente */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Paciente</p>
                    <p className="text-sm mb-2">{selectedAppointment.patientName}</p>
                    {getPatientInfo(selectedAppointment.patientId) && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">
                          CPF: {getPatientInfo(selectedAppointment.patientId)?.cpf}
                        </p>
                        {getPatientInfo(selectedAppointment.patientId)?.responsible && (
                          <p className="text-xs text-gray-500">
                            Responsável: {getPatientInfo(selectedAppointment.patientId)?.responsible}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profissional */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <UserCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Profissional</p>
                    <p className="text-sm mb-2">{selectedAppointment.professionalName}</p>
                    {getProfessionalInfo(selectedAppointment.professionalId) && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">
                          {getProfessionalInfo(selectedAppointment.professionalId)?.specialty}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getProfessionalInfo(selectedAppointment.professionalId)?.crm}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tipo de Consulta */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tipo de Consulta</p>
                    <p className="text-sm">{selectedAppointment.type}</p>
                  </div>
                </div>
              </div>

              {/* Observações se houver */}
              {selectedAppointment.notes && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Observações</p>
                  <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)} className="bg-gray-600 hover:bg-gray-700">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-cyan-600" />
              Editar Consulta
            </DialogTitle>
            <DialogDescription>
              Altere os detalhes da consulta selecionada.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              {/* Informações do Paciente (não editável) */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Paciente</p>
                <p className="text-sm">{selectedAppointment.patientName}</p>
              </div>

              {/* Tipo de Consulta (não editável) */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Tipo de Consulta</p>
                <p className="text-sm">{selectedAppointment.type}</p>
              </div>

              {/* Data (editável) */}
              <div>
                <Label htmlFor="editDate">Data *</Label>
                <Input
                  id="editDate"
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="mt-1 bg-white"
                />
              </div>

              {/* Horário (editável) */}
              <div>
                <Label htmlFor="editTime">Horário *</Label>
                <Select value={editTime} onValueChange={setEditTime}>
                  <SelectTrigger id="editTime" className="mt-1 bg-white">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Profissional (editável) */}
              <div>
                <Label htmlFor="editProfessional">Profissional *</Label>
                <Select value={editProfessionalId} onValueChange={setEditProfessionalId}>
                  <SelectTrigger id="editProfessional" className="mt-1 bg-white">
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfessionals.map(prof => (
                      <SelectItem key={prof.id} value={prof.id}>
                        {prof.name} - {prof.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Aviso */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  ⚠️ Certifique-se de verificar a disponibilidade do profissional na data e horário selecionados.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              onClick={() => setEditDialogOpen(false)} 
              variant="outline"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}