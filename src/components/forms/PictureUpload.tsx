"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import Button from "@/src/components/forms/button";
import { usePictureUpload } from "@/src/lib/queries/usePictureUpload";
import { cn } from "@/src/lib/utils";

interface PictureUploadProps {
  value?: string;
  onChange: (photoUrl: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  productName?: string;
  type?: string;
  maxSizeMb?: number;
  className?: string;
  onUploadingChange?: (isUploading: boolean) => void;
}

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const getUploadErrorMessage = (error: unknown): string =>
  (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ??
  (error instanceof Error ? error.message : "Unable to upload the picture.");

export const PictureUpload = ({
  value,
  onChange,
  label = "Profile picture",
  error,
  disabled = false,
  productName = "school",
  type = "profile",
  maxSizeMb = 5,
  className,
  onUploadingChange,
}: PictureUploadProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>();
  const [uploadError, setUploadError] = useState<string>();
  const { mutate: upload, isPending } = usePictureUpload({
    productName,
    type,
  });

  useEffect(
    () => () => {
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    },
    [localPreviewUrl],
  );

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      setUploadError("Select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      setUploadError(`Picture size cannot exceed ${maxSizeMb} MB.`);
      return;
    }

    setUploadError(undefined);
    setLocalPreviewUrl(URL.createObjectURL(file));
    onUploadingChange?.(true);
    upload(file, {
      onSuccess: (photoUrl) => {
        onChange(photoUrl);
        setLocalPreviewUrl(undefined);
        toast.success("Picture uploaded successfully.");
      },
      onError: (uploadFailure) => {
        setLocalPreviewUrl(undefined);
        setUploadError(getUploadErrorMessage(uploadFailure));
      },
      onSettled: () => onUploadingChange?.(false),
    });
  };

  const handleRemove = () => {
    setLocalPreviewUrl(undefined);
    setUploadError(undefined);
    onChange("");
  };

  const previewUrl = localPreviewUrl ?? value;
  const message = uploadError ?? error;

  return (
    <div className={cn("space-y-3", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted bg-cover bg-center"
          style={
            previewUrl
              ? { backgroundImage: `url(${JSON.stringify(previewUrl)})` }
              : undefined
          }
          role={previewUrl ? "img" : undefined}
          aria-label={previewUrl ? "Selected profile picture" : undefined}
        >
          {!previewUrl && (
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={allowedImageTypes.join(",")}
            onChange={handlePictureChange}
            disabled={disabled || isPending}
            className="sr-only"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              loading={isPending}
              disabled={disabled || isPending}
              onClick={() => inputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {value ? "Replace picture" : "Upload picture"}
            </Button>
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || isPending}
                onClick={handleRemove}
                className="gap-2 text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, or WebP. Maximum size: {maxSizeMb} MB.
          </p>
        </div>
      </div>
      {message && <p className="text-xs text-error">{message}</p>}
    </div>
  );
};
