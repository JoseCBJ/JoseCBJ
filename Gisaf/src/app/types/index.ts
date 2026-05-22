// Types for APAE Health System

export interface PatientCID {
  code: string;
  description: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  cpf: string;
  responsible?: string;
  responsibleContact?: string;
  cid?: string; // Mantido para compatibilidade
  cidDescription?: string; // Mantido para compatibilidade
  cids?: PatientCID[]; // Novo campo para múltiplos CIDs
  photo?: string;
  address?: string;
  phone?: string;
}

export interface HealthProfessional {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  photo?: string;
  email?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  observations: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
    height?: number;
  };
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  date: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  validUntil: string;
  status: 'active' | 'expired' | 'renewed' | 'expiring_soon';
  renewalRequested?: boolean;
  renewalRequestedDate?: string;
  observations?: string;
}

export interface Document {
  id: string;
  type: 'prescription' | 'certificate' | 'report';
  patientId: string;
  professionalId: string;
  date: string;
  title: string;
  content: string;
}

export interface Evaluation {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  rating: number;
  comment: string;
  category: 'service' | 'professional' | 'facility';
}

export interface ProgressReport {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  period: string;
  achievements: string[];
  challenges: string[];
  nextSteps: string[];
  overallProgress: 'excellent' | 'good' | 'regular' | 'needs-attention';
}