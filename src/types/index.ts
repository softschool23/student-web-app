export interface SchoolBasicInfo {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
  products: string[];
  plan: Record<string, unknown>;
}

export interface HolidayItem {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  studentId: string;
  password: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
  refreshTokenExpiry: string;
  organisationId: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface StudentClass {
  _id: string;
  name: string;
  sectionId: string;
  categoryId: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentSection {
  _id: string;
  name: string;
  assessmentStructureId: string;
  gradingScaleId: string;
  attendanceConfigId: string;
  reportConfigId: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnrollmentTerm {
  _id: string;
  name: string;
  organisationId: string;
  startDate: string;
  endDate: string;
  holidays: string[];
  nextTermBegins: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentSubjectItem {
  _id: string;
  name: string;
  code?: string;
  isCompulsory: boolean;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  enrollmentTermId: string;
  enrollmentClassId: string;
  enrollmentSectionId: string;
  currentClassId: string;
  currentSectionId: string;
  medicalInfo: string;
  organisationId: string;
  studentNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  class?: StudentClass;
  section?: StudentSection;
  enrollmentTerm?: EnrollmentTerm;
  subjects?: StudentSubjectItem[];
}

export interface SessionControlSession {
  _id: string;
  name: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionControlTerm {
  _id: string;
  name: string;
  organisationId: string;
  startDate: string;
  endDate: string;
  holidays: string[];
  nextTermBegins: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionControl {
  _id: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
  currentSession: SessionControlSession;
  currentTerm: SessionControlTerm;
}

export interface SubjectTeacher {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export interface SubjectItem {
  id: string;
  name: string;
  code?: string;
  isCompulsory: boolean;
  teacher: SubjectTeacher | null;
}

export interface SubjectsResponse {
  student: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    studentNumber: string;
  };
  class: {
    id: string;
    name: string;
  };
  section: {
    id: string;
    name: string;
  };
  subjects: SubjectItem[];
  totalSubjects: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  classId: string;
  profileImage?: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  section?: string;
  classTeacher: Teacher;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: Teacher;
  classId: string;
}

export interface Holiday {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseName: string;
  courseCode: string;
  description: string;
  dateGiven: Date;
  submissionDate: Date;
  teacherId: string;
  fileUrl?: string;
  status: "pending" | "submitted" | "overdue";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
}

export interface TermAttendance {
  term: string;
  session: string;
  totalDays: number;
  daysPresent: number;
  daysAbsent: number;
  daysLate: number;
  daysExcused: number;
  attendancePercentage: number;
  records: AttendanceRecord[];
}

export interface SubjectResult {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  firstCA: number;
  secondCA: number;
  exam: number;
  total: number;
  grade: string;
  remarks: string;
  teacherComment?: string;
}

export interface TermResult {
  id: string;
  studentId: string;
  term: "First Term" | "Second Term" | "Third Term";
  session: string; // e.g., "2023/2024"
  className: string;
  subjects: SubjectResult[];
  totalScore: number;
  averageScore: number;
  position: number;
  totalStudents: number;
  classTeacherComment?: string;
  principalComment?: string;
  nextTermBegins?: Date;
}

// ─── Result Preview (API) ─────────────────────────────────────────────────────

export interface ResultSubject {
  subjectId: string;
  subjectName: string;
  subjectCode?: string;
  firstCA: number;
  secondCA: number;
  exam: number;
  total: number;
  grade: string;
  remarks: string;
}

export interface ResultPreview {
  hasResult: boolean;
  termId: string;
  sessionId: string;
  student: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    studentNumber: string;
  };
  class: {
    id: string;
    name: string;
  };
  section: {
    id: string;
    name: string;
  };
  summary: {
    totalScore: number;
    averageScore: number;
    position: number;
    totalStudents: number;
    subjectsCount: number;
  };
  subjects: ResultSubject[];
  comments: {
    classTeacherComment: string | null;
    principalComment: string | null;
  };
  nextTermBegins: string | null;
}

export interface ResultDownloadResponse {
  success: boolean;
  pdfJobId: string;
  message: string;
  termId: string;
  sessionId: string;
}

export interface PdfJobStatus {
  jobId: string;
  status: "waiting" | "active" | "completed" | "failed";
  progress: number;
  createdAt: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  processingStatus?: string;
  uploadStatus?: string;
  fileUrl?: string;
}

export interface InvoiceItem {
  code: string;
  title: string;
  amount: number;
}

export interface InvoiceSession {
  _id: string;
  name: string;
}

export interface InvoiceTerm {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  nextTermBegins: string;
}

export interface InvoiceStudentRef {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  currentClassId: string;
  currentSectionId: string;
  studentNumber: string;
  status: string;
}

export type InvoiceStatus = "PAID" | "UNPAID" | "PARTIALLY_PAID";

export interface Invoice {
  _id: string;
  organisationId: string;
  studentId: InvoiceStudentRef;
  sessionId: InvoiceSession;
  termId: InvoiceTerm;
  items: InvoiceItem[];
  totalAmount: number;
  minimumPartialPercentage: number;
  minimumPartialAmount: number;
  amountPaid: number;
  status: InvoiceStatus;
  active: boolean;
  transactionChargeBearer: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  outstandingAmount: number;
}

export interface InvoiceSummary {
  totalAmount: number;
  totalPaid: number;
  totalOutstanding: number;
}

export interface InvoicesResponse {
  student: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    studentNumber: string;
  };
  filters: {
    sessionId: string | null;
    termId: string | null;
    status: string | null;
    classId: string | null;
  };
  invoices: Invoice[];
  totalInvoices: number;
  summary: InvoiceSummary;
}

export interface PaymentLinkResponse {
  reference: string;
  authorizationUrl: string;
  accessCode: string;
  amount: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}
