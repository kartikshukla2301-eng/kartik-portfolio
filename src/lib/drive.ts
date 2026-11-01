export interface ParsedDriveUrl {
  isValid: boolean;
  fileId: string | null;
  previewUrl: string | null;
  viewUrl: string | null;
  downloadUrl: string | null;
  rawUrl: string;
}

/**
 * Safely parses and validates a Google Drive sharing URL.
 * Extracts the file ID if present and generates preview, view, and direct download links.
 * Returns isValid: false for empty links or placeholder strings like [ADD_...].
 */
export function parseGoogleDriveUrl(url?: string | null): ParsedDriveUrl {
  const emptyResult: ParsedDriveUrl = {
    isValid: false,
    fileId: null,
    previewUrl: null,
    viewUrl: null,
    downloadUrl: null,
    rawUrl: "",
  };

  if (!url || typeof url !== "string") {
    return emptyResult;
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed.includes("[ADD_") || trimmed === "#") {
    return emptyResult;
  }

  // Google Drive standard patterns:
  // /file/d/FILE_ID/view, /file/d/FILE_ID/preview, /file/d/FILE_ID
  // ?id=FILE_ID or &id=FILE_ID
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const matchQueryId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  const fileId = matchFileD ? matchFileD[1] : matchQueryId ? matchQueryId[1] : null;

  if (fileId && (trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com"))) {
    return {
      isValid: true,
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      viewUrl: `https://drive.google.com/file/d/${fileId}/view`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
      rawUrl: trimmed,
    };
  }

  // Fallback for valid external web URLs
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return {
        isValid: true,
        fileId: null,
        previewUrl: null,
        viewUrl: trimmed,
        downloadUrl: null,
        rawUrl: trimmed,
      };
    }
  } catch {
    // Malformed URL
  }

  return emptyResult;
}

