import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Pill, AlertCircle, Calendar, RefreshCw, Check } from 'lucide-react';
import { mockPrescriptions } from '../lib/mockData';
import { useState } from 'react';

interface PrescriptionsScreenProps {
  onBack: () => void;
  patientId: string;
}

export function PrescriptionsScreen({ onBack, patientId }: PrescriptionsScreenProps) {
  const [requestedRenewals, setRequestedRenewals] = useState<string[]>([]);

  const patientPrescriptions = mockPrescriptions.filter(
    presc => presc.patientId === patientId
  );

  const handleRequestRenewal = (prescriptionId: string) => {
    setRequestedRenewals([...requestedRenewals, prescriptionId]);
  };

  const isRenewalRequested = (prescriptionId: string) => {
    const prescription = patientPrescriptions.find(p => p.id === prescriptionId);
    return prescription?.renewalRequested || requestedRenewals.includes(prescriptionId);
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
              <h1 className="text-lg">Receitas e Prescrições</h1>
              <p className="text-xs text-gray-500">Visualizar e solicitar renovação de receitas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <Pill className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="text-sm mb-1">Gerencie suas receitas</h3>
                <p className="text-xs text-gray-600">
                  Você pode visualizar todas as suas prescrições ativas e solicitar renovação quando necessário. 
                  As solicitações serão analisadas pelo profissional de saúde.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {patientPrescriptions.length === 0 ? (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-12 text-center text-gray-500">
              <Pill className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Nenhuma prescrição encontrada</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {patientPrescriptions.map((prescription) => {
              const isExpiringSoon = prescription.status === 'expiring_soon';
              const renewalPending = isRenewalRequested(prescription.id);
              
              return (
                <Card key={prescription.id} className="bg-white border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-600">
                            Receita emitida em {new Date(prescription.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <p className="text-base mb-1">{prescription.professionalName}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {prescription.status === 'active' && !isExpiringSoon && (
                          <Badge className="bg-green-600">Ativa</Badge>
                        )}
                        {isExpiringSoon && (
                          <Badge className="bg-orange-600">Vence em breve</Badge>
                        )}
                        {prescription.status === 'expired' && (
                          <Badge variant="destructive">Vencida</Badge>
                        )}
                        {renewalPending && (
                          <Badge className="bg-blue-600">Renovação solicitada</Badge>
                        )}
                      </div>
                    </div>

                    {/* Medications */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm mb-3">Medicamentos Prescritos</h4>
                      <div className="space-y-3">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                            <p className="text-sm mb-1">{med.name}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>
                                <span className="text-gray-500">Dosagem:</span> {med.dosage}
                              </div>
                              <div>
                                <span className="text-gray-500">Frequência:</span> {med.frequency}
                              </div>
                              <div className="col-span-2">
                                <span className="text-gray-500">Duração:</span> {med.duration}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Validity and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Válida até {new Date(prescription.validUntil).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      {(isExpiringSoon || prescription.status === 'active') && !renewalPending && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRequestRenewal(prescription.id)}
                          className="gap-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Solicitar Renovação
                        </Button>
                      )}
                      
                      {renewalPending && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Check className="h-4 w-4" />
                          <span>Renovação solicitada</span>
                        </div>
                      )}
                    </div>

                    {/* Warning for expiring prescriptions */}
                    {isExpiringSoon && !renewalPending && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                        <p className="text-xs text-orange-800">
                          Esta receita vence em breve. Solicite a renovação para continuar o tratamento sem interrupções.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
