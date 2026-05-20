import { create } from "zustand";

interface UploadStore {
  progress: number;
  isUploading: boolean;
  status: "idle" | "uploading" | "success" | "error";

  startUpload: () => void;
  setProgress: (progress: number) => void;
  finishUpload: () => void;
  failUpload: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  progress: 0,
  isUploading: false,
  status: "idle",

  startUpload: () =>
    set({
      isUploading: true,
      progress: 0,
      status: "uploading",
    }),

  setProgress: (progress) =>
    set({ progress }),

  finishUpload: () =>
    set({
      isUploading: false,
      progress: 100,
      status: "success",
    }),

  failUpload: () =>
    set({
      isUploading: false,
      status: "error",
    }),
}));