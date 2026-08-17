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
import type { CollegeStudentProfile, StudentPortalSchool } from "@/src/types";

interface StudentBiodataDocumentProps {
  school: StudentPortalSchool;
  student: CollegeStudentProfile;
}

interface BiodataDetail {
  label: string;
  value: string;
}

interface DetailCellProps extends BiodataDetail {
  fullWidth?: boolean;
}

interface DetailRowProps {
  left: BiodataDetail;
  right?: BiodataDetail;
}

type StudentBiodataPDFProps = StudentBiodataDocumentProps;

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingRight: 42,
    paddingBottom: 50,
    paddingLeft: 42,
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 8.5,
  },
  institutionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  schoolLogo: {
    width: 58,
    height: 58,
    marginRight: 12,
    objectFit: "contain",
  },
  schoolLogoPlaceholder: {
    width: 58,
    height: 58,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    border: "1 solid #9ca3af",
    backgroundColor: "#f3f4f6",
  },
  schoolLogoPlaceholderText: {
    color: "#6b7280",
    fontSize: 6.5,
    textAlign: "center",
  },
  schoolLogoWatermark: {
    position: "absolute",
    top: 256,
    left: 132.5,
    width: 330,
    height: 330,
    objectFit: "contain",
    opacity: 0.06,
  },
  institutionDetails: {
    flex: 1,
    alignItems: "center",
    paddingRight: 70,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  schoolAddress: {
    marginTop: 3,
    color: "#374151",
    fontSize: 8,
    textAlign: "center",
  },
  schoolContact: {
    marginTop: 2,
    color: "#4b5563",
    fontSize: 7.5,
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
    marginTop: 12,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.7,
    textDecoration: "underline",
  },
  identitySection: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottom: "2 solid #111827",
    paddingBottom: 2,
    marginBottom: 12,
  },
  identityDetails: {
    paddingBottom: 12,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  registrationNumber: {
    marginTop: 5,
    color: "#374151",
    fontSize: 10,
    fontWeight: "bold",
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    borderRadius: 2,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 7.5,
    fontWeight: "bold",
  },
  photo: {
    width: 72,
    height: 86,
    objectFit: "cover",
  },
  photoPlaceholder: {
    width: 72,
    height: 86,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    border: "1 solid #9ca3af",
  },
  photoPlaceholderText: {
    color: "#6b7280",
    fontSize: 7,
    textAlign: "center",
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    border: "1 solid #111827",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 10,
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    borderBottom: "0.5 solid #d1d5db",
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  detailCell: {
    width: "50%",
    flexDirection: "row",
    paddingRight: 8,
  },
  fullDetailCell: {
    width: "100%",
    flexDirection: "row",
    paddingRight: 8,
  },
  detailLabel: {
    width: "43%",
    color: "#4b5563",
    fontWeight: "bold",
  },
  fullDetailLabel: {
    width: "22%",
    color: "#4b5563",
    fontWeight: "bold",
  },
  detailValue: {
    width: "57%",
    color: "#111827",
    fontWeight: "bold",
  },
  fullDetailValue: {
    width: "78%",
    color: "#111827",
    fontWeight: "bold",
  },
  declaration: {
    flexDirection: "row",
    border: "1 solid #111827",
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    lineHeight: 1.35,
  },
  declarationLabel: {
    fontWeight: "bold",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 34,
    paddingHorizontal: 20,
  },
  signature: {
    width: "43%",
    borderTop: "1 solid #111827",
    paddingTop: 4,
    textAlign: "center",
    fontSize: 7.5,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    right: 42,
    bottom: 18,
    left: 42,
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
    .split(/\s+/)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

const displayValue = (value?: string | number): string => {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "Not provided";
  }

  return String(value);
};

const formatDate = (value?: string): string =>
  value && dayjs(value).isValid()
    ? dayjs(value).format("D/M/YYYY")
    : "Not provided";

const getPdfImageUrl = (imageUrl: string): string =>
  `/api/pdf-image?url=${encodeURIComponent(imageUrl)}`;

const DetailCell = ({ label, value, fullWidth = false }: DetailCellProps) => (
  <View style={fullWidth ? styles.fullDetailCell : styles.detailCell}>
    <Text style={fullWidth ? styles.fullDetailLabel : styles.detailLabel}>
      {label}:
    </Text>
    <Text style={fullWidth ? styles.fullDetailValue : styles.detailValue}>
      {displayValue(value)}
    </Text>
  </View>
);

const DetailRow = ({ left, right }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <DetailCell {...left} fullWidth={!right} />
    {right && <DetailCell {...right} />}
  </View>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

export const StudentBiodataDocument = ({
  school,
  student,
}: StudentBiodataDocumentProps) => {
  const studentName = [student.firstName, student.middleName, student.lastName]
    .filter(Boolean)
    .map(formatWords)
    .join(" ");
  const status = student.status
    ? `${student.status.replaceAll("_", " ").toUpperCase()} STUDENT`
    : "STUDENT";
  const isActive = student.status.toLowerCase() === "active";

  return (
    <Document
      title={`Student biodata - ${student.registrationNumber}`}
      author={school.name}
      subject="Official student biodata form"
      creator="SoftSchool"
    >
      <Page size="A4" style={styles.page}>
        {school.logo && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            fixed
            src={getPdfImageUrl(school.logo)}
            style={styles.schoolLogoWatermark}
          />
        )}
        <View style={styles.institutionHeader}>
          {school.logo ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={getPdfImageUrl(school.logo)} style={styles.schoolLogo} />
          ) : (
            <View style={styles.schoolLogoPlaceholder}>
              <Text style={styles.schoolLogoPlaceholderText}>SCHOOL LOGO</Text>
            </View>
          )}
          <View style={styles.institutionDetails}>
            <Text style={styles.schoolName}>{school.name.toUpperCase()}</Text>
            <Text style={styles.academicHeaderLine}>
              {displayValue(student.faculty?.name).toUpperCase()}
            </Text>
            <Text style={styles.academicHeaderLine}>
              {displayValue(student.department?.name).toUpperCase()}
            </Text>
            {school.motto && (
              <Text style={styles.schoolMotto}>
                &quot;{formatWords(school.motto)}&quot;
              </Text>
            )}
            <Text style={styles.schoolAddress}>
              {formatWords(school.address)}
            </Text>
            <Text style={styles.schoolContact}>
              {formatWords(school.state)}, {formatWords(school.country)}
              {" | "}Contact: {school.contact}
            </Text>
            <Text style={styles.documentTitle}>
              OFFICIAL STUDENT BIODATA FORM
            </Text>
          </View>
        </View>

        <View style={styles.identitySection}>
          <View style={styles.identityDetails}>
            <Text style={styles.studentName}>{studentName.toUpperCase()}</Text>
            <Text style={styles.registrationNumber}>
              {student.registrationNumber.toUpperCase()}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isActive ? "#188038" : "#4b5563" },
              ]}
            >
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
          {student.photo ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={getPdfImageUrl(student.photo)} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>STUDENT PHOTO</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <SectionTitle>ACADEMIC INFORMATION</SectionTitle>
          <DetailRow
            left={{
              label: "FACULTY / COLLEGE",
              value: displayValue(student.faculty?.name),
            }}
            right={{
              label: "DEPARTMENT",
              value: displayValue(student.department?.name),
            }}
          />
          <DetailRow
            left={{
              label: "CURRENT LEVEL",
              value: displayValue(student.currentLevel?.name),
            }}
            right={{
              label: "ADMISSION DATE",
              value: formatDate(student.admissionDate),
            }}
          />
          <DetailRow
            left={{
              label: "ADMISSION YEAR",
              value: displayValue(student.admissionYear),
            }}
            right={{
              label: "ADMISSION MODE",
              value: student.admissionMode
                ? student.admissionMode.replaceAll("_", " ").toUpperCase()
                : "Not provided",
            }}
          />
          <DetailRow
            left={{
              label: "PROGRAM TYPE",
              value: displayValue(student.program?.name),
            }}
          />
        </View>

        <View style={styles.section}>
          <SectionTitle>PERSONAL INFORMATION</SectionTitle>
          <DetailRow
            left={{ label: "EMAIL ADDRESS", value: student.email }}
            right={{ label: "PHONE NUMBER", value: student.phoneNumber }}
          />
          <DetailRow
            left={{
              label: "DATE OF BIRTH",
              value: formatDate(student.dateOfBirth),
            }}
            right={{
              label: "GENDER",
              value: student.gender
                ? formatWords(student.gender)
                : "Not provided",
            }}
          />
          <DetailRow
            left={{ label: "CONTACT ADDRESS", value: student.contactAddress }}
          />
        </View>

        <View style={styles.section}>
          <SectionTitle>GUARDIAN / NEXT OF KIN</SectionTitle>
          <DetailRow
            left={{ label: "FULL NAME", value: student.guardian?.fullName }}
            right={{
              label: "RELATIONSHIP",
              value: student.guardian?.relationship,
            }}
          />
          <DetailRow
            left={{ label: "EMAIL ADDRESS", value: student.guardian?.email }}
            right={{
              label: "PHONE NUMBER",
              value: student.guardian?.phoneNumber,
            }}
          />
        </View>

        <View style={styles.section}>
          <SectionTitle>HEALTH INFORMATION</SectionTitle>
          <DetailRow
            left={{
              label: "KNOWN HEALTH STATUS",
              value: student.knownHealthStatus,
            }}
          />
        </View>

        <View style={styles.declaration}>
          <Text>
            <Text style={styles.declarationLabel}>
              DECLARATION OF ACCURACY:{" "}
            </Text>
            I hereby confirm that the information provided in this biodata
            profile is accurate, complete, and verified against official
            institutional records maintained by {formatWords(school.name)}.
          </Text>
        </View>

        <View style={styles.signatures}>
          <Text style={styles.signature}>Student's Signature &amp; Date</Text>
          <Text style={styles.signature}>
            Academic Officer / HOD Signature &amp; Date
          </Text>
        </View>

        <Text fixed style={styles.footer}>
          Generated on {dayjs().format("D MMMM YYYY")}
          {" | "}https://www.softschool.ng
        </Text>
      </Page>
    </Document>
  );
};

const StudentBiodataPDF = ({ school, student }: StudentBiodataPDFProps) => {
  const [instance] = usePDF({
    document: <StudentBiodataDocument school={school} student={student} />,
  });

  const handlePrint = () => {
    if (instance.error) {
      toast.error("Unable to prepare the biodata form. Please try again.");
      return;
    }

    if (!instance.url) return;

    const printWindow = window.open(instance.url, "_blank");

    if (!printWindow) {
      toast.error("Please allow pop-ups to print your biodata form.");
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
      {instance.loading ? "Preparing form…" : "Print biodata form"}
    </Button>
  );
};

export default StudentBiodataPDF;
