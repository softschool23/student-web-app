"use client";

import React, { useState } from "react";
import { PageHeader, Select } from "@/src/components";
import { termResults, currentStudent, studentClass } from "@/src/lib/dummyData";
import { Download, Award, TrendingUp, BookOpen, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { TermResult } from "@/src/types";

const ResultsPage = () => {
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");

  // Get unique terms and sessions
  const terms = Array.from(new Set(termResults.map((r) => r.term)));
  const sessions = Array.from(new Set(termResults.map((r) => r.session)));

  // Get selected result
  const selectedResult = termResults.find(
    (r) => r.term === selectedTerm && r.session === selectedSession
  );

  const termOptions = terms.map((term) => ({ value: term, label: term }));
  const sessionOptions = sessions.map((session) => ({
    value: session,
    label: session,
  }));

  const handleDownloadResult = (result: TermResult) => {
    // Generate text content for the result
    let content = `STUDENT REPORT CARD\n`;
    content += `${"=".repeat(60)}\n\n`;
    content += `Student Name: ${currentStudent.firstName} ${currentStudent.lastName}\n`;
    content += `Student ID: ${currentStudent.studentId}\n`;
    content += `Class: ${result.className}\n`;
    content += `Term: ${result.term}\n`;
    content += `Session: ${result.session}\n\n`;
    content += `${"=".repeat(60)}\n\n`;
    content += `SUBJECT RESULTS\n`;
    content += `${"=".repeat(60)}\n\n`;

    result.subjects.forEach((subject) => {
      content += `Subject: ${subject.subjectName} (${subject.subjectCode})\n`;
      content += `  First CA: ${subject.firstCA}\n`;
      content += `  Second CA: ${subject.secondCA}\n`;
      content += `  Exam: ${subject.exam}\n`;
      content += `  Total: ${subject.total}\n`;
      content += `  Grade: ${subject.grade}\n`;
      content += `  Remarks: ${subject.remarks}\n`;
      if (subject.teacherComment) {
        content += `  Teacher's Comment: ${subject.teacherComment}\n`;
      }
      content += `\n`;
    });

    content += `${"=".repeat(60)}\n\n`;
    content += `SUMMARY\n`;
    content += `${"=".repeat(60)}\n\n`;
    content += `Total Score: ${result.totalScore}\n`;
    content += `Average Score: ${result.averageScore.toFixed(2)}\n`;
    content += `Position: ${result.position} out of ${result.totalStudents}\n\n`;

    if (result.classTeacherComment) {
      content += `Class Teacher's Comment:\n${result.classTeacherComment}\n\n`;
    }

    if (result.principalComment) {
      content += `Principal's Comment:\n${result.principalComment}\n\n`;
    }

    if (result.nextTermBegins) {
      content += `Next Term Begins: ${result.nextTermBegins.toLocaleDateString()}\n`;
    }

    // Create and download the file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Result_${result.term.replace(
      /\s+/g,
      "_"
    )}_${result.session.replace("/", "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade: string) => {
    if (grade === "A") return "text-green-600 dark:text-green-400";
    if (grade === "B+" || grade === "B")
      return "text-blue-600 dark:text-blue-400";
    if (grade === "C") return "text-yellow-600 dark:text-yellow-400";
    if (grade === "D") return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="View and download your academic results"
      />

      {/* Selection Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Term and Session
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Term"
            value={termOptions.find((opt) => opt.value === selectedTerm)}
            onChange={(option) => setSelectedTerm(option?.value || "")}
            options={termOptions}
            placeholder="Select Term"
          />
          <Select
            label="Session"
            value={sessionOptions.find((opt) => opt.value === selectedSession)}
            onChange={(option) => setSelectedSession(option?.value || "")}
            options={sessionOptions}
            placeholder="Select Session"
          />
        </div>
      </div>

      {/* Result Display */}
      {selectedResult ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Subjects
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {selectedResult.subjects.length}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-300">
                {selectedResult.averageScore.toFixed(1)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Position
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-purple-700 dark:text-purple-300">
                {selectedResult.position}/{selectedResult.totalStudents}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Score
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-300">
                {selectedResult.totalScore}
              </p>
            </div>
          </div>

          {/* Subject Results Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Subject Results
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CA 1
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CA 2
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Exam
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedResult.subjects.map((subject) => (
                    <tr
                      key={subject.subjectId}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subject.subjectName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {subject.subjectCode}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-white">
                        {subject.firstCA}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-white">
                        {subject.secondCA}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-white">
                        {subject.exam}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {subject.total}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={cn(
                            "text-sm font-bold",
                            getGradeColor(subject.grade)
                          )}
                        >
                          {subject.grade}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {subject.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comments */}
          {(selectedResult.classTeacherComment ||
            selectedResult.principalComment) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {selectedResult.classTeacherComment && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Class Teacher's Comment
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedResult.classTeacherComment}
                  </p>
                </div>
              )}
              {selectedResult.principalComment && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Principal's Comment
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedResult.principalComment}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Download Button */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleDownloadResult(selectedResult)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Result
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Result Selected
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Please select a term and session to view your results.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
