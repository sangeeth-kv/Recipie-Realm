// components/Recipes/AddRecipe/RecipeImageUpload.tsx
//
// DEPENDENCIES TO INSTALL:
//   npm install react-easy-crop
//   npm install lucide-react   (likely already installed)
//
// HOW BACKEND DATA IS SENT:
//   The parent's `handleSubmit` receives `formData.images` as an array of
//   { file: File, croppedBlob: Blob, previewUrl: string } objects (see ImageEntry).
//   Build a FormData and append each croppedBlob before your API call:
//
//   const fd = new FormData();
//   formData.images.forEach((img, i) => fd.append(`images[${i}]`, img.croppedBlob, img.file.name));
//   await fetch("/api/recipes", { method: "POST", body: fd });

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import {
  ImagePlus, Trash2, Crop, RotateCw, ZoomIn, ZoomOut,
  Check, X, Camera, Images, ChevronDown,
} from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImageEntry {
  file: File;
  originalUrl: string;
  previewUrl: string;
  croppedBlob: Blob;
  crop: Point;
  zoom: number;
  rotation: number;
  croppedAreaPixels: Area | null;
}

interface Props {
  images: ImageEntry[];
  updateField: <K extends keyof RecipeFormData>(field: K, value: RecipeFormData[K]) => void;
}

// ─── Helper: canvas crop ──────────────────────────────────────────────────────

async function getCroppedBlob(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<{ blob: Blob; previewUrl: string }> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y)
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Canvas is empty"));
        resolve({ blob, previewUrl: URL.createObjectURL(blob) });
      },
      "image/jpeg",
      0.9
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}

// ─── Source Picker (Instagram-style bottom sheet) ─────────────────────────────

interface SourcePickerProps {
  onCamera: () => void;
  onGallery: () => void;
  onClose: () => void;
}

