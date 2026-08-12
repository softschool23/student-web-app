import { platformApiClient } from "@/src/network/config";
import type { UploadPictureParams } from "@/src/types";

interface UploadPictureData {
  url?: string;
  fileUrl?: string;
}

type UploadPictureResponse =
  | string
  | (UploadPictureData & { data?: UploadPictureData });

const getUploadedPictureUrl = (response: UploadPictureResponse): string => {
  if (typeof response === "string") return response;

  const photoUrl =
    response.url ??
    response.fileUrl ??
    response.data?.url ??
    response.data?.fileUrl;

  if (!photoUrl) {
    throw new Error("The upload completed without returning a photo URL");
  }

  return photoUrl;
};

export const uploadPicture = async ({
  file,
  organisationShortName,
  productName = "school",
  type = "profile",
}: UploadPictureParams): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("productName", productName);
  formData.append("organisationShortName", organisationShortName);
  formData.append("type", type);

  const { data } = await platformApiClient.post<UploadPictureResponse>(
    "/files/upload",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return getUploadedPictureUrl(data);
};
