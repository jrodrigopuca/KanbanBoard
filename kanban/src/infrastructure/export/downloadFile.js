export const triggerFileDownload = ({
    content,
    fileName,
    mimeType,
    documentRef = typeof document === "undefined" ? null : document,
    urlRef = typeof URL === "undefined" ? null : URL,
}) => {
    if (!documentRef || !urlRef?.createObjectURL) {
        return false;
    }

    const blob = new Blob([content], { type: mimeType });
    const downloadUrl = urlRef.createObjectURL(blob);
    const link = documentRef.createElement("a");

    link.href = downloadUrl;
    link.download = fileName;
    documentRef.body.appendChild(link);
    link.click();
    documentRef.body.removeChild(link);
    urlRef.revokeObjectURL?.(downloadUrl);

    return true;
};
