"use client";

import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { Dot, File, Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useId } from "react";
import { useDropzone } from "react-dropzone";

export type UploadFileState = {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
  error?: string;
  url?: string;
};

export type UploadDropzoneProgressProps = {
  files: UploadFileState[];
  onUpload: (files: File[]) => void;
  onRemove?: (id: string) => void;
  isPending?: boolean;
  id?: string;
  accept?: string;
  description?:
    | {
        fileTypes?: string;
        maxFileSize?: string;
        maxFiles?: number;
      }
    | string;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function UploadDropzoneProgress({
  files,
  onUpload,
  onRemove,
  isPending,
  id: _id,
  accept,
  description,
}: UploadDropzoneProgressProps) {
  const id = useId();

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    noClick: true,
    accept: accept
      ? accept.split(",").reduce((acc, curr) => {
          const mime = curr.trim();
          if (mime === ".pdf") acc["application/pdf"] = [".pdf"];
          else if (mime === ".doc") acc["application/msword"] = [".doc"];
          else if (mime === ".docx")
            acc[
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ] = [".docx"];
          return acc;
        }, {} as Record<string, string[]>)
      : undefined,
  });

  return (
    <div className="text-foreground flex flex-col gap-3">
      <div
        className={cn(
          "relative rounded-lg border border-dashed transition-colors",
          {
            "border-amber-500/80": isDragActive,
          }
        )}
      >
        <label
          {...getRootProps()}
          className={cn(
            "dark:bg-input/10 flex w-full min-w-72 cursor-pointer flex-col items-center justify-center rounded-lg bg-transparent px-2 py-6 transition-colors",
            {
              "text-muted-foreground cursor-not-allowed": isPending,
              "hover:bg-amber-50": !isPending,
              "opacity-0": isDragActive,
            }
          )}
          htmlFor={_id || id}
        >
          <div className="my-2 text-amber-600">
            <Upload className="size-6" />
          </div>

          <div className="mt-3 space-y-1 text-center">
            <p className="text-sm font-semibold">Drag and drop files here</p>

            <div className="text-muted-foreground max-w-64 text-xs">
              {typeof description === "string" ? (
                description
              ) : (
                <>
                  {description?.maxFiles &&
                    `You can upload ${description.maxFiles} file${description.maxFiles !== 1 ? "s" : ""}.`}{" "}
                  {description?.maxFileSize &&
                    `${description.maxFiles !== 1 ? "Each u" : "U"}p to ${description.maxFileSize}.`}{" "}
                  {description?.fileTypes &&
                    `Accepted ${description.fileTypes}.`}
                </>
              )}
            </div>
          </div>

          <input
            {...getInputProps()}
            type="file"
            multiple
            id={_id || id}
            accept={accept}
            disabled={isPending}
          />
        </label>

        {isDragActive && (
          <div className="pointer-events-none absolute inset-0 rounded-lg">
            <div className="dark:bg-accent/40 bg-amber-50 flex size-full flex-col items-center justify-center rounded-lg">
              <div className="my-2 text-amber-600">
                <Upload className="size-6" />
              </div>

              <p className="mt-3 text-sm font-semibold">Drop files here</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-2">
        {files.map((fileState) => (
          <div
            key={fileState.id}
            className={cn(
              "dark:bg-input/10 flex items-center gap-2 rounded-lg border bg-transparent p-3",
              {
                "border-red-500/60 bg-red-50":
                  fileState.status === "error",
                "border-green-500/60 bg-green-50":
                  fileState.status === "complete",
              },
            )}
          >
            <FileIcon type={fileState.file.type} />

            <div className="grid grow gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  <p className="max-w-40 truncate text-sm font-medium">
                    {fileState.file.name}
                  </p>
                  <Dot className="size-4 text-stone-400" />
                  <p className="text-xs text-stone-400">
                    {formatBytes(fileState.file.size)}
                  </p>
                </div>
                {onRemove && (
                  <button
                    onClick={() => onRemove(fileState.id)}
                    className="text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <div className="flex h-4 items-center gap-2">
                {fileState.status === "uploading" ? (
                  <>
                    <Progress className="h-1.5 grow" value={fileState.progress} />
                    <span className="text-[10px] text-stone-400 tabular-nums">
                      {Math.round(fileState.progress)}%
                    </span>
                  </>
                ) : fileState.status === "error" ? (
                  <div className="flex items-center gap-1 text-red-500">
                    <AlertCircle className="size-3" />
                    <p className="text-xs">{fileState.error || "Failed"}</p>
                  </div>
                ) : fileState.status === "complete" ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="size-3" />
                    <p className="text-xs">Completed</p>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400">Ready to upload</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const iconCaptions: Record<string, string> = {
  "image/": "IMG",
  "video/": "VID",
  "audio/": "AUD",
  "application/pdf": "PDF",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/zip": "ZIP",
  "application/x-rar-compressed": "RAR",
  "application/x-7z-compressed": "7Z",
  "application/x-tar": "TAR",
  "application/json": "JSON",
  "application/javascript": "JS",
  "text/plain": "TXT",
  "text/csv": "CSV",
  "text/html": "HTML",
  "text/css": "CSS",
  "application/xml": "XML",
  "application/x-sh": "SH",
  "application/x-python-code": "PY",
  "application/x-executable": "EXE",
  "application/x-disk-image": "ISO",
};

function FileIcon({ type }: { type: string }) {
  const caption = Object.entries(iconCaptions).find(([key]) =>
    type.startsWith(key),
  )?.[1];

  return (
    <div className="relative shrink-0">
      <File className="size-12 text-stone-400" strokeWidth={1} />

      {caption && (
        <span className="absolute bottom-2.5 left-0.5 rounded bg-amber-600 px-1 py-px text-[10px] font-semibold text-white select-none">
          {caption}
        </span>
      )}
    </div>
  );
}
