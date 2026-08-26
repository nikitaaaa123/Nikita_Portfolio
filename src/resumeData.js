// Direct resume utilities pulling static PDFs from the public folder.

export const AIML_RESUME_PATH = "/Nikita_Bhansali_Resume.pdf";
export const ECE_RESUME_PATH = "/Nikita_Bhansali_Resume_Embedded_RF.pdf";

export const AIML_RESUME_FILENAME = "Nikita_Bhansali_Resume.pdf";
export const ECE_RESUME_FILENAME = "Nikita_Bhansali_Resume_Embedded_RF.pdf";

// Triggers local download of the static PDF file from the public folder
export function downloadResume(filePathOrType, filename) {
  const isAiml = filePathOrType === 'aiml' || filePathOrType === AIML_RESUME_PATH;
  const path = isAiml ? AIML_RESUME_PATH : (filePathOrType === 'embedded' || filePathOrType === 'ece' ? ECE_RESUME_PATH : (filePathOrType || AIML_RESUME_PATH));
  const targetName = filename || (isAiml ? AIML_RESUME_FILENAME : ECE_RESUME_FILENAME);

  const link = document.createElement("a");
  link.href = path;
  link.download = targetName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Opens the static PDF directly in a new browser tab for viewing/printing
export function openPdfBlob(filePathOrType) {
  const isAiml = filePathOrType === 'aiml' || filePathOrType === AIML_RESUME_PATH;
  const path = isAiml ? AIML_RESUME_PATH : ECE_RESUME_PATH;
  window.open(path, "_blank", "noopener,noreferrer");
}

