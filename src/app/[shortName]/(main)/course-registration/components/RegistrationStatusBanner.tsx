import { CheckCircle2, Info, LockKeyhole } from "lucide-react";

interface RegistrationStatusBannerProps {
  enabled: boolean;
  canEdit: boolean;
  status?: string;
}

const RegistrationStatusBanner = ({
  enabled,
  canEdit,
  status,
}: RegistrationStatusBannerProps) => {
  if (!enabled) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Course registration is closed</p>
          <p className="mt-1 text-sm opacity-80">
            You can view the available courses, but selections cannot be changed
            right now.
          </p>
        </div>
      </div>
    );
  }

  if (!canEdit) {
    const statusLabel = status
      ? `${status.charAt(0).toUpperCase()}${status.slice(1)} registration`
      : "Registration is read-only";

    return (
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">{statusLabel}</p>
          <p className="mt-1 text-sm opacity-80">
            Your current selections are visible, but they cannot be edited.
          </p>
        </div>
      </div>
    );
  }

  if (status === "draft") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Draft registration</p>
          <p className="mt-1 text-sm opacity-80">
            Continue updating your course selection and save your changes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="text-sm font-semibold">Course registration is open</p>
        <p className="mt-1 text-sm opacity-80">
          Select your courses and save the selection as a draft.
        </p>
      </div>
    </div>
  );
};

export default RegistrationStatusBanner;
