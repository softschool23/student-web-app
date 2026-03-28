"use client";

import React, { useState } from "react";
import { PageHeader, SearchInput, Select } from "@/src/components";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useAssignments } from "@/src/lib/queries/useAssignments";
import { useMe } from "@/src/lib/queries/useMe";
import { Download, FileText, Calendar, Clock, User } from "lucide-react";
import dayjs from "@/src/lib/dayjs";
import type { AssignmentItem } from "@/src/types";

const AssignmentCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
    <div className="flex items-start gap-3">
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
    <Skeleton className="h-10 w-44 rounded-lg" />
  </div>
);

const AssignmentsPage = () => {
  const [search, setSearch] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const { data: studentData } = useMe();
  const { data, isLoading, isSessionLoading, isError } = useAssignments({
    search: search || undefined,
    subjectId: subjectId || undefined,
  });

  const subjects = studentData?.subjects ?? [];
  const assignments = data?.assignments ?? [];
  const totalCount = data?.totalCount ?? 0;

  const subjectOptions = [
    { value: "", label: "All Subjects" },
    ...subjects.map((s) => ({ value: s._id, label: s.name })),
  ];

  const handleDownload = (assignment: AssignmentItem) => {
    if (assignment.fileUrl) {
      window.open(assignment.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isPageLoading = isLoading || isSessionLoading;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="View and download your assignments"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search assignments..."
          className="flex-1"
        />
        <div className="w-full sm:w-64">
          <Select
            options={subjectOptions}
            value={subjectOptions.find((o) => o.value === subjectId)}
            onChange={(opt) => setSubjectId(opt?.value ?? "")}
            placeholder="Filter by subject"
          />
        </div>
      </div>

      {/* Results count */}
      {!isPageLoading && !isError && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalCount} assignment{totalCount !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {isPageLoading ? (
          <>
            <AssignmentCardSkeleton />
            <AssignmentCardSkeleton />
            <AssignmentCardSkeleton />
          </>
        ) : isError ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
            <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Failed to load assignments
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Something went wrong. Please try refreshing the page.
            </p>
          </div>
        ) : assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {assignment.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                        {assignment.subject.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {assignment.session.name} &mdash; {assignment.term.name}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                  {assignment.description}
                </p>

                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>
                      Given: {dayjs(assignment.createdAt).format("MMM D, YYYY")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      Due: {dayjs(assignment.dueDate).format("MMM D, YYYY")}
                    </span>
                  </div>
                  {assignment.teacher.fullName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4 shrink-0" />
                      <span>{assignment.teacher.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDownload(assignment)}
                    disabled={!assignment.fileUrl}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    Download Assignment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
            <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No assignments found
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {search || subjectId
                ? "Try adjusting your filters."
                : "There are no assignments at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;
