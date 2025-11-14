"use client";

import React from "react";
import { PageHeader } from "@/src/components";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Award,
  User,
} from "lucide-react";
import {
  currentStudent,
  studentClass,
  subjects,
  termAttendance,
  assignments,
} from "@/src/lib/dummyData";
import { cn } from "@/src/lib/utils";

const Dashboard = () => {
  const pendingAssignments = assignments.filter(
    (a) => a.status === "pending"
  ).length;

  const stats = [
    {
      label: "Class",
      value: studentClass.name,
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Subjects",
      value: subjects.length.toString(),
      icon: BookOpen,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Attendance",
      value: `${termAttendance.attendancePercentage}%`,
      icon: Calendar,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Pending Assignments",
      value: pendingAssignments.toString(),
      icon: TrendingUp,
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your student portal"
      />

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome, {currentStudent.firstName}!
            </h2>
            <p className="text-primary-100 text-sm md:text-base">
              Student ID: {currentStudent.studentId}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <User className="w-8 h-8 md:w-10 md:h-10" />
            <div>
              <p className="text-xs md:text-sm text-primary-100">Class</p>
              <p className="font-semibold text-sm md:text-base">
                {studentClass.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
                <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.iconColor)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Class Teacher */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Class Teacher
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg md:text-xl font-bold">
              {studentClass.classTeacher.firstName[0]}
              {studentClass.classTeacher.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {studentClass.classTeacher.firstName}{" "}
                {studentClass.classTeacher.lastName}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {studentClass.classTeacher.email}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {studentClass.classTeacher.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Term Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Term
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {termAttendance.term}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Session
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {termAttendance.session}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Days Present
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {termAttendance.daysPresent} / {termAttendance.totalDays}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Assignments
        </h3>
        <div className="space-y-3">
          {assignments.slice(0, 3).map((assignment) => (
            <div
              key={assignment.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                  {assignment.title}
                </p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {assignment.courseName} ({assignment.courseCode})
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Due: {assignment.submissionDate.toLocaleDateString()}
                </span>
                <span
                  className={cn(
                    "px-2 md:px-3 py-1 rounded-full text-xs font-medium",
                    assignment.status === "pending" &&
                      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
                    assignment.status === "submitted" &&
                      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                    assignment.status === "overdue" &&
                      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  )}
                >
                  {assignment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
