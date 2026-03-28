"use client";

import React from "react";
import { PageHeader } from "@/src/components";
import { termAttendance } from "@/src/lib/dummyData";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const AttendancePage = () => {
  const {
    term,
    session,
    totalDays,
    daysPresent,
    daysAbsent,
    daysLate,
    daysExcused,
    attendancePercentage,
  } = termAttendance;

  const stats = [
    {
      label: "Days Present",
      value: daysPresent,
      icon: CheckCircle,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      label: "Days Absent",
      value: daysAbsent,
      icon: XCircle,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
      textColor: "text-red-700 dark:text-red-300",
    },
    {
      label: "Days Late",
      value: daysLate,
      icon: Clock,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      textColor: "text-yellow-700 dark:text-yellow-300",
    },
    {
      label: "Days Excused",
      value: daysExcused,
      icon: AlertCircle,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-700 dark:text-blue-300",
    },
  ];

  const getAttendanceGrade = (percentage: number) => {
    if (percentage >= 95)
      return {
        grade: "Excellent",
        color: "text-green-600 dark:text-green-400",
      };
    if (percentage >= 85)
      return { grade: "Very Good", color: "text-blue-600 dark:text-blue-400" };
    if (percentage >= 75)
      return { grade: "Good", color: "text-yellow-600 dark:text-yellow-400" };
    if (percentage >= 65)
      return { grade: "Fair", color: "text-orange-600 dark:text-orange-400" };
    return { grade: "Poor", color: "text-red-600 dark:text-red-400" };
  };

  const attendanceGrade = getAttendanceGrade(attendancePercentage);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Record"
        description={`${term} - ${session}`}
      />

      {/* Overview Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-primary-100 text-sm md:text-base mb-2">
              Overall Attendance
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              {attendancePercentage}%
            </h2>
            <p className={cn("text-lg font-semibold", "text-white")}>
              {attendanceGrade.grade}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <TrendingUp className="w-10 h-10 md:w-12 md:h-12" />
            <div>
              <p className="text-primary-100 text-sm">Days Present</p>
              <p className="text-2xl md:text-3xl font-bold">
                {daysPresent}/{totalDays}
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
              className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.iconColor)} />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p
                className={cn("text-3xl md:text-4xl font-bold", stat.textColor)}
              >
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Attendance Breakdown */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
            Attendance Breakdown
          </h3>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Present
                </span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {((daysPresent / totalDays) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 dark:bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${(daysPresent / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Absent
                </span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {((daysAbsent / totalDays) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-red-500 dark:bg-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${(daysAbsent / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Late
                </span>
                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  {((daysLate / totalDays) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-yellow-500 dark:bg-yellow-600 h-3 rounded-full transition-all"
                  style={{ width: `${(daysLate / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Excused
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {((daysExcused / totalDays) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-500 dark:bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${(daysExcused / totalDays) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Information */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
            Term Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Term
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {term}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Session
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {session}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total School Days
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalDays}
              </span>
            </div>

            <div className="p-3 md:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border-l-4 border-primary-500">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Attendance Grade
              </p>
              <p
                className={cn(
                  "text-xl md:text-2xl font-bold",
                  attendanceGrade.color
                )}
              >
                {attendanceGrade.grade}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-1">
                Based on {attendancePercentage}% attendance rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
