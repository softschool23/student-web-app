"use client";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  usePDF,
  View,
} from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import { toast } from "sonner";

import Button from "@/src/components/forms/button";
import dayjs from "@/src/lib/dayjs";
import { getProxiedPdfImageUrl } from "@/src/lib/pdf";
import type {
  CollegeStudentProfile,
  CourseRegistration,
  StudentPortalSchool,
} from "@/src/types";

interface CourseRegistrationDocumentProps {
  registration: CourseRegistration;
  school: StudentPortalSchool;
  semesterName: string;
  sessionName: string;
  student: CollegeStudentProfile;
}

interface StudentDetailRowProps {
  label: string;
  value: string;
}

type CourseRegistrationPDFProps = CourseRegistrationDocumentProps;

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingRight: 34,
    paddingBottom: 50,
    paddingLeft: 34,
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 7.5,
  },
  watermark: {
    position: "absolute",
    top: 256,
    left: 132.5,
    width: 330,
    height: 330,
    objectFit: "contain",
    opacity: 0.06,
  },
  institutionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  schoolLogo: {
    width: 55,
    height: 55,
    marginRight: 12,
    objectFit: "contain",
  },
  schoolLogoPlaceholder: {
    width: 55,
    height: 55,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    border: "1 solid #9ca3af",
    backgroundColor: "#f3f4f6",
  },
  schoolLogoPlaceholderText: {
    color: "#6b7280",
    fontSize: 6,
    textAlign: "center",
  },
  institutionDetails: {
    flex: 1,
    alignItems: "center",
    paddingRight: 67,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  academicHeaderLine: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  schoolMotto: {
    marginTop: 3,
    color: "#374151",
    fontSize: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
  documentTitle: {
    marginTop: 11,
    fontSize: 12.5,
    fontWeight: "bold",
    letterSpacing: 0.6,
    textDecoration: "underline",
  },
  studentSection: {
    minHeight: 86,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  studentDetails: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 16,
  },
  studentDetailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  studentDetailLabel: {
    width: 108,
    fontWeight: "bold",
  },
  studentDetailValue: {
    flex: 1,
    fontWeight: "bold",
  },
  studentPhoto: {
    width: 70,
    height: 84,
    objectFit: "cover",
  },
  studentPhotoPlaceholder: {
    width: 70,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
    border: "1 solid #9ca3af",
    backgroundColor: "#f3f4f6",
  },
  studentPhotoPlaceholderText: {
    color: "#6b7280",
    fontSize: 6.5,
    textAlign: "center",
  },
  table: {
    borderTop: "1 solid #111827",
    borderLeft: "1 solid #111827",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    justifyContent: "center",
    borderRight: "1 solid #111827",
    borderBottom: "1 solid #111827",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tableHeaderCell: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
    textAlign: "center",
  },
  serialColumn: {
    width: "5%",
    textAlign: "center",
  },
  codeColumn: {
    width: "13%",
    textAlign: "center",
  },
  titleColumn: {
    width: "38%",
  },
  unitColumn: {
    width: "10%",
    textAlign: "center",
  },
  statusColumn: {
    width: "10%",
    textAlign: "center",
  },
  lecturerColumn: {
    width: "24%",
    textAlign: "center",
  },
  summaryLabelColumn: {
    width: "56%",
    textAlign: "right",
    fontWeight: "bold",
  },
  summaryTotalColumn: {
    width: "34%",
    fontWeight: "bold",
    textAlign: "center",
  },
  certification: {
    border: "1 solid #111827",
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
    lineHeight: 1.35,
  },
  certificationLabel: {
    fontWeight: "bold",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 34,
    paddingHorizontal: 22,
  },
  signature: {
    width: "43%",
    borderTop: "1 solid #111827",
    paddingTop: 4,
    fontSize: 7.5,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    right: 34,
    bottom: 18,
    left: 34,
    borderTop: "0.5 solid #d1d5db",
    paddingTop: 6,
    color: "#6b7280",
    fontSize: 7.5,
    textAlign: "center",
  },
});

const formatWords = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll("_", " ")
    .split(/\s+/)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

const formatLevel = (value?: string): string =>
  value
    ? formatWords(value.replace(/(\d)([a-z])/gi, "$1 $2"))
    : "Not provided";

const StudentDetailRow = ({ label, value }: StudentDetailRowProps) => (
  <View style={styles.studentDetailRow}>
    <Text style={styles.studentDetailLabel}>{label}:</Text>
    <Text style={styles.studentDetailValue}>{value}</Text>
  </View>
);

