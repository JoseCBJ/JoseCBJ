import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Pill, Plus, Check, X, Calendar } from 'lucide-react';
import { mockPrescriptions } from '../lib/mockData';
import { useState } from 'react';

interface PrescriptionManagementScreenProps {
  onBack: () => void;
  onNewPrescription: () => void;
}

export function PrescriptionManagementScreen({ onBack, onNewPrescription }: PrescriptionManagementScreenProps) {
  const [approvedRenewals, setApprovedRenewals] = useState<string[]>([]);
  const [deniedRenewals, setDeniedRenewals] = useState<string[]>([]);

  const pendingRenewals = mockPrescriptions.filter(
    presc => presc.renewalRequested && 
    !approvedRenewals.includes(presc.id) && 
    !deniedRenewals.includes(presc.id)
  );

  const activePrescriptions = mockPrescriptions.filter(
    presc => presc.status === 'active' || presc.status === 'expiring_soon'
  );

  const handleApproveRenewal = (prescriptionId: string) => {
    setApprovedRenewals([...approvedRenewals, prescriptionId]);
  };

  const handleDenyRenewal = (prescriptionId: string) => {
    setDeniedRenewals([...deniedRenewals, prescriptionId]);
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
                <h1 className="text-lg">Gerenciar Prescrições</h1>
                <p className="text-xs text-gray-500">Receitas e solicitações de renovação</p>
              </div>
            </div>
            <Button onClick={onNewPrescription} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              Nova Receita
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="renewals" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="renewals" className="gap-2">
              <Pill className="h-4 w-4" />
              Renovações Pendentes
              {pendingRenewals.length > 0 && (
                <Badge className="ml-1 bg-orange-600">{pendingRenewals.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              <Calendar className="h-4 w-4" />
              Receitas Ativas
            </TabsTrigger>
          </TabsList>

          {/* Pending Renewals Tab */}
          <TabsContent value="renewals">
            {pendingRenewals.length === 0 ? (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-12 text-center text-gray-500">
                  <Pill className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Nenhuma solicitação de renovação pendente</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRenewals.map((prescription) => (
                  <Card key={prescription.id} className="bg-white border border-gray-200 shadow-sm">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge className="bg-orange-600 mb-2">Renovação Solicitada</Badge>
                          <h3 className="text-base mb-1">{prescription.patientName}</h3>
                          <p className="text-sm text-gray-600">
                            Solicitado em {new Date(prescription.renewalRequestedDate || '').toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      {/* Original Prescription Info */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm">Receita Original</h4>
                          <span className="text-xs text-gray-500">
                            Emitida em {new Date(prescription.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {prescription.medications.map((med, index) => (
                            <div key={index} className="text-sm">
                              <p className="mb-1">{med.name} - {med.dosage}</p>
                              <p className="text-xs text-gray-600">{med.frequency} por {med.duration}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t text-xs text-gray-600">
                          Válida até: {new Date(prescription.validUntil).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button 
                          onClick={() => handleApproveRenewal(prescription.id)}
                          className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Check className="h-4 w-4" />
                          Aprovar Renovação
                        </Button>
                        <Button 
                          onClick={() => handleDenyRenewal(prescription.id)}
                          variant="outline"
                          className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                          Recusar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Prescriptions Tab */}
          <TabsContent value="active">
            <div className="space-y-4">
              {activePrescriptions.map((prescription) => (
                <Card key={prescription.id} className="bg-white border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-base mb-1">{prescription.patientName}</h3>
                        <p className="text-sm text-gray-600">{prescription.professionalName}</p>
                      </div>
                      <Badge className={prescription.status === 'expiring_soon' ? 'bg-orange-600' : 'bg-green-600'}>
                        {prescription.status === 'expiring_soon' ? 'Vence em breve' : 'Ativa'}
                      </Badge>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="pb-2 border-b border-gray-200 last:border-0">
                            <p className="text-sm mb-1">{med.name}</p>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <span>{med.dosage}</span>
                              <span>{med.frequency}</span>
                              <span>{med.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Emitida em {new Date(prescription.date).toLocaleDateString('pt-BR')}</span>
                      <span>Válida até {new Date(prescription.validUntil).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
