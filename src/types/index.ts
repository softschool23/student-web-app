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