export const CourseRegistrationDocument = ({
  registration,
  school,
  semesterName,
  sessionName,
  student,
}: CourseRegistrationDocumentProps) => {
  const studentName = [
    student.firstName,
    student.middleName,
    student.lastName,
  ]
    .filter(Boolean)
    .map(formatWords)
    .join(" ");
  const departmentName = student.department?.name ?? "Not provided";
  const levelName = formatLevel(student.currentLevel?.name);
  const formattedSemesterName = formatWords(semesterName);
  const certificationText = `This confirms that ${studentName} submitted course registration as a ${levelName.toLowerCase()} student in the Department of ${departmentName} for the ${sessionName} session, ${formattedSemesterName}. The courses listed above reflect the submitted registration record.`;

  return (
    <Document
      title={`Course registration - ${student.registrationNumber}`}
      author={school.name}
      subject="Official course registration form"
      creator="SoftSchool"
    >
      <Page size="A4" style={styles.page}>
        {school.logo && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            fixed
            src={getProxiedPdfImageUrl(school.logo)}
            style={styles.watermark}
          />
        )}

        <View style={styles.institutionHeader}>
          {school.logo ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              src={getProxiedPdfImageUrl(school.logo)}
              style={styles.schoolLogo}
            />
          ) : (
            <View style={styles.schoolLogoPlaceholder}>
              <Text style={styles.schoolLogoPlaceholderText}>SCHOOL LOGO</Text>
            </View>
          )}
          <View style={styles.institutionDetails}>
            <Text style={styles.schoolName}>{school.name.toUpperCase()}</Text>
            <Text style={styles.academicHeaderLine}>
              {(student.faculty?.name ?? "Not provided").toUpperCase()}
            </Text>
            <Text style={styles.academicHeaderLine}>
              {departmentName.toUpperCase()}
            </Text>
            {school.motto && (
              <Text style={styles.schoolMotto}>
                &quot;{formatWords(school.motto)}&quot;
              </Text>
            )}
            <Text style={styles.documentTitle}>
              OFFICIAL COURSE REGISTRATION FORM
            </Text>
          </View>
        </View>

        <View style={styles.studentSection}>
          <View style={styles.studentDetails}>
            <StudentDetailRow label="Student Name" value={studentName} />
            <StudentDetailRow
              label="Reg. Number"
              value={student.registrationNumber.toUpperCase()}
            />
            <StudentDetailRow label="Department" value={departmentName} />
            {student.program && (
              <StudentDetailRow label="Program" value={student.program.name} />
            )}
            <StudentDetailRow
              label="Level / Session"
              value={`${levelName} / ${sessionName}`}
            />
            <StudentDetailRow label="Semester" value={formattedSemesterName} />
          </View>
          {student.photo ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              src={getProxiedPdfImageUrl(student.photo)}
              style={styles.studentPhoto}
            />
          ) : (
            <View style={styles.studentPhotoPlaceholder}>
              <Text style={styles.studentPhotoPlaceholderText}>
                STUDENT PHOTO
              </Text>
            </View>
          )}
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow} wrap={false}>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.serialColumn,
              ]}
            >
              S/N
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.codeColumn,
              ]}
            >
              COURSE CODE
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.titleColumn,
              ]}
            >
              COURSE TITLE
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.unitColumn,
              ]}
            >
              CREDIT UNIT
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.statusColumn,
              ]}
            >
              STATUS
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeaderCell,
                styles.lecturerColumn,
              ]}
            >
              NAME, SIGNATURE OF COURSE LECTURER &amp; DATE
            </Text>
          </View>

          {registration.courses.map((course, index) => (
            <View key={course.id || course.courseId} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCell, styles.serialColumn]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.codeColumn]}>
                {course.code.toUpperCase()}
              </Text>
              <Text style={[styles.tableCell, styles.titleColumn]}>
                {course.title}
              </Text>
              <Text style={[styles.tableCell, styles.unitColumn]}>
                {course.creditUnit}
              </Text>
              <Text style={[styles.tableCell, styles.statusColumn]}>
                {formatWords(course.classification)}
              </Text>
              <Text style={[styles.tableCell, styles.lecturerColumn]}> </Text>
            </View>
          ))}

          <View style={styles.tableRow} wrap={false}>
            <Text style={[styles.tableCell, styles.summaryLabelColumn]}>
              Total Registered Courses: {registration.courses.length}
            </Text>
            <Text style={[styles.tableCell, styles.unitColumn]}>
              {registration.totalCreditUnits}
            </Text>
            <Text style={[styles.tableCell, styles.summaryTotalColumn]}>
              Total Credit Units Registered: {registration.totalCreditUnits}
            </Text>
          </View>
        </View>

        <View style={styles.certification} wrap={false}>
          <Text>
            <Text style={styles.certificationLabel}>
              CERTIFICATION OF REGISTRATION:{" "}
            </Text>
            {certificationText}
          </Text>
        </View>

        <View style={styles.signatures} wrap={false}>
          <Text style={styles.signature}>Student's Signature &amp; Date</Text>
          <Text style={styles.signature}>HOD Signature &amp; Date</Text>
        </View>

        <Text fixed style={styles.footer}>
          Generated on {dayjs().format("D MMMM YYYY")}
          {" | "}https://www.softschool.ng
        </Text>
      </Page>
    </Document>
  );
};

const CourseRegistrationPDF = ({
  registration,
  school,
  semesterName,
  sessionName,
  student,
}: CourseRegistrationPDFProps) => {
  const [instance] = usePDF({
    document: (
      <CourseRegistrationDocument
        registration={registration}
        school={school}
        semesterName={semesterName}
        sessionName={sessionName}
        student={student}
      />
    ),
  });

  const handlePrint = () => {
    if (instance.error) {
      toast.error("Unable to prepare the course registration form.");
      return;
    }

    if (!instance.url) return;

    const printWindow = window.open(instance.url, "_blank");

    if (!printWindow) {
      toast.error("Please allow pop-ups to print your registration form.");
      return;
    }

    printWindow.addEventListener(
      "load",
      () => {
        printWindow.focus();
        printWindow.print();
      },
      { once: true },
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      loading={instance.loading}
      disabled={instance.loading}
      onClick={handlePrint}
      className="shrink-0 gap-2"
    >
      <Printer className="h-4 w-4" />
      {instance.loading ? "Preparing form…" : "Print registration form"}
    </Button>
  );
};

export default CourseRegistrationPDF;
