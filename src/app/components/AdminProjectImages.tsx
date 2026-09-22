import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { C, itemVariants } from "./constants";
import { supabase } from "../../lib/supabase";
import { Image as ImageIcon, Upload, Trash2, AlertTriangle, ShieldCheck, RefreshCw, Eye, Sparkles, Star } from "lucide-react";

export interface ProjectImageRow {
  id: string;
  project_id: string;
  storage_path: string;
  alt_text: string;
  caption: string | null;
  display_order: number;
  is_cover: boolean;
  created_at: string;
  public_url?: string;
}

export interface AdminProjectImagesProps {
  projectId: string;
}

export function AdminProjectImages({ projectId }: AdminProjectImagesProps) {
  const [images, setImages] = useState<ProjectImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressionRatio, setCompressionRatio] = useState<number>(0);

  // Metadata Input State
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  // Operation States
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingCoverId, setSettingCoverId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch Project Images
  const fetchImages = async () => {
    try {
      setFetchError(null);
      const { data, error } = await supabase
        .from("project_images")
        .select("id, project_id, storage_path, alt_text, caption, display_order, is_cover, created_at")
        .eq("project_id", projectId)
        .order("display_order", { ascending: true });

      if (error) {
        console.warn("Failed to fetch project images.");
        setFetchError("Unable to retrieve project gallery records.");
        setLoading(false);
        return;
      }

      const formatted = (data as ProjectImageRow[] || []).map((img) => {
        const { data: pubData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(img.storage_path);
        return {
          ...img,
          public_url: pubData?.publicUrl,
        };
      });

      setImages(formatted);
      // Auto increment next display order suggestion
      if (formatted.length > 0) {
        const maxOrder = Math.max(...formatted.map((i) => i.display_order));
        setDisplayOrder(maxOrder + 1);
      } else {
        setDisplayOrder(0);
      }
      setLoading(false);
    } catch {
      console.warn("Network error during project image fetch.");
      setFetchError("Failed to load image gallery due to network connection issues.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [projectId]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Compress Image to WebP using Canvas
  const processAndCompressImage = async (file: File) => {
    setIsCompressing(true);
    setFormError(null);
    setSuccessMessage(null);
    setOriginalSize(file.size);

    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image into browser canvas."));
        img.src = objectUrl;
      });

      URL.revokeObjectURL(objectUrl);

      // 1. Calculate resized dimensions (max 1920px on longest side)
      let width = img.width;
      let height = img.height;
      const maxDimension = 1920;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      // 2. Render to Canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas 2D context unavailable.");
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // 3. Progressive Quality Reduction to guarantee <= 2 MB
      const targetMaxBytes = 2 * 1024 * 1024; // 2 MB Bucket limit
      const qualities = [0.85, 0.75, 0.65, 0.50];
      let finalBlob: Blob | null = null;

      for (const q of qualities) {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), "image/webp", q);
        });

        if (blob && blob.size <= targetMaxBytes) {
          finalBlob = blob;
          break;
        }
      }

      if (!finalBlob) {
        setFormError("Compressed WebP image exceeds the 2 MB storage limit. Please select a smaller image.");
        setIsCompressing(false);
        return;
      }

      // Update state with compressed image preview
      const compSize = finalBlob.size;
      const ratio = Math.round(((file.size - compSize) / file.size) * 100);
      const newPreviewUrl = URL.createObjectURL(finalBlob);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setCompressedBlob(finalBlob);
      setCompressedSize(compSize);
      setCompressionRatio(ratio > 0 ? ratio : 0);
      setPreviewUrl(newPreviewUrl);
      setSelectedFile(file);
      setIsCompressing(false);
    } catch {
      setFormError("Image processing failed. Please select a valid JPEG, PNG, or WebP file.");
      setIsCompressing(false);
    }
  };

  // Handle File Selector
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      setFormError("Invalid file type. Only JPEG, PNG, and WebP images are accepted.");
      return;
    }

    // Validate Original File Size (10 MB max input limit)
    const maxInputSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxInputSize) {
      setFormError("Original file exceeds the 10 MB input limit. Please select a smaller file.");
      return;
    }

    processAndCompressImage(file);
  };

  // Upload Compressed Image & Insert Metadata
  const handleUploadImage = async () => {
    setFormError(null);
    setSuccessMessage(null);

    if (!compressedBlob) {
      setFormError("Please select and process an image file first.");
      return;
    }

    if (!altText.trim()) {
      setFormError("Alt text is required for accessibility.");
      return;
    }

    if (displayOrder < 0 || !Number.isInteger(Number(displayOrder))) {
      setFormError("Display order must be a non-negative integer.");
      return;
    }

    setIsUploading(true);

    const imageUuid = self.crypto.randomUUID();
    const storagePath = `projects/${projectId}/${imageUuid}.webp`;

    try {
      // Step 1: Upload compressed WebP to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(storagePath, compressedBlob, {
          contentType: "image/webp",
          upsert: false,
        });

      if (uploadError) {
        console.warn("Storage upload notice: Upload rejected by storage RLS or bucket settings.");
        setFormError("Failed to upload image object to Storage. Please check admin permissions.");
        setIsUploading(false);
        return;
      }

      // Step 2: Insert image metadata record into public.project_images
      const { error: metaError } = await supabase
        .from("project_images")
        .insert([
          {
            project_id: projectId,
            storage_path: storagePath,
            alt_text: altText.trim(),
            caption: caption.trim() || null,
            display_order: Number(displayOrder),
            is_cover: false, // Newly uploaded images use is_cover = false per spec
          },
        ]);

      if (metaError) {
        console.warn("Metadata insert notice: Rolling back storage object after DB insert error.");
        // Rollback Cleanup: Delete uploaded storage object if metadata row insert fails
        await supabase.storage.from("portfolio-images").remove([storagePath]);

        if (metaError.code === "23505" || metaError.message.includes("check")) {
          setFormError("Failed to save image metadata due to database constraint violation. Upload cleaned up.");
        } else {
          setFormError("Failed to save image metadata record. Storage upload rolled back safely.");
        }
        setIsUploading(false);
        return;
      }

      // Step 3: Success Cleanup & Gallery Refresh
      setSuccessMessage("Project image uploaded successfully!");
      setSelectedFile(null);
      setCompressedBlob(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setAltText("");
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchImages();
    } catch {
      setFormError("An unexpected error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete Image Action
  const handleDeleteImage = async (imgRow: ProjectImageRow) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this project image (${imgRow.alt_text})?`
    );
    if (!confirmed) return;

    setDeletingId(imgRow.id);
    setFormError(null);

    try {
      // 1. Delete object from Supabase Storage
      const { error: storageErr } = await supabase.storage
        .from("portfolio-images")
        .remove([imgRow.storage_path]);

      if (storageErr) {
        console.warn("Storage object delete notice.");
      }

      // 2. Delete database metadata record
      const { error: dbErr } = await supabase
        .from("project_images")
        .delete()
        .eq("id", imgRow.id);

      if (dbErr) {
        setFormError("Failed to delete image record from database.");
      } else {
        setSuccessMessage("Image deleted successfully.");
        await fetchImages();
      }
    } catch {
      setFormError("Network error occurred while deleting image.");
    } finally {
      setDeletingId(null);
    }
  };

  // Set Primary Cover Image via Atomic Database RPC
  const handleSetCover = async (imgRow: ProjectImageRow) => {
    if (imgRow.is_cover) return;

    const confirmed = window.confirm(
      `Set "${imgRow.alt_text}" as the primary cover image for this project?`
    );
    if (!confirmed) return;

    setSettingCoverId(imgRow.id);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const { error: rpcError } = await supabase.rpc("set_project_cover", {
        p_project_id: projectId,
        p_image_id: imgRow.id,
      });

      if (rpcError) {
        console.warn("RPC set_project_cover notice: Operation failed.");
        setFormError("Failed to update project primary cover image. Please check admin permissions.");
      } else {
        setSuccessMessage(`"${imgRow.alt_text}" is now set as the primary cover image!`);
        await fetchImages();
      }
    } catch {
      setFormError("An unexpected error occurred while setting primary cover image.");
    } finally {
      setSettingCoverId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      className="rounded-2xl p-5 flex flex-col gap-5 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.07)]"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between border-b border-[rgba(246,247,237,0.08)] pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#dbe64c] flex items-center gap-2">
          <ImageIcon size={16} /> 6. Project Gallery & Image Upload
        </h3>
        <span className="text-[10px] text-gray-400 font-mono">
          Bucket: portfolio-images (WebP Optimized)
        </span>
      </div>

      {/* Gallery Alert Notifications */}
      {fetchError && (
        <div className="rounded-xl p-3 flex items-center gap-2 bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {formError && (
        <div className="rounded-xl p-3 flex items-center gap-2 bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl p-3 flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs">
          <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Existing Images Gallery */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-semibold text-white uppercase tracking-wide flex items-center gap-1.5">
          <span>Existing Project Images</span>
          <span className="px-2 py-0.5 rounded-full bg-[rgba(219,230,76,0.15)] text-[#dbe64c] text-[10px] font-bold">
            {images.length}
          </span>
        </h4>

        {loading ? (
          <div className="py-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
            <RefreshCw size={14} className="animate-spin text-[#dbe64c]" />
            <span>Loading gallery images...</span>
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-xl p-6 text-center bg-[rgba(0,31,63,0.2)] border border-[rgba(246,247,237,0.05)] text-gray-400 text-xs">
            No images uploaded yet. Use the upload section below to add portfolio screenshots.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="rounded-xl p-3 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.08)] flex flex-col justify-between gap-3 relative group overflow-hidden"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-[rgba(246,247,237,0.05)]">
                  <img
                    src={img.public_url}
                    alt={img.alt_text}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[#dbe64c] text-[9px] font-bold border border-white/10">
                    Order #{img.display_order}
                  </span>
                  {img.is_cover && (
                    <span
                      aria-label="Primary project cover image"
                      className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#dbe64c] text-midnight text-[9px] font-extrabold uppercase flex items-center gap-1 shadow-md border border-black/20"
                    >
                      <Star size={10} className="fill-midnight" /> Primary Cover
                    </span>
                  )}
                </div>

                {/* Metadata Details */}
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-white line-clamp-1" title={img.alt_text}>
                    {img.alt_text}
                  </p>
                  {img.caption && (
                    <p className="text-[10px] text-gray-400 line-clamp-1" title={img.caption}>
                      {img.caption}
                    </p>
                  )}
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5 line-clamp-1">
                    {img.storage_path}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 border-t border-[rgba(246,247,237,0.06)] pt-2.5">
                  <span className="sr-only">
                    {img.is_cover
                      ? `Image ${img.alt_text} is currently set as the primary cover image for this project.`
                      : `Image ${img.alt_text} is not the primary cover image.`}
                  </span>

                  <div className="flex items-center justify-between gap-2">
                    {img.is_cover ? (
                      <button
                        type="button"
                        disabled
                        aria-pressed={true}
                        title="Current primary cover image for this project"
                        className="text-[10px] text-midnight font-extrabold flex items-center gap-1 bg-[#dbe64c] px-2.5 py-1 rounded-lg border border-[#dbe64c] cursor-default opacity-90 focus:outline-none focus:ring-2 focus:ring-[#dbe64c]"
                      >
                        <Star size={12} className="fill-midnight" />
                        <span>Current Cover</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetCover(img)}
                        disabled={settingCoverId !== null || deletingId !== null || isUploading}
                        aria-pressed={false}
                        title={`Set "${img.alt_text}" as primary cover`}
                        className="text-[10px] text-[#dbe64c] hover:text-white font-semibold flex items-center gap-1 bg-[rgba(219,230,76,0.12)] hover:bg-[rgba(219,230,76,0.25)] px-2.5 py-1 rounded-lg border border-[rgba(219,230,76,0.3)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#dbe64c] focus:ring-offset-1 focus:ring-offset-midnight disabled:opacity-40"
                      >
                        {settingCoverId === img.id ? (
                          <>
                            <RefreshCw size={12} className="animate-spin" />
                            <span>Setting Cover...</span>
                          </>
                        ) : (
                          <>
                            <Star size={12} />
                            <span>Set as Cover</span>
                          </>
                        )}
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={img.public_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[rgba(219,230,76,0.8)] hover:text-[#dbe64c] font-semibold flex items-center gap-1 focus:outline-none focus:underline"
                      >
                        <Eye size={12} /> View
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        disabled={deletingId === img.id || settingCoverId !== null}
                        className="text-[10px] text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 bg-red-950/30 hover:bg-red-950/60 px-2 py-1 rounded-lg border border-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-40"
                      >
                        <Trash2 size={12} />
                        <span>{deletingId === img.id ? "Deleting..." : "Delete"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Container (Non-form container to prevent DOM nesting warnings) */}
      <div className="flex flex-col gap-4 border-t border-[rgba(246,247,237,0.08)] pt-4 mt-2">
        <h4 className="text-[11px] font-semibold text-white uppercase tracking-wide flex items-center gap-1.5">
          <Upload size={14} className="text-[#dbe64c]" />
          <span>Upload New Project Image</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* File Picker & Compression Processing Box */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">
                Select Image (JPEG, PNG, WebP $\le 10$ MB) <span className="text-red-400">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isCompressing || isUploading}
                className="rounded-xl p-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#dbe64c] file:text-midnight hover:file:bg-[#c9d43b] transition-colors"
              />
            </div>

            {/* Compression Processing Indicator */}
            {isCompressing && (
              <div className="p-3 rounded-xl bg-[rgba(0,31,63,0.4)] border border-[rgba(219,230,76,0.2)] flex items-center gap-2 text-xs text-[#dbe64c]">
                <RefreshCw size={14} className="animate-spin shrink-0" />
                <span>Resizing & converting image to optimized WebP...</span>
              </div>
            )}

            {/* WebP Preview & Statistics */}
            {previewUrl && !isCompressing && (
              <div className="p-3 rounded-xl bg-[rgba(0,31,63,0.5)] border border-[rgba(219,230,76,0.25)] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white border-b border-[rgba(246,247,237,0.08)] pb-1.5">
                  <span className="flex items-center gap-1 text-[#dbe64c]">
                    <Sparkles size={12} /> WebP Compressed Preview
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    -{compressionRatio}% Size Reduced
                  </span>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/60 border border-white/10">
                  <img src={previewUrl} alt="Compressed preview" className="w-full h-full object-contain" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded-lg bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.06)]">
                    <span className="text-gray-400 block">Original Input:</span>
                    <span className="text-white font-bold">{formatFileSize(originalSize)}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[rgba(0,128,76,0.15)] border border-[rgba(0,128,76,0.3)]">
                    <span className="text-emerald-300 block">Compressed WebP:</span>
                    <span className="text-[#dbe64c] font-bold">{formatFileSize(compressedSize)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metadata Form Inputs */}
          <div className="flex flex-col gap-3">
            {/* Alt Text */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">
                Alt Text (Accessibility) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. eBro LoRa IoT Gateway and Sensor Node Diagram"
                disabled={isUploading || isCompressing}
                className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c]"
              />
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">Caption (Optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Architecture topology for climate monitoring"
                disabled={isUploading || isCompressing}
                className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dbe64c]"
              />
            </div>

            {/* Display Order */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">
                Display Order <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                disabled={isUploading || isCompressing}
                className="rounded-xl px-3.5 py-2.5 bg-[rgba(0,31,63,0.4)] border border-[rgba(246,247,237,0.12)] text-xs text-white focus:outline-none focus:border-[#dbe64c]"
              />
            </div>

            {/* Upload Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={!compressedBlob || isUploading || isCompressing}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-midnight bg-[#dbe64c] hover:bg-[#c9d43b] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Upload size={14} />
                <span>{isUploading ? "Uploading & Saving Metadata..." : "Upload Image to Portfolio"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
