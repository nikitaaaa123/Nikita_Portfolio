import { useState } from "react";

export default function ResumeDownloadButton() {
  const [selected, setSelected] = useState("aiml"); // "aiml" or "ece"

  const handleDownload = () => {
    // Create an invisible HTML anchor tag
    const link = document.createElement("a");
    
    // Set the path to match the exact files in your public folder
    if (selected === "aiml") {
      link.href = "/nikita_aiml_resume.pdf";
      link.download = "nikita_aiml_resume.pdf";
    } else {
      link.href = "/Nikita_ECE_Resume.pdf";
      link.download = "Nikita_ECE_Resume.pdf";
    }
    
    // Append to body, click to trigger download, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "6px" }}
      >
        <option value="aiml">AI/ML Resume</option>
        <option value="ece">ECE Resume</option>
      </select>
      <button onClick={handleDownload} style={{ padding: "8px 16px", borderRadius: "6px" }}>
        Download Resume
      </button>
    </div>
  );
}