function SourcePickerSheet({ onCamera, onGallery, onClose }: SourcePickerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden max-w-lg mx-auto">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>

          <div className="px-5 pb-2 pt-1">
            <p className="text-center text-xs text-slate-400 font-medium tracking-wide uppercase mb-4">
              Add Photo
            </p>

            {/* Camera option */}
            <button
              type="button"
              onClick={onCamera}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 active:bg-orange-100 transition-colors group mb-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-200 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">Take Photo</p>
                <p className="text-sm text-slate-400">Use your camera</p>
              </div>
            </button>

            {/* Gallery option */}
            <button
              type="button"
              onClick={onGallery}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors group mb-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center shadow-md shadow-slate-200 group-hover:scale-105 transition-transform">
                <Images className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">Choose from Gallery</p>
                <p className="text-sm text-slate-400">Browse your photos</p>
              </div>
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors mb-safe mb-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.28s cubic-bezier(0.32, 0.72, 0, 1) both; }
      `}</style>
    </>
  );
}

// ─── Image Editor Modal ───────────────────────────────────────────────────────

interface EditorProps {
  entry: ImageEntry;
  onSave: (updated: Partial<ImageEntry>) => void;
  onClose: () => void;
}

function ImageEditorModal({ entry, onSave, onClose }: EditorProps) {
  const [crop, setCrop] = useState<Point>(entry.crop);
  const [zoom, setZoom] = useState(entry.zoom);
  const [rotation, setRotation] = useState(entry.rotation);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(entry.croppedAreaPixels);
  const [saving, setSaving] = useState(false);
  const [aspect, setAspect] = useState<number>(4 / 3);

  const aspectOptions = [
    { label: "4:3", value: 4 / 3 },
    { label: "1:1", value: 1 },
    { label: "16:9", value: 16 / 9 },
    { label: "Free", value: undefined as unknown as number },
  ];

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setSaving(true);
    try {
      const { blob, previewUrl } = await getCroppedBlob(entry.originalUrl, croppedAreaPixels, rotation);
      onSave({ crop, zoom, rotation, croppedAreaPixels, croppedBlob: blob, previewUrl });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
          <span className="font-semibold text-slate-800 text-base">Edit Photo</span>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            {saving ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {saving ? "Saving…" : "Done"}
          </button>
        </div>

        {/* Cropper */}
        <div className="relative w-full bg-black" style={{ height: 360 }}>
          <Cropper
            image={entry.originalUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { background: "#000" },
            }}
          />
        </div>

        {/* Aspect ratio pills */}
        <div className="flex gap-2 px-5 py-3 border-b border-slate-100 overflow-x-auto">
          {aspectOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setAspect(opt.value)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                aspect === opt.value
                  ? "bg-orange-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="px-5 py-4 space-y-4 bg-slate-50">
          {/* Zoom */}
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range" min={1} max={3} step={0.05} value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-orange-500"
            />
            <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 w-8 text-right">{zoom.toFixed(1)}×</span>
          </div>

          {/* Rotation */}
          <div className="flex items-center gap-3">
            <RotateCw className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range" min={-180} max={180} step={1} value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="flex-1 accent-orange-500"
            />
            <span className="text-xs text-slate-400 w-12 text-right">{rotation}°</span>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90 > 180 ? r + 90 - 360 : r + 90))}
              className="px-2.5 py-1 text-xs bg-slate-200 rounded-lg hover:bg-slate-300 text-slate-700 font-medium"
            >
              +90°
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecipeImageUpload({ images, updateField }: Props) {
  // Two separate file inputs: one for camera, one for gallery
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [showSourcePicker, setShowSourcePicker] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Detect mobile/tablet — laptops/desktops don't support capture well
  const isMobile = /Android|iPhone|iPad|iPod/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  // ── Process files ───────────────────────────────────────────────────────────
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setShowSourcePicker(false);

    const newEntries: ImageEntry[] = await Promise.all(
      Array.from(files).map(async (file) => {
        const originalUrl = URL.createObjectURL(file);
        const defaultCropArea: Area = { x: 0, y: 0, width: 400, height: 300 };
        const { blob, previewUrl } = await getCroppedBlob(originalUrl, defaultCropArea, 0).catch(
          () => ({ blob: file as unknown as Blob, previewUrl: originalUrl })
        );
        return {
          file,
          originalUrl,
          previewUrl,
          croppedBlob: blob,
          crop: { x: 0, y: 0 },
          zoom: 1,
          rotation: 0,
          croppedAreaPixels: null,
        };
      })
    );

    const updated = [...imageEntries, ...newEntries];
    updateField("images", updated as unknown as string[]);

    // Auto-open editor for the first newly added image
    if (newEntries.length > 0) {
      setEditingIndex(imageEntries.length);
    }
  };

  // ── Drag-and-drop ───────────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // ── Remove ──────────────────────────────────────────────────────────────────
  const removeImage = (index: number) => {
    const entry = imageEntries[index];
    URL.revokeObjectURL(entry.originalUrl);
    URL.revokeObjectURL(entry.previewUrl);
    updateField("images", images.filter((_, i) => i !== index));
  };

  // ── Save edit ───────────────────────────────────────────────────────────────
  const handleSaveEdit = (index: number, patch: Partial<ImageEntry>) => {
    const updated = images.map((img, i) => {
      if (i !== index) return img;
      const entry = img as unknown as ImageEntry;
      if (patch.previewUrl && patch.previewUrl !== entry.previewUrl) {
        URL.revokeObjectURL(entry.previewUrl);
      }
      return { ...entry, ...patch } as unknown as string;
    });
    updateField("images", updated);
    setEditingIndex(null);
  };

  const imageEntries = images as unknown as ImageEntry[];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Recipe Images</h2>
        <button
          type="button"
          onClick={() => setShowSourcePicker(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          <ImagePlus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {/* Hidden: Camera input — uses capture only on mobile; on desktop opens file picker so laptop webcam works via browser */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        {...(isMobile ? { capture: "environment" } : {})}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Hidden: Gallery input — no capture, opens file picker / gallery */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drop zone (no images yet) */}
      {imageEntries.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => setShowSourcePicker(true)}
          className="border-2 border-dashed border-orange-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-orange-50 transition-colors text-center"
        >
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Camera className="w-6 h-6 text-orange-400" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Images className="w-6 h-6 text-slate-400" />
            </div>
          </div>
          <div>
            <p className="font-medium text-slate-700">Take a photo or upload from gallery</p>
            <p className="text-sm text-slate-400 mt-1">PNG, JPG, WEBP — multiple files supported</p>
          </div>
        </div>
      )}

      {/* Image grid */}
      {imageEntries.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {imageEntries.map((entry, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden bg-slate-100 aspect-[4/3]"
            >
              <img
                src={entry.previewUrl}
                alt={`Recipe image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setEditingIndex(index)}
                  className="p-2 bg-white/90 rounded-xl text-slate-700 hover:bg-white transition-colors"
                  title="Edit / Crop"
                >
                  <Crop className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-500/90 rounded-xl text-white hover:bg-red-500 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Index badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  Cover
                </span>
              )}
              {index > 0 && (
                <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                  {index + 1}
                </span>
              )}
            </div>
          ))}

          {/* Add more tile */}
          <button
            type="button"
            onClick={() => setShowSourcePicker(true)}
            className="aspect-[4/3] rounded-xl border-2 border-dashed border-orange-200 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 transition-colors text-orange-400"
          >
            <ImagePlus className="w-6 h-6" />
            <span className="text-xs font-medium">Add more</span>
          </button>
        </div>
      )}

      {/* Helper */}
      {imageEntries.length > 0 && (
        <p className="text-xs text-slate-400">
          First image is used as the cover. Tap <strong>✂</strong> to crop, zoom, or rotate.
        </p>
      )}

      {/* Source picker bottom sheet */}
      {showSourcePicker && (
        <SourcePickerSheet
          onCamera={() => {
            setShowSourcePicker(false);
            // Small delay so the sheet closes before the native camera opens
            setTimeout(() => cameraInputRef.current?.click(), 100);
          }}
          onGallery={() => {
            setShowSourcePicker(false);
            setTimeout(() => galleryInputRef.current?.click(), 100);
          }}
          onClose={() => setShowSourcePicker(false)}
        />
      )}

      {/* Editor modal */}
      {editingIndex !== null && imageEntries[editingIndex] && (
        <ImageEditorModal
          entry={imageEntries[editingIndex]}
          onSave={(patch) => handleSaveEdit(editingIndex, patch)}
          onClose={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}