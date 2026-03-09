"use client";

import React, { useState } from "react";
import { PageHeader, Tabs, Tab } from "@/src/components";
import { assignments } from "@/src/lib/dummyData";
import {
  Download,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Assignment } from "@/src/types";

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter assignments based on status
  const getFilteredAssignments = () => {
    if (activeTab === "pending") {
      return assignments.filter((a) => a.status === "pending");
    } else if (activeTab === "submitted") {
      return assignments.filter((a) => a.status === "submitted");
    } else if (activeTab === "overdue") {
      return assignments.filter((a) => a.status === "overdue");
    }
    return assignments;
  };

  const filteredAssignments = getFilteredAssignments();

  const tabs: Tab[] = [
    {
      id: "all",
      label: "All Assignments",
      badge: assignments.length,
    },
    {
      id: "pending",
      label: "Pending",
      badge: assignments.filter((a) => a.status === "pending").length,
    },
    {
      id: "submitted",
      label: "Submitted",
      badge: assignments.filter((a) => a.status === "submitted").length,
    },
    {
      id: "overdue",
      label: "Overdue",
      badge: assignments.filter((a) => a.status === "overdue").length,
    },
  ];

  const handleDownload = (assignment: Assignment) => {
    // Simulate download - in real app, this would download the actual file
    const blob = new Blob(
      [
        `Assignment: ${assignment.title}\n\nCourse: ${assignment.courseName} (${
          assignment.courseCode
        })\n\nDescription:\n${
          assignment.description
        }\n\nDate Given: ${assignment.dateGiven.toLocaleDateString()}\nSubmission Date: ${assignment.submissionDate.toLocaleDateString()}\n\nStatus: ${assignment.status.toUpperCase()}`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assignment.courseCode}_${assignment.title.replace(
      /\s+/g,
      "_"
    )}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "submitted":
        return (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        );
      case "overdue":
        return (
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        );
      default:
        return (
          <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        );
    }
  };

  const getStatusBadgeColor = (status: Assignment["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "overdue":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="View and download your assignments"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {assignments.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">
            Pending
          </p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-700 dark:text-yellow-300">
            {assignments.filter((a) => a.status === "pending").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">
            Submitted
          </p>
          <p className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-300">
            {assignments.filter((a) => a.status === "submitted").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-red-600 dark:text-red-400 mb-1">Overdue</p>
          <p className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-300">
            {assignments.filter((a) => a.status === "overdue").length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg shrink-0">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {assignment.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                          {assignment.courseName} ({assignment.courseCode})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusIcon(assignment.status)}
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs md:text-sm font-medium",
                        getStatusBadgeColor(assignment.status)
                      )}
                    >
                      {assignment.status.charAt(0).toUpperCase() +
                        assignment.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                  {assignment.description}
                </p>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Given:{" "}
                      {assignment.dateGiven.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      Due:{" "}
                      {assignment.submissionDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDownload(assignment)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
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
              There are no {activeTab !== "all" ? activeTab : ""} assignments at
              the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;
