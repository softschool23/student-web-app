import { academicApiClient, platformApiClient } from "./axios";
import type {
  ResultPreview,
  ResultDownloadResponse,
  PdfJobStatus,
} from "@/src/types";

export const getResultPreview = async (
  termId: string,
  sessionId: string,
): Promise<ResultPreview> => {
  const { data } = await academicApiClient.get<ResultPreview>(
    "/student-portal/results",
    { params: { termId, sessionId } },
  );
  return data;
};

export const triggerResultDownload = async (
  termId: string,
  sessionId: string,
): Promise<ResultDownloadResponse> => {
  const { data } = await academicApiClient.get<ResultDownloadResponse>(
    "/student-portal/results/download",
    { params: { termId, sessionId } },
  );
  return data;
};

export const getPdfJobStatus = async (jobId: string): Promise<PdfJobStatus> => {
  const { data } = await platformApiClient.get<PdfJobStatus>(
    `/files/status/${jobId}`,
  );
  return data;
};
