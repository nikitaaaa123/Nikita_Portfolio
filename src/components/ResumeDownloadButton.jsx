import { useState } from "react";

export default function ResumeDownloadButton() {
  const [selected, setSelected] = useState("aiml"); // "aiml" or "ece"

  const handleDownload = () => {
    // Create an invisible HTML anchor tag
    const link = document.createElement("a");
    
    // Set the path to match the exact files in the public folder
    if (selected === "aiml") {
      link.href = "/Nikita_Bhansali_Resume.pdf";
      link.download = "Nikita_Bhansali_Resume.pdf";
    } else {
      link.href = "/Nikita_Bhansali_Resume_Embedded_RF.pdf";
      link.download = "Nikita_Bhansali_Resume_Embedded_RF.pdf";
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
