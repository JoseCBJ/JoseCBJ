import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Search, Star, Calendar, User, Filter } from 'lucide-react';
import { mockEvaluations, mockProfessionals } from '../lib/mockData';
import { useState } from 'react';

interface FeedbackManagementScreenProps {
  onBack: () => void;
}

export function FeedbackManagementScreen({ onBack }: FeedbackManagementScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterProfessional, setFilterProfessional] = useState<string>('all');

  const filteredEvaluations = mockEvaluations.filter(evaluation => {
    const matchesSearch = 
      evaluation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.professionalName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = !filterRating || filterRating === 'all' || evaluation.rating === parseInt(filterRating);
    const matchesProfessional = !filterProfessional || filterProfessional === 'all' || evaluation.professionalId === filterProfessional;

    return matchesSearch && matchesRating && matchesProfessional;
  });

  const averageRating = filteredEvaluations.length > 0
    ? (filteredEvaluations.reduce((sum, e) => sum + e.rating, 0) / filteredEvaluations.length).toFixed(1)
    : '0';

  const ratingDistribution = {
    5: filteredEvaluations.filter(e => e.rating === 5).length,
    4: filteredEvaluations.filter(e => e.rating === 4).length,
    3: filteredEvaluations.filter(e => e.rating === 3).length,
    2: filteredEvaluations.filter(e => e.rating === 2).length,
    1: filteredEvaluations.filter(e => e.rating === 1).length,
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
              <h1 className="text-lg">Gestão de Feedbacks</h1>
              <p className="text-xs text-gray-500">Avaliações dos pacientes e responsáveis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total de Avaliações</p>
                <p className="text-4xl">{filteredEvaluations.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Média Geral</p>
                <div className="flex items-center gap-2">
                  <p className="text-4xl">{averageRating}</p>
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">5 Estrelas</p>
                <p className="text-4xl text-green-600">{ratingDistribution[5]}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Abaixo de 3</p>
                <p className="text-4xl text-orange-600">
                  {ratingDistribution[1] + ratingDistribution[2]}
                </p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por paciente ou profissional..." 
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por nota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as notas</SelectItem>
                  <SelectItem value="5">5 estrelas</SelectItem>
                  <SelectItem value="4">4 estrelas</SelectItem>
                  <SelectItem value="3">3 estrelas</SelectItem>
                  <SelectItem value="2">2 estrelas</SelectItem>
                  <SelectItem value="1">1 estrela</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterProfessional} onValueChange={setFilterProfessional}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Filtrar por profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os profissionais</SelectItem>
                  {mockProfessionals.map(prof => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Rating Distribution Chart */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <h3 className="text-base mb-4">Distribuição de Avaliações</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                const percentage = filteredEvaluations.length > 0 
                  ? (count / filteredEvaluations.length) * 100 
                  : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-24">
                      <span className="text-sm">{rating}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Evaluations List */}
        <div className="space-y-4">
          {filteredEvaluations.length === 0 ? (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <div className="p-12 text-center text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Nenhuma avaliação encontrada</p>
              </div>
            </Card>
          ) : (
            filteredEvaluations.map((evaluation) => (
              <Card key={evaluation.id} className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <p className="text-sm">{evaluation.patientName}</p>
                      </div>
                      <p className="text-base mb-1">{evaluation.professionalName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(evaluation.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-4 w-4 ${
                              star <= evaluation.rating
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary">
                        {evaluation.category === 'professional' ? 'Profissional' :
                         evaluation.category === 'service' ? 'Serviço' :
                         'Instalações'}
                      </Badge>
                    </div>
                  </div>

                  {evaluation.comment && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{evaluation.comment}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
