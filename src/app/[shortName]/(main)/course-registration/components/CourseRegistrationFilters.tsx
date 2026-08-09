"use client";

import { Select } from "@/src/components";
import type {
  SessionControlSession,
  SessionControlTerm,
} from "@/src/types";

interface CourseRegistrationFiltersProps {
  sessions: SessionControlSession[];
  terms: SessionControlTerm[];
  sessionId: string;
  semesterId: string;
  onSessionChange: (sessionId: string) => void;
  onSemesterChange: (semesterId: string) => void;
}

const CourseRegistrationFilters = ({
  sessions,
  terms,
  sessionId,
  semesterId,
  onSessionChange,
  onSemesterChange,
}: CourseRegistrationFiltersProps) => {
  const sessionOptions = sessions.map((session) => ({
    value: session._id,
    label: session.name,
  }));
  const semesterOptions = terms.map((term) => ({
    value: term._id,
    label: term.name,
  }));

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 md:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Academic period
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the session and semester whose registration you want to view.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Session"
          options={sessionOptions}
          value={sessionOptions.find((option) => option.value === sessionId)}
          onChange={(option) => onSessionChange(option?.value ?? sessionId)}
          placeholder="Select a session"
          isDisabled={sessionOptions.length === 0}
        />
        <Select
          label="Semester"
          options={semesterOptions}
          value={semesterOptions.find(
            (option) => option.value === semesterId,
          )}
          onChange={(option) =>
            onSemesterChange(option?.value ?? semesterId)
          }
          placeholder="Select a semester"
          isDisabled={semesterOptions.length === 0}
        />
      </div>
    </section>
  );
};

export default CourseRegistrationFilters;
