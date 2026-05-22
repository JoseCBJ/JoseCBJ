import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  User, 
  FileText, 
  Activity, 
  Calendar,
  Pill,
  TrendingUp,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { mockPatients, mockMedicalRecords, mockPrescriptions, mockProgressReports } from '../lib/mockData';
import { useState } from 'react';

interface MedicalRecordViewProps {
  patientId: string;
  onBack: () => void;
}

export function MedicalRecordView({ patientId, onBack }: MedicalRecordViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');

  const patient = mockPatients.find(p => p.id === patientId);
  const records = mockMedicalRecords.filter(r => r.patientId === patientId);
  const prescriptions = mockPrescriptions.filter(p => p.patientId === patientId);
  const progressReports = mockProgressReports.filter(r => r.patientId === patientId);

  // Filtrar consultas baseado nos critérios de busca
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDoctor = filterDoctor === '' || 
      record.professionalName.toLowerCase().includes(filterDoctor.toLowerCase());
    
    const matchesDate = filterDate === '' || 
      new Date(record.date).toLocaleDateString('pt-BR').includes(filterDate);
    
    const matchesTime = filterTime === '' || 
      (record.time && record.time.includes(filterTime));

    return matchesSearch && matchesDoctor && matchesDate && matchesTime;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDoctor('');
    setFilterDate('');
    setFilterTime('');
  };

  const hasActiveFilters = searchTerm || filterDoctor || filterDate || filterTime;

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription className="mt-1">
                  {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} anos • 
                  CPF: {patient.cpf}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600">Ativo</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-600">Data de Nascimento</p>
              <p className="text-sm">{new Date(patient.dateOfBirth).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Responsável</p>
              <p className="text-sm">{patient.responsible}</p>
              <p className="text-xs text-gray-500">{patient.responsibleContact}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Diagnóstico (CID)</p>
              <p className="text-sm">{patient.cid} - {patient.cidDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records Tabs */}
      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consultations">Consultas</TabsTrigger>
          <TabsTrigger value="prescriptions">Receitas</TabsTrigger>
          <TabsTrigger value="progress">Evolução</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-4">
          {/* Search and Filters */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por médico, diagnóstico ou sintoma..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant={showAdvancedFilters ? "default" : "outline"}
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                  </Button>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Limpar
                    </Button>
                  )}
                </div>

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="filter-doctor" className="text-xs">
                          Nome do Médico
                        </Label>
                        <Input
                          id="filter-doctor"
                          placeholder="Ex: Dr. Carlos"
                          value={filterDoctor}
                          onChange={(e) => setFilterDoctor(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="filter-date" className="text-xs">
                          Data
                        </Label>
                        <Input
                          id="filter-date"
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="filter-time" className="text-xs">
                          Horário
                        </Label>
                        <Input
                          id="filter-time"
                          type="time"
                          value={filterTime}
                          onChange={(e) => setFilterTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Results Counter */}
                {hasActiveFilters && (
                  <div className="text-xs text-gray-600">
                    {filteredRecords.length} {filteredRecords.length === 1 ? 'consulta encontrada' : 'consultas encontradas'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">
                  {hasActiveFilters 
                    ? 'Nenhuma consulta encontrada com os filtros aplicados' 
                    : 'Nenhuma consulta registrada'}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Limpar filtros
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{record.professionalName}</CardTitle>
                      <CardDescription>
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(record.date).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm mb-1">Sintomas</h4>
                      <p className="text-sm text-gray-600">{record.symptoms}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm mb-1">Diagnóstico</h4>
                      <p className="text-sm text-gray-600">{record.diagnosis}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm mb-1">Tratamento Prescrito</h4>
                      <p className="text-sm text-gray-600">{record.treatment}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm mb-1">Observações</h4>
                      <p className="text-sm text-gray-600">{record.observations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-4">
          {prescriptions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12 text-gray-500">
                <Pill className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhuma receita emitida</p>
              </CardContent>
            </Card>
          ) : (
            prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{prescription.professionalName}</CardTitle>
                      <CardDescription>
                        Emitida em {new Date(prescription.date).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={prescription.status === 'active' ? 'default' : 'secondary'}
                      className={prescription.status === 'active' ? 'bg-green-600' : ''}
                    >
                      {prescription.status === 'active' ? 'Ativa' : 
                       prescription.status === 'expired' ? 'Expirada' : 'Renovada'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prescription.medications.map((med, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Pill className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{med.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Dosagem:</strong> {med.dosage}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Frequência:</strong> {med.frequency}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Duração:</strong> {med.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t text-xs text-gray-600">
                    Válida até {new Date(prescription.validUntil).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          {progressReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum relatório de evolução</p>
              </CardContent>
            </Card>
          ) : (
            progressReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.professionalName}</CardTitle>
                      <CardDescription>{report.period}</CardDescription>
                    </div>
                    <Badge 
                      className={
                        report.overallProgress === 'excellent' ? 'bg-green-600' :
                        report.overallProgress === 'good' ? 'bg-blue-600' :
                        report.overallProgress === 'regular' ? 'bg-yellow-600' :
                        'bg-orange-600'
                      }
                    >
                      {report.overallProgress === 'excellent' && 'Excelente'}
                      {report.overallProgress === 'good' && 'Boa Evolução'}
                      {report.overallProgress === 'regular' && 'Regular'}
                      {report.overallProgress === 'needs-attention' && 'Atenção'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Conquistas
                      </h4>
                      <ul className="space-y-2">
                        {report.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="text-sm mb-3 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-600" />
                        Desafios
                      </h4>
                      <ul className="space-y-2">
                        {report.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm mb-3">Próximos Passos</h4>
                    <ul className="space-y-2">
                      {report.nextSteps.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardContent className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Documentos e atestados aparecerão aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}