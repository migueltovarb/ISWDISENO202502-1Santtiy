export interface User {
  id: string;
  email: string;
  role: 'ESTUDIANTE' | 'INSTRUCTOR' | 'ADMINISTRADOR';
  name: string;
  token: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  date: string;
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  image?: string;
  materials?: Material[];
}

export interface Material {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
  version: number;
}

export interface Enrollment {
  id: string;
  workshopId: string;
  studentId: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
  enrollmentDate: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
}

export interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  method: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  date: string;
  receipt?: string;
}

export interface Certificate {
  id: string;
  workshopId: string;
  studentId: string;
  issuedDate: string;
  downloadUrl: string;
  status: 'PENDING' | 'ISSUED';
}