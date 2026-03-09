import { User } from "lucide-react";
import type { StudentProfile } from "@/src/types";

interface WelcomeCardProps {
  student: StudentProfile;
}

const WelcomeCard = ({ student }: WelcomeCardProps) => {
  const fullName = [student.firstName, student.middleName, student.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 capitalize">
            Welcome, {student.firstName}!
          </h2>
          <p className="text-primary-100 text-sm md:text-base">
            Student ID: {student.studentNumber}
          </p>
          {student.class && (
            <p className="text-primary-100 text-sm md:text-base mt-0.5 capitalize">
              {student.class.name}
              {student.section && ` · ${student.section.name}`}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 flex items-center justify-center">
            <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-primary-100">Full Name</p>
            <p className="font-semibold text-sm md:text-base capitalize">
              {fullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
