export function convertBytes(bytes: any) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

export function bytesToKB(bytes: any) {
  const kilobytes = bytes / 1024;
  return kilobytes;
}
