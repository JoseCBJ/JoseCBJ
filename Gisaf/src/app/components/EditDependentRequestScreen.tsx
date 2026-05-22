import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, AlertCircle, User } from 'lucide-react';
import { Patient } from '../types';
import { useState } from 'react';

interface EditDependentRequestScreenProps {
  patient: Patient;
  onBack: () => void;
  onSubmit: () => void;
}

export function EditDependentRequestScreen({ patient, onBack, onSubmit }: EditDependentRequestScreenProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  const fieldsToEdit = [
    { id: 'name', label: 'Nome Completo', currentValue: patient.name },
    { id: 'dateOfBirth', label: 'Data de Nascimento', currentValue: new Date(patient.dateOfBirth).toLocaleDateString('pt-BR') },
    { id: 'cpf', label: 'CPF', currentValue: patient.cpf },
    { id: 'phone', label: 'Telefone', currentValue: patient.phone },
    { id: 'address', label: 'Endereço', currentValue: patient.address },
    { id: 'responsible', label: 'Nome do Responsável', currentValue: patient.responsible },
    { id: 'responsibleContact', label: 'Contato do Responsável', currentValue: patient.responsibleContact },
  ];

  const toggleField = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const handleSubmit = () => {
    if (selectedFields.length > 0) {
      // Aqui seria enviado para o backend
      onSubmit();
    }
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
                <h1 className="text-lg">Solicitar Alteração de Dados</h1>
                <p className="text-xs text-gray-500">Formulário de solicitação de atualização</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          
          {/* Patient Info Banner */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-base mb-1">{patient.name}</h2>
                  <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">
                  <strong>Como funciona?</strong>
                </p>
                <p className="text-xs text-blue-700">
                  Selecione os campos que deseja alterar, preencha com os novos valores e descreva o motivo da alteração. 
                  A equipe administrativa da APAE irá revisar sua solicitação.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-sm mb-4 pb-2 border-b">Campos para Alteração</h3>
              
              <div className="space-y-6">
                {fieldsToEdit.map((field) => {
                  const isSelected = selectedFields.includes(field.id);
                  
                  return (
                    <div key={field.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`check-${field.id}`}
                          checked={isSelected}
                          onChange={() => toggleField(field.id)}
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`check-${field.id}`} className="text-sm cursor-pointer">
                          {field.label}
                        </label>
                      </div>
                      
                      {isSelected && (
                        <div className="ml-7 space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-xs text-gray-500">Valor Atual</Label>
                            <p className="text-sm mt-1">{field.currentValue}</p>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor={`new-${field.id}`} className="text-xs">
                              Novo Valor *
                            </Label>
                            <Input
                              id={`new-${field.id}`}
                              placeholder={`Digite o novo ${field.label.toLowerCase()}`}
                              className="bg-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedFields.length > 0 && (
                <>
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm mb-4">Justificativa da Solicitação</h3>
                    <div className="space-y-2">
                      <Label htmlFor="reason">
                        Descreva o motivo da alteração *
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Ex: Mudança de endereço, atualização de telefone, correção de dados cadastrais..."
                        className="min-h-32 bg-white"
                      />
                      <p className="text-xs text-gray-500">
                        Essa informação ajudará a equipe a processar sua solicitação mais rapidamente.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm mb-4">Documentação (Opcional)</h3>
                    <div className="space-y-2">
                      <Label htmlFor="documents" className="text-sm">
                        Anexar documentos comprobatórios
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                        <p className="text-sm text-gray-600">
                          Clique para selecionar arquivos ou arraste aqui
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG até 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={onBack}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
              disabled={selectedFields.length === 0}
            >
              <Send className="h-4 w-4" />
              Enviar Solicitação
            </Button>
          </div>

          {/* Info Footer */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>⏱️ Tempo de processamento:</strong> As solicitações são geralmente processadas em até 3 dias úteis. 
              Você será notificado por telefone quando a alteração for aprovada e concluída.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
