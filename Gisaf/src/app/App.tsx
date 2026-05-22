import { useState } from 'react';
import { NewProfessionalDashboard } from './components/NewProfessionalDashboard';
import { NewApaeDashboard } from './components/NewApaeDashboard';
import { NewPatientDashboard } from './components/NewPatientDashboard';
import { MedicalRecordView } from './components/MedicalRecordView';
import { ManagePatientsScreen } from './components/ManagePatientsScreen';
import { AddPatientScreen } from './components/AddPatientScreen';
import { ManageProfessionalsScreen } from './components/ManageProfessionalsScreen';
import { AddProfessionalScreen } from './components/AddProfessionalScreen';
import { ManageAppointmentsScreen } from './components/ManageAppointmentsScreen';
import { NewAppointmentScreen } from './components/NewAppointmentScreen';
import { CreateAppointmentScreen } from './components/CreateAppointmentScreen';
import { ScheduleManagementScreen } from './components/ScheduleManagementScreen';
import { MonthlyScheduleScreen } from './components/MonthlyScheduleScreen';
import { EvaluateAppointmentsScreen } from './components/EvaluateAppointmentsScreen';
import { PrescriptionsScreen } from './components/PrescriptionsScreen';
import { PrescriptionManagementScreen } from './components/PrescriptionManagementScreen';
import { NewPrescriptionScreen } from './components/NewPrescriptionScreen';
import { PatientDailyActivitiesScreen } from './components/PatientDailyActivitiesScreen';
import { PatientActivitiesManagementScreen } from './components/PatientActivitiesManagementScreen';
import { FeedbackManagementScreen } from './components/FeedbackManagementScreen';
import { MedicalRecordFormScreen } from './components/MedicalRecordFormScreen';
import { ManageDependentsScreen } from './components/ManageDependentsScreen';
import { ViewDependentDetailsScreen } from './components/ViewDependentDetailsScreen';
import { EditDependentRequestScreen } from './components/EditDependentRequestScreen';
import { ViewPatientDetailsScreen } from './components/ViewPatientDetailsScreen';
import { ViewProfessionalDetailsScreen } from './components/ViewProfessionalDetailsScreen';
import { EditProfessionalScreen } from './components/EditProfessionalScreen';
import { ManageProfessionalScheduleScreen } from './components/ManageProfessionalScheduleScreen';
import { CreateScheduleScreen } from './components/CreateScheduleScreen';
import { DailyScheduleScreen } from './components/DailyScheduleScreen';
import { Patient } from './types';
import { Stethoscope, Users, Heart, Building2 } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type ViewType = 
  | 'dashboard' 
  | 'patient-record'
  | 'manage-patients'
  | 'add-patient'
  | 'view-patient-details'
  | 'edit-patient'
  | 'manage-professionals'
  | 'add-professional'
  | 'view-professional-details'
  | 'edit-professional'
  | 'new-appointment'
  | 'create-appointment'
  | 'manage-appointments'
  | 'schedule-management'
  | 'monthly-schedule'
  | 'evaluate-appointments'
  | 'prescriptions'
  | 'manage-prescriptions'
  | 'new-prescription'
  | 'patient-daily-activities'
  | 'patient-activities-management'
  | 'feedback-management'
  | 'medical-record-form'
  | 'manage-dependents'
  | 'view-dependent-details'
  | 'edit-dependent-request'
  | 'manage-professional-schedule'
  | 'schedule-management-admin'
  | 'create-schedule'
  | 'daily-schedule';

