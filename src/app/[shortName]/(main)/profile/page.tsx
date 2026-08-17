"use client";

import { useState } from "react";
import { AlertCircle, KeyRound, UserRound } from "lucide-react";

import { Button, PageHeader, Tabs, type Tab } from "@/src/components";
import { useMe } from "@/src/lib/queries/useMe";
import { StudentOrganisationType } from "@/src/types";
import ChangePasswordForm from "@/src/app/[shortName]/(main)/profile/components/ChangePasswordForm";
import PrintBiodataButton from "@/src/app/[shortName]/(main)/profile/components/PrintBiodataButton";
import ProfileForm from "@/src/app/[shortName]/(main)/profile/components/ProfileForm";
import ProfileOverview from "@/src/app/[shortName]/(main)/profile/components/ProfileOverview";

const collegeProfileTabs: Tab[] = [
  { id: "profile", label: "Profile details", icon: UserRound },
  { id: "password", label: "Password & security", icon: KeyRound },
];

const passwordTab: Tab[] = [
  { id: "password", label: "Password & security", icon: KeyRound },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: student, isLoading, isError, refetch } = useMe();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-16 rounded-lg bg-muted" />
        <div className="h-52 rounded-xl bg-muted" />
        <div className="h-96 rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <h1 className="mt-4 text-lg font-semibold text-foreground">
          Unable to load your profile
        </h1>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Your profile details could not be loaded. Please try again.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={() => void refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  const isCollegeStudent =
    student.org_type === StudentOrganisationType.College;
  const tabs = isCollegeStudent ? collegeProfileTabs : passwordTab;
  const selectedTab = isCollegeStudent ? activeTab : "password";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="My profile"
          description="Review your student information and manage account security."
        />
        {isCollegeStudent && <PrintBiodataButton student={student} />}
      </div>
      <ProfileOverview student={student} />
      <Tabs tabs={tabs} activeTab={selectedTab} onChange={setActiveTab} />

      {isCollegeStudent && selectedTab === "profile" && (
        <ProfileForm student={student} />
      )}

      {selectedTab === "password" && <ChangePasswordForm />}
    </div>
  );
};

export default ProfilePage;
