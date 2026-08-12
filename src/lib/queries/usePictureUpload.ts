import { useMutation } from "@tanstack/react-query";

import { useSchool } from "@/src/lib/context/SchoolContext";
import { uploadPicture } from "@/src/network/files";

interface UsePictureUploadOptions {
  productName?: string;
  type?: string;
}

export const usePictureUpload = ({
  productName = "school",
  type = "profile",
}: UsePictureUploadOptions = {}) => {
  const { shortName } = useSchool();

  return useMutation({
    mutationFn: (file: File) =>
      uploadPicture({
        file,
        productName,
        organisationShortName: shortName,
        type,
      }),
  });
};