type UserRole = 'professional' | 'apae' | 'patient';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>('');
  const [selectedDependent, setSelectedDependent] = useState<Patient | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [addPatientReturnView, setAddPatientReturnView] = useState<ViewType>('dashboard');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentView('patient-record');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPatientId('');
    setSelectedDate('');
    setSelectedAppointmentId('');
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleViewDailyActivities = (patientId: string, date: string) => {
    setSelectedPatientId(patientId);
    setSelectedDate(date);
    setCurrentView('patient-daily-activities');
  };

  const handleOpenDailyScheduleWithPatient = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCurrentView('daily-schedule');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        if (userRole === 'professional') {
          return (
            <NewProfessionalDashboard 
              onViewPatient={handleViewPatient}
              onNewAppointment={() => setCurrentView('new-appointment')}
              onViewMonthlySchedule={() => setCurrentView('monthly-schedule')}
              onManagePrescriptions={() => setCurrentView('manage-prescriptions')}
              onViewDailyActivities={handleViewDailyActivities}
              onManageMySchedule={() => setCurrentView('manage-professional-schedule')}
              onStartDailySchedule={() => setCurrentView('daily-schedule')}
              onOpenDailyScheduleWithPatient={handleOpenDailyScheduleWithPatient}
            />
          );
          }
        if (userRole === 'apae') {
          return (
            <NewApaeDashboard
              onManagePatients={() => setCurrentView('manage-patients')}
              onManageProfessionals={() => setCurrentView('manage-professionals')}
              onManageSchedule={() => setCurrentView('schedule-management')}
              onAddPatient={() => {
                setAddPatientReturnView('dashboard');
                setCurrentView('add-patient');
              }}
              onAddProfessional={() => setCurrentView('add-professional')}
              onViewActivities={() => setCurrentView('patient-activities-management')}
              onViewFeedbacks={() => setCurrentView('feedback-management')}
              onNewMedicalRecordForm={() => setCurrentView('medical-record-form')}
              onCreateAppointment={() => setCurrentView('create-appointment')}
              onManageAppointments={() => setCurrentView('manage-appointments')}
              onScheduleManagement={() => setCurrentView('schedule-management-admin')}
              onCreateSchedule={() => setCurrentView('create-schedule')}
            />
          );
        }
        if (userRole === 'patient') {
          return (
            <NewPatientDashboard
              patientId="1"
              onViewHistory={() => handleViewPatient('1')}
              onEvaluateAppointments={() => setCurrentView('evaluate-appointments')}
              onViewPrescriptions={() => setCurrentView('prescriptions')}
              onManageDependents={() => setCurrentView('manage-dependents')}
            />
          );
        }
        return null;

      case 'patient-record':
        return (
          <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <MedicalRecordView
                patientId={selectedPatientId}
                onBack={handleBackToDashboard}
              />
            </div>
          </div>
        );

      case 'manage-patients':
        return (
          <ManagePatientsScreen
            onBack={handleBackToDashboard}
            onAddPatient={() => {
              setAddPatientReturnView('manage-patients');
              setCurrentView('add-patient');
            }}
            onViewPatient={(patientId) => {
              setSelectedPatientId(patientId);
              setCurrentView('view-patient-details');
            }}
            onEditPatient={(patientId) => {
              setSelectedPatientId(patientId);
              setCurrentView('edit-patient');
            }}
          />
        );

      case 'add-patient':
        return (
          <AddPatientScreen
            onBack={() => setCurrentView(addPatientReturnView)}
            onSave={() => setCurrentView(addPatientReturnView === 'dashboard' ? 'dashboard' : 'manage-patients')}
          />
        );

      case 'view-patient-details':
        return (
          <ViewPatientDetailsScreen
            patientId={selectedPatientId}
            onBack={() => setCurrentView('manage-patients')}
            onEdit={() => setCurrentView('edit-patient')}
          />
        );

      case 'edit-patient':
        return (
          <AddPatientScreen
            patientId={selectedPatientId}
            onBack={() => setCurrentView('view-patient-details')}
            onSave={() => {
              // Mostrar mensagem de sucesso
              alert('Paciente atualizado com sucesso!');
              setCurrentView('manage-patients');
            }}
          />
        );

      case 'manage-professionals':
        return (
          <ManageProfessionalsScreen
            onBack={handleBackToDashboard}
            onAddProfessional={() => setCurrentView('add-professional')}
            onViewProfessional={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('view-professional-details');
            }}
            onEditProfessional={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('edit-professional');
            }}
          />
        );

      case 'add-professional':
        return (
          <AddProfessionalScreen
            onBack={() => setCurrentView('manage-professionals')}
            onSave={() => setCurrentView('manage-professionals')}
          />
        );

      case 'view-professional-details':
        return (
          <ViewProfessionalDetailsScreen
            professionalId={selectedProfessionalId}
            onBack={() => setCurrentView('manage-professionals')}
            onEdit={() => setCurrentView('edit-professional')}
          />
        );

      case 'edit-professional':
        return (
          <EditProfessionalScreen
            professionalId={selectedProfessionalId}
            onBack={() => setCurrentView('view-professional-details')}
            onSubmit={() => {
              // Mostrar mensagem de sucesso
              alert('Profissional atualizado com sucesso!');
              setCurrentView('manage-professionals');
            }}
          />
        );

      case 'manage-appointments':
        return (
          <ManageAppointmentsScreen
            onBack={handleBackToDashboard}
            onAddAppointment={() => setCurrentView('create-appointment')}
          />
        );

      case 'new-appointment':
        return (
          <NewAppointmentScreen
            onBack={handleBackToDashboard}
            onSave={handleBackToDashboard}
          />
        );

      case 'create-appointment':
        return (
          <CreateAppointmentScreen
            onBack={handleBackToDashboard}
            onSave={handleBackToDashboard}
          />
        );

      case 'schedule-management':
        return (
          <ScheduleManagementScreen
            onBack={handleBackToDashboard}
            onEditSchedule={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('manage-professional-schedule');
            }}
            onViewDetails={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('view-professional-details');
            }}
          />
        );

      case 'monthly-schedule':
        return (
          <MonthlyScheduleScreen onBack={handleBackToDashboard} />
        );

      case 'evaluate-appointments':
        return (
          <EvaluateAppointmentsScreen 
            onBack={handleBackToDashboard}
            patientId="1"
          />
        );

      case 'prescriptions':
        return (
          <PrescriptionsScreen
            onBack={handleBackToDashboard}
            patientId="1"
          />
        );

      case 'manage-prescriptions':
        return (
          <PrescriptionManagementScreen
            onBack={handleBackToDashboard}
            onNewPrescription={() => setCurrentView('new-prescription')}
          />
        );

      case 'new-prescription':
        return (
          <NewPrescriptionScreen
            onBack={() => setCurrentView('manage-prescriptions')}
            onSave={() => setCurrentView('manage-prescriptions')}
          />
        );

      case 'patient-daily-activities':
        return (
          <PatientDailyActivitiesScreen
            onBack={handleBackToDashboard}
            patientId={selectedPatientId}
            date={selectedDate}
          />
        );

      case 'patient-activities-management':
        return (
          <PatientActivitiesManagementScreen
            onBack={handleBackToDashboard}
          />
        );

      case 'feedback-management':
        return (
          <FeedbackManagementScreen onBack={handleBackToDashboard} />
        );

      case 'medical-record-form':
        return (
          <MedicalRecordFormScreen 
            onBack={handleBackToDashboard}
            onSave={handleBackToDashboard}
          />
        );

      case 'manage-dependents':
        return (
          <ManageDependentsScreen
            onBack={handleBackToDashboard}
            responsibleName="Maria Santos"
            onViewDependent={(dependent: Patient) => {
              setSelectedDependent(dependent);
              setCurrentView('view-dependent-details');
            }}
            onEditDependent={(dependent: Patient) => {
              setSelectedDependent(dependent);
              setCurrentView('edit-dependent-request');
            }}
          />
        );

      case 'view-dependent-details':
        if (!selectedDependent) return null;
        return (
          <ViewDependentDetailsScreen
            patient={selectedDependent}
            onBack={() => setCurrentView('manage-dependents')}
            onEdit={() => setCurrentView('edit-dependent-request')}
          />
        );

      case 'edit-dependent-request':
        if (!selectedDependent) return null;
        return (
          <EditDependentRequestScreen
            patient={selectedDependent}
            onBack={() => setCurrentView('view-dependent-details')}
            onSubmit={() => {
              // Mostrar mensagem de sucesso
              alert('Solicitação enviada com sucesso! A equipe administrativa irá revisar sua solicitação.');
              setCurrentView('manage-dependents');
            }}
          />
        );

      case 'manage-professional-schedule':
        return (
          <ManageProfessionalScheduleScreen
            onBack={handleBackToDashboard}
            onSave={() => {
              alert('Configurações de agenda salvas com sucesso!');
              handleBackToDashboard();
            }}
          />
        );

      case 'schedule-management-admin':
        return (
          <ScheduleManagementScreen
            onBack={handleBackToDashboard}
            onEditSchedule={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('manage-professional-schedule');
            }}
            onViewDetails={(professionalId) => {
              setSelectedProfessionalId(professionalId);
              setCurrentView('view-professional-details');
            }}
          />
        );

      case 'create-schedule':
        return (
          <CreateScheduleScreen
            onBack={handleBackToDashboard}
            onSave={() => {
              alert('Agenda criada com sucesso!');
              handleBackToDashboard();
            }}
          />
        );

      case 'daily-schedule':
        return (
          <DailyScheduleScreen
            onBack={handleBackToDashboard}
            onStartAppointment={(appointmentId) => {
              // Aqui você pode passar o ID do agendamento para a tela de novo atendimento se necessário
              handleOpenDailyScheduleWithPatient(appointmentId);
            }}
            initialAppointmentId={selectedAppointmentId}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role Selector Bar - Only show on dashboard */}
      {currentView === 'dashboard' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              <button
                onClick={() => handleRoleChange('apae')}
                className={`px-6 py-4 text-sm transition-colors border-b-2 ${
                  userRole === 'apae'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Administrativo</span>
                </div>
              </button>
              <button
                onClick={() => handleRoleChange('professional')}
                className={`px-6 py-4 text-sm transition-colors border-b-2 ${
                  userRole === 'professional'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>Profissional</span>
                </div>
              </button>
              <button
                onClick={() => handleRoleChange('patient')}
                className={`px-6 py-4 text-sm transition-colors border-b-2 ${
                  userRole === 'patient'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>Paciente</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderView()}
      <Toaster />
    </div>
  );
}