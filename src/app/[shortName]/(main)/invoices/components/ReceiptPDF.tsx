"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import dayjs from "dayjs";
import type { Invoice } from "@/src/types";
import type { SchoolBasicInfo } from "@/src/types";

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #3b82f6",
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  logoContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  logo: { width: 50, height: 50, marginRight: 10 },
  schoolInfo: { flex: 1 },
  schoolName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  headerRight: { flexDirection: "column", alignItems: "flex-end" },
  receiptTitle: { fontSize: 20, fontWeight: "bold", color: "#3b82f6" },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 5,
  },
  statusText: { fontSize: 9, fontWeight: "bold", color: "#ffffff" },
  studentSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
  },
  infoRow: { flexDirection: "row", marginBottom: 5 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 9, color: "#6b7280", marginBottom: 2 },
  infoValue: { fontSize: 10, fontWeight: "bold", color: "#1f2937" },
  table: { marginBottom: 20 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 4,
  },
  tableHeaderCell: { color: "#ffffff", fontWeight: "bold", fontSize: 9 },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    padding: 8,
  },
  tableRowAlt: { backgroundColor: "#f9fafb" },
  tableCell: { fontSize: 9, color: "#1f2937" },
  colItem: { flex: 3 },
  colCode: { flex: 1 },
  colAmount: { flex: 1, textAlign: "right" },
  summarySection: { marginTop: 10, alignItems: "flex-end" },
  summaryRow: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  summaryLabel: { fontSize: 10, color: "#6b7280" },
  summaryValue: { fontSize: 10, fontWeight: "bold", color: "#1f2937" },
  totalRow: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    marginTop: 5,
  },
  totalLabel: { fontSize: 11, fontWeight: "bold", color: "#ffffff" },
  totalValue: { fontSize: 11, fontWeight: "bold", color: "#ffffff" },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: "1 solid #e5e7eb",
    textAlign: "center",
  },
  footerText: { fontSize: 8, color: "#6b7280", marginBottom: 3 },
  timestamp: { fontSize: 8, color: "#9ca3af", fontStyle: "italic" },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const capitalizeName = (str?: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatCurrency = (amount: number) =>
  `NGN ${Number(amount ?? 0).toLocaleString()}`;

const formatDate = (date: Date | string) => dayjs(date).format("MMMM D, YYYY");

const getStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "#10b981";
    case "PARTIALLY_PAID":
      return "#f59e0b";
    default:
      return "#ef4444";
  }
};

// ─── PDF Document ─────────────────────────────────────────────────────────────

interface ReceiptDocumentProps {
  invoice: Invoice;
  school: SchoolBasicInfo;
}

const ReceiptDocument = ({ invoice, school }: ReceiptDocumentProps) => {
  const {
    studentId,
    sessionId,
    termId,
    items,
    totalAmount,
    amountPaid,
    status,
  } = invoice;

  const hasCode = items.some((i) => i.code);

  const infoFields = [
    {
      label: "Student Name:",
      value: [studentId.firstName, studentId.middleName, studentId.lastName]
        .filter(Boolean)
        .map(capitalizeName)
        .join(" "),
    },
    {
      label: "Student Number:",
      value: studentId.studentNumber.toUpperCase(),
    },
    { label: "Session:", value: sessionId.name },
    {
      label: "Term:",
      value: `${capitalizeName(termId.name)} Term`,
    },
  ];

  const infoRows: (typeof infoFields)[] = [];
  for (let i = 0; i < infoFields.length; i += 2) {
    infoRows.push(infoFields.slice(i, i + 2));
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              {school.logo && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={school.logo} style={styles.logo} />
              )}
              <View style={styles.schoolInfo}>
                <Text style={styles.schoolName}>{school.name}</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.receiptTitle}>RECEIPT</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {status.replace(/_/g, " ")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Student / Academic Info */}
        <View style={styles.studentSection}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          {infoRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.infoRow}>
              {row.map((field, colIndex) => (
                <View key={colIndex} style={styles.infoItem}>
                  <Text style={styles.infoLabel}>{field.label}</Text>
                  <Text style={styles.infoValue}>{field.value ?? "—"}</Text>
                </View>
              ))}
              {row.length === 1 && <View style={styles.infoItem} />}
            </View>
          ))}
        </View>

        {/* Payment Items Table */}
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Payment Items</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colItem]}>
              Description
            </Text>
            {hasCode && (
              <Text style={[styles.tableHeaderCell, styles.colCode]}>Code</Text>
            )}
            <Text style={[styles.tableHeaderCell, styles.colAmount]}>
              Amount (NGN)
            </Text>
          </View>
          {items.map((item, index) => (
            <View
              key={item.code ?? index}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowAlt : {},
              ]}
            >
              <Text style={[styles.tableCell, styles.colItem]}>
                {item.title}
              </Text>
              {hasCode && (
                <Text style={[styles.tableCell, styles.colCode]}>
                  {item.code ?? ""}
                </Text>
              )}
              <Text style={[styles.tableCell, styles.colAmount]}>
                {item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: "#10b981" }]}>
              Amount Paid:
            </Text>
            <Text style={[styles.summaryValue, { color: "#10b981" }]}>
              {formatCurrency(amountPaid)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: "#ef4444" }]}>
              Balance:
            </Text>
            <Text style={[styles.summaryValue, { color: "#ef4444" }]}>
              {formatCurrency(totalAmount - amountPaid)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.timestamp}>
            Generated on: {formatDate(new Date())}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// ─── Download Button ──────────────────────────────────────────────────────────

interface DownloadReceiptButtonProps {
  invoice: Invoice;
  school: SchoolBasicInfo;
}

const DownloadReceiptButton = ({
  invoice,
  school,
}: DownloadReceiptButtonProps) => {
  const fileName =
    `receipt-${invoice.studentId.studentNumber}-${invoice.sessionId.name}-${invoice.termId.name}.pdf`
      .toLowerCase()
      .replace(/\//g, "-")
      .replace(/\s+/g, "-");

  return (
    <PDFDownloadLink
      document={<ReceiptDocument invoice={invoice} school={school} />}
      fileName={fileName}
      className="w-full"
    >
      {({ loading }) => (
        <button
          type="button"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {loading ? "Preparing PDF…" : "Download Receipt"}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadReceiptButton;
