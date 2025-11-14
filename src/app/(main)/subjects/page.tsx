"use client";

import React from "react";
import { PageHeader } from "@/src/components";
import { subjects, studentClass } from "@/src/lib/dummyData";
import { BookOpen, Mail, Phone, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

const SubjectsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Subjects"
        description={`Subjects for ${studentClass.name}`}
      />

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Subject Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white truncate">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-primary-100">{subject.code}</p>
                </div>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="p-4 md:p-6">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                Subject Teacher
              </h4>

              <div className="space-y-3">
                {/* Teacher Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm md:text-base shrink-0">
                    {subject.teacher.firstName[0]}
                    {subject.teacher.lastName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {subject.teacher.firstName} {subject.teacher.lastName}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">{subject.teacher.email}</span>
                  </div>
                  {subject.teacher.phoneNumber && (
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>{subject.teacher.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              Total Subjects
            </p>
            <p className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300">
              {subjects.length}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">
              Class
            </p>
            <p className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">
              {studentClass.name}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">
              Level
            </p>
            <p className="text-lg md:text-xl font-bold text-purple-700 dark:text-purple-300">
              {studentClass.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
