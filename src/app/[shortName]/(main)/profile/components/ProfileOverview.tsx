import {
  BookOpen,
  Building2,
  Layers3,
  Mail,
  Phone,
  School,
  UserRound,
} from "lucide-react";

import dayjs from "@/src/lib/dayjs";
import { getStudentIdentifier } from "@/src/lib/studentPortal";
import {
  StudentOrganisationType,
  type StudentProfile,
} from "@/src/types";

interface ProfileOverviewProps {
  student: StudentProfile;
}

interface ProfileDetailProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface AcademicEntity {
  name: string;
  shortCode?: string;
}

const formatAcademicEntity = ({
  name,
  shortCode,
}: AcademicEntity): string =>
  shortCode ? `${name} (${shortCode})` : name;

const ProfileDetail = ({ icon: Icon, label, value }: ProfileDetailProps) => (
  <div className="flex items-start gap-3 rounded-lg border border-border p-3">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const ProfileOverview = ({ student }: ProfileOverviewProps) => {
  const displayName = [student.firstName, student.middleName, student.lastName]
    .filter(Boolean)
    .join(" ");
  const initials = `${student.firstName[0] ?? ""}${student.lastName[0] ?? ""}`
    .toUpperCase()
    .slice(0, 2);
  const isCollegeStudent =
    student.org_type === StudentOrganisationType.College;
  const dateOfBirth = isCollegeStudent ? student.dateOfBirth : student.dob;
  const email = isCollegeStudent
    ? student.email
    : (student.parentOrGuardianInfo?.email ?? "Not provided");

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-500 bg-cover bg-center text-xl font-bold text-white"
          style={
            isCollegeStudent && student.photo
              ? {
                  backgroundImage: `url(${JSON.stringify(student.photo)})`,
                }
              : undefined
          }
          role={isCollegeStudent && student.photo ? "img" : undefined}
          aria-label={
            isCollegeStudent && student.photo
              ? `${displayName}'s profile picture`
              : undefined
          }
        >
          {(!isCollegeStudent || !student.photo) &&
            (initials || <UserRound className="h-8 w-8" />)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-bold capitalize text-foreground md:text-2xl">
              {displayName}
            </h2>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {isCollegeStudent ? "College" : "K–12"}
            </span>
          </div>
          <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
            {getStudentIdentifier(student)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ProfileDetail icon={Mail} label="Email" value={email} />
        <ProfileDetail
          icon={Phone}
          label="Phone number"
          value={isCollegeStudent ? student.phoneNumber : "Not provided"}
        />
        <ProfileDetail
          icon={UserRound}
          label={isCollegeStudent ? "Gender" : "Class"}
          value={
            isCollegeStudent
              ? student.gender
              : (student.class?.name ?? "Not assigned")
          }
        />
        <ProfileDetail
          icon={Building2}
          label="Date of birth"
          value={
            dateOfBirth && dayjs(dateOfBirth).isValid()
              ? dayjs(dateOfBirth).format("MMM D, YYYY")
              : "Not provided"
          }
        />
      </div>

      {isCollegeStudent && (
        <div className="mt-6 border-t border-border pt-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Academic information
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileDetail
              icon={School}
              label="Faculty"
              value={
                student.faculty
                  ? formatAcademicEntity(student.faculty)
                  : "Not assigned"
              }
            />
            <ProfileDetail
              icon={Building2}
              label="Department"
              value={
                student.department
                  ? formatAcademicEntity(student.department)
                  : "Not assigned"
              }
            />
            {student.program && (
              <ProfileDetail
                icon={BookOpen}
                label="Program"
                value={formatAcademicEntity(student.program)}
              />
            )}
            <ProfileDetail
              icon={Layers3}
              label="Current level"
              value={
                student.currentLevel
                  ? formatAcademicEntity(student.currentLevel)
                  : "Not assigned"
              }
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileOverview;
