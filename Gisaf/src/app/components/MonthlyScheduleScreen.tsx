import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { mockAppointments } from '../lib/mockData';
import { useState } from 'react';

interface MonthlyScheduleScreenProps {
  onBack: () => void;
}

export function MonthlyScheduleScreen({ onBack }: MonthlyScheduleScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(10); // November (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Generate mock appointments for the entire month
  const generateMonthAppointments = () => {
    const appointments = [...mockAppointments];
    // Add more mock data for other days
    const extraAppointments = [
      { ...mockAppointments[0], id: '10', date: '2025-11-05', time: '10:00' },
      { ...mockAppointments[1], id: '11', date: '2025-11-05', time: '14:00' },
      { ...mockAppointments[2], id: '12', date: '2025-11-08', time: '09:00' },
      { ...mockAppointments[3], id: '13', date: '2025-11-10', time: '11:00' },
      { ...mockAppointments[0], id: '14', date: '2025-11-12', time: '15:00' },
      { ...mockAppointments[1], id: '15', date: '2025-11-15', time: '09:30' },
      { ...mockAppointments[2], id: '16', date: '2025-11-18', time: '13:00' },
      { ...mockAppointments[3], id: '17', date: '2025-11-20', time: '10:30' },
      { ...mockAppointments[0], id: '18', date: '2025-11-22', time: '14:30' },
      { ...mockAppointments[1], id: '19', date: '2025-11-25', time: '11:00' },
    ];
    return [...appointments, ...extraAppointments];
  };

  const allAppointments = generateMonthAppointments();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allAppointments.filter(apt => apt.date === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

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
                <h1 className="text-lg">Agenda Mensal</h1>
                <p className="text-xs text-gray-500">Visualização completa do mês</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-4">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center text-xs text-gray-600">
                  {day}
                </div>
              ))}
              
              {/* Empty days */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="p-2 min-h-[100px] bg-gray-50" />
              ))}
              
              {/* Days with appointments */}
              {days.map((day) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = day === 1 && currentMonth === 10; // Mock today as Nov 1
                
                return (
                  <div
                    key={day}
                    className={`p-2 min-h-[100px] border rounded-lg ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 3).map((apt) => (
                        <div
                          key={apt.id}
                          className="text-xs p-1 bg-emerald-100 text-emerald-700 rounded cursor-pointer hover:bg-emerald-200 transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{apt.time}</span>
                          </div>
                          <div className="truncate">{apt.patientName.split(' ')[0]}</div>
                        </div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{dayAppointments.length - 3} mais
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 pt-6 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded" />
                <span className="text-xs text-gray-600">Hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-100 rounded" />
                <span className="text-xs text-gray-600">Com consultas</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Total de Consultas</p>
            <p className="text-2xl">{allAppointments.length}</p>
          </Card>
          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Concluídas</p>
            <p className="text-2xl text-green-600">
              {allAppointments.filter(a => a.status === 'completed').length}
            </p>
          </Card>
          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Agendadas</p>
            <p className="text-2xl text-blue-600">
              {allAppointments.filter(a => a.status === 'scheduled').length}
            </p>
          </Card>
          <Card className="p-4 bg-white border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Taxa de Ocupação</p>
            <p className="text-2xl">78%</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
