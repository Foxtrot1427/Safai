export const videoMimeTypes = {
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  wmv: "video/x-ms-wmv",
  flv: "video/x-flv",
  webm: "video/webm",
};

export const pdfMimeTypes = {
  pdf: "application/pdf",
};

export const slideMimeTypes = {
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  svg: "image/svg+xml",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  xml: "application/xml",
  zip: "application/zip",
  tar: "application/x-tar",
  gz: "application/gzip",
  ...videoMimeTypes,
  ...slideMimeTypes,
  ...pdfMimeTypes,
  // Add more extensions and MIME types as needed
};

export function getMimeTypeFromExtension(extension: string) {
  // Convert the extension to lowercase for case-insensitive matching
  extension = extension.toLowerCase();

  // Check if the extension exists in the mimeTypes object
  if (extension in mimeTypes) {
    return mimeTypes[extension as keyof typeof mimeTypes];
  } else {
    return "application/octet-stream"; // Default MIME type for unknown extensions
  }
}
