import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Brain, 
  Radio, 
  FileText, 
  Phone,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'aiml' | 'embedded';
  theme: ThemeMode;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialType = 'aiml',
  theme,
}) => {
  const [resumeType, setResumeType] = useState<'aiml' | 'embedded'>(initialType);

  // Sync initial type when opening
  React.useEffect(() => {
    if (initialType) {
      setResumeType(initialType);
    }
  }, [initialType]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isAiml = resumeType === 'aiml';

  // Exact file paths pulling from the public folder
  const fileName = isAiml ? 'Nikita_Bhansali_Resume.pdf' : 'Nikita_Bhansali_Resume_Embedded_RF.pdf';
  const filePath = isAiml ? '/Nikita_Bhansali_Resume.pdf' : '/Nikita_Bhansali_Resume_Embedded_RF.pdf';

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(filePath, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="resume-print-wrapper"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl transition-all max-h-[94vh] flex flex-col overflow-hidden ${
          isDark ? 'bg-[#0e1420] border-slate-700/80 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-700/40 shrink-0 bg-slate-900/95 text-white">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-semibold truncate">
              Nikita Bhansali — Official Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle Specialization */}
            <div className="flex rounded-lg p-0.5 bg-slate-800 border border-slate-700 text-xs font-mono">
              <button
                onClick={() => setResumeType('aiml')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAiml ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI/ML Resume</span>
                <span className="sm:hidden">AI/ML</span>
              </button>
              <button
                onClick={() => setResumeType('embedded')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isAiml ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Embedded / RF Resume</span>
                <span className="sm:hidden">Embedded</span>
              </button>
            </div>

            {/* Print / Open Button */}
            <button
              id="resume-print-btn"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title="Open exact PDF in browser to print"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline text-[11px]">Print</span>
            </button>

            {/* Direct Download Button */}
            <button
              id="resume-download-btn"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm cursor-pointer"
              title={`Download exact ${fileName} file`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Document Body (Identical Visual & Typographic Representation) */}
        <div 
          id="resume-printable-content"
          className="overflow-y-auto p-6 sm:p-10 space-y-4 text-black bg-white selection:bg-slate-200 font-serif leading-relaxed"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {/* Header Block */}
          <div className="text-center pb-2 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-black font-serif">
              NIKITA BHANSALI
            </h1>
            
            <div className="contacts-bar flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-black">
              <a href="tel:+918585804977" className="flex items-center gap-1 hover:underline text-black">
                <Phone className="w-3 h-3" />
                +91-8585804977
              </a>
              <a href="mailto:nbhansali2006@gmail.com" className="flex items-center gap-1 hover:underline text-black">
                <Mail className="w-3 h-3" />
                nbhansali2006@gmail.com
              </a>
              <a 
                href="https://linkedin.com/in/nikitabhansali" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 hover:underline text-black"
              >
                <Linkedin className="w-3 h-3" />
                linkedin.com/in/nikitabhansali
              </a>
              <a 
                href="https://github.com/nikitaaaa123" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 hover:underline text-black"
              >
                <Github className="w-3 h-3" />
                github.com/nikitaaaa123
              </a>
            </div>
          </div>

          {/* Summary (AI/ML ONLY) */}
          {isAiml && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
                Summary
              </h2>
              <p className="text-xs text-black leading-snug text-justify">
                AI/ML enthusiast and Electronics & Communication Engineering undergraduate with hands-on experience building machine learning and deep learning solutions, including NLP-driven chatbots and computer-vision-based diagnostic systems. Skilled in Python, applied ML, and full-stack integration, with a strong track record across hackathons and competitive problem solving.
              </p>
            </div>
          )}

          {/* Education */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <strong className="text-black">Vellore Institute of Technology</strong>
              <strong className="text-black">2023 – 2027</strong>
            </div>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="italic">Bachelor of Technology in Electronics and Communication Engineering; </span>
                <strong className="text-black">CGPA:8.48</strong>
              </div>
              <span className="italic text-black">Bhopal, India</span>
            </div>
          </div>

          {/* Skill Set */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Skill Set
            </h2>
            <div className="text-xs space-y-1 text-black">
              {!isAiml ? (
                <>
                  <div>
                    <strong>Embedded Systems & Hardware:</strong> ESP32/ESP32-CAM, Arduino IDE, Microcontroller Programming, Sensor Interfacing (DHT11, PIR), Relay & Actuator Control, Circuit Design
                  </div>
                  <div>
                    <strong>RF & Signal Processing:</strong> Software Defined Radio (RTL-SDR, HackRF), GNU Radio, FFT/Spectrum Analysis, Antenna Design (Yagi-Uda, Helical), RF Synthesizers (ADF4351), CST Studio/HFSS
                  </div>
                  <div>
                    <strong>Languages:</strong> C, C++, Python, Java, SQL, HTML/CSS, JavaScript
                  </div>
                  <div>
                    <strong>AI/ML & Dev Tools:</strong> Machine Learning, Deep Learning, Computer Vision, TensorFlow, Scikit-learn, Git/GitHub, Django, React Native, MERN Stack
                  </div>
                  <div>
                    <strong>Databases:</strong> MySQL, MongoDB
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Languages:</strong> Java, Python, C, C++, SQL, HTML/CSS, JavaScript
                  </div>
                  <div>
                    <strong>AI/ML:</strong> Machine Learning, Deep Learning, NLP, Computer Vision, Scikit-learn, TensorFlow, Pandas, NumPy
                  </div>
                  <div>
                    <strong>Developer Tools:</strong> Git/GitHub, VS Code, Django, React Native, MERN Stack
                  </div>
                  <div>
                    <strong>Databases:</strong> MySQL, MongoDB
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Internship */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Internship
            </h2>
            <div className="text-xs space-y-0.5">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong>MPOnline (Government of MP)</strong> | <span className="italic">AI/ML & Advanced Software Engineering Internship</span>
                </div>
                <strong>May 2026 – Jul 2026</strong>
              </div>
              <div className="space-y-0.5 text-black">
                <p className="leading-tight">-Built ML models (regression, classification, decision trees, random forest, SVM, clustering, PCA) using Python, NumPy, Pandas, and Scikit-learn, and developed neural networks with TensorFlow/PyTorch for computer vision and NLP.</p>
                <p className="leading-tight">-Practiced full-stack SDLC: DBMS, SQL, OOP, Git/GitHub, and CRUD app development, followed by requirement analysis, system design, backend development, testing, and cloud deployment for a capstone project.</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Projects
            </h2>
            
            {isAiml ? (
              <>
                {/* Vital Vision */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>Vital Vision</strong> | <span className="italic">NLP, MERN Stack, Python</span>
                    </div>
                    <a
                      href="https://github.com/nikitaaaa123/VitalVision"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-black hover:text-blue-700 cursor-pointer"
                    >
                      GitHub
                    </a>
                  </div>
                  <p className="leading-tight">-Developed an AI-powered medical chatbot that analyzes user-reported symptoms and prioritizes triage responses to help patients access appropriate care faster.</p>
                  <p className="leading-tight">-Built using NLP for symptom analysis, the MERN Stack for the web application, and a Python backend integrated with a Geolocation API for real-time appointment booking.</p>
                  <p className="leading-tight">-Researched intent-classification and symptom-severity triage techniques to improve the accuracy and reliability of chatbot recommendations.</p>
                </div>

                {/* OralCancer MedTech */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>OralCancer MedTech</strong> | <span className="italic">Deep Learning, Django, React Native</span>
                    </div>
                    <a
                      href="https://github.com/nikitaaaa123/HealthHack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-black hover:text-blue-700 cursor-pointer"
                    >
                      GitHub
                    </a>
                  </div>
                  <p className="leading-tight">-Built a mobile-based screening tool for early-stage oral cancer detection to improve accessibility to preliminary diagnosis.</p>
                  <p className="leading-tight">-Built using a CNN-based Deep Learning model, React Native for the cross-platform mobile app, and a Django REST API backend.</p>
                  <p className="leading-tight">-Researched CNN architectures and data augmentation strategies to achieve 97.8% detection accuracy.</p>
                </div>

                {/* Smart Surveillance */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>Smart Surveillance for Public Transport</strong> | <span className="italic">Computer Vision, AI</span>
                    </div>
                  </div>
                  <p className="leading-tight">-Built a real-time monitoring system for public transport to detect anomalies and enhance passenger safety.</p>
                  <p className="leading-tight">-Built using OpenCV and YOLO for real-time object detection and video analysis.</p>
                  <p className="leading-tight">-Researched anomaly-detection models and optimized YOLO inference for real-time performance on live video feeds.</p>
                </div>
              </>
            ) : (
              <>
                {/* Anti-Drone */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>Anti-Drone System using SDR</strong> | <span className="italic">SDR, RF Systems, Embedded Design</span>
                    </div>
                  </div>
                  <p className="leading-tight">-Real-time anti-drone detection system monitoring the 2.4 GHz/5.8 GHz ISM bands to identify FHSS control signals from commercial drones, for campus perimeter security and anti-UAV surveillance.</p>
                  <p className="leading-tight">-Built using an RTL-SDR/HackRF for spectrum sensing, an ESP32-S3 for target identification, an ADF4351 RF synthesizer for interference generation, and directional antennas; implemented in GNU Radio and Python (PySDR).</p>
                  <p className="leading-tight">-Researched FFT-based signal detection and simulated Yagi-Uda/Helical antennas in CST Studio/HFSS to focus jamming energy and minimize side-band interference.</p>
                </div>

                {/* Home Automation */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>Home Automation with LumaSync</strong> | <span className="italic">IoT, Embedded Systems, ESP32</span>
                    </div>
                  </div>
                  <p className="leading-tight">-IoT-based home automation and security system regulating room temperature, detecting motion, and capturing images of entrants, controllable via a local web dashboard and Google Assistant.</p>
                  <p className="leading-tight">-Built using an ESP32/ESP32-CAM, a DHT11 sensor, a PIR sensor, and a 4-channel relay module; developed a real-time dashboard (HTML/CSS/JS) and integrated Google Assistant via IFTTT.</p>
                  <p className="leading-tight">-Researched predictive, trend-based temperature control logic (dynamic hysteresis) to reduce overshoot and improve system responsiveness.</p>
                </div>

                {/* Smart Surveillance */}
                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>Smart Surveillance for Public Transport</strong> | <span className="italic">Computer Vision, Embedded AI</span>
                    </div>
                  </div>
                  <p className="leading-tight">-Real-time monitoring system for public transport to detect anomalies and enhance passenger safety.</p>
                  <p className="leading-tight">-Built using OpenCV and YOLO for real-time object detection and video analysis on embedded/edge hardware.</p>
                  <p className="leading-tight">-Researched anomaly-detection models and optimized YOLO inference for real-time performance on live feeds.</p>
                </div>
              </>
            )}
          </div>

          {/* Certifications */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Certifications
            </h2>
            <div className="text-xs space-y-0.5 text-black">
              <div className="flex justify-between items-baseline">
                <span><strong>Intro to Machine Learning – Kaggle</strong></span>
                <a href="https://www.kaggle.com/learn/certification/nikitabhansali/intro-to-machine-learning" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 cursor-pointer">[Link]</a>
              </div>
              <div className="flex justify-between items-baseline">
                <span><strong>Applied Machine Learning in Python – Coursera (University of Michigan)</strong></span>
                <a href="https://www.coursera.org/account/accomplishments/verify/93R5O917F72O" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 cursor-pointer">[Link]</a>
              </div>
              <div className="flex justify-between items-baseline">
                <span><strong>Agentblazer Champion 2026 – ServiceNow</strong></span>
                <a href="https://www.linkedin.com/posts/nikitabhansali_servicenow-agentblazer-ai-activity-7431693457171329024-5B8B" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 cursor-pointer">[Link]</a>
              </div>
              <div className="flex justify-between items-baseline">
                <span><strong>Health Hackathon 2026 – Johns Hopkins University Collaboration – Participation & Project Showcase</strong></span>
                <a href="https://www.linkedin.com/posts/nikitabhansali_healthhackathon2026-hopkinsmedicine-hackathon-activity-7431694294245367808-Vq-R" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 cursor-pointer">[Link]</a>
              </div>
              <div className="flex justify-between items-baseline">
                <span><strong>Health Hackathon 2025 – Johns Hopkins University Collaboration – Participation & Project Showcase</strong></span>
                <a href="https://www.linkedin.com/posts/nikitabhansali_healthhackathon2025-hopkinsmedicine-hackathon-activity-7431694830113824768-Vf2c" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 cursor-pointer">[Link]</a>
              </div>
            </div>
          </div>

          {/* Extracurricular */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-serif">
              Extracurricular
            </h2>
            <div className="text-xs space-y-0.5 text-black">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong>Competitive Programming:</strong> Solved 250+ problems on LeetCode; maintaining consistent coding streaks.
                </div>
                <a href="https://leetcode.com/u/qDJXspdhfc/" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 ml-2 shrink-0 cursor-pointer">[Link]</a>
              </div>
              <div>
                <strong>Open Source:</strong> Active contributor to GitHub projects focusing on AI/ML tools and web accessibility.
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <strong>Languages:</strong> Proficient in English, Hindi; learning Japanese and German (250+ day Duolingo streak).
                </div>
                <a href="https://www.duolingo.com/profile/nikittaaaa__" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-700 ml-2 shrink-0 cursor-pointer">[Link]</a>
              </div>
              <div>
                <strong>Leadership:</strong> Student Partner at IEEE and VITronix Club, organizing technical workshops for 1000+ students.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-700/40 bg-slate-900/95 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-sans text-xs">Direct static asset copy with working embedded links.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Open exact PDF in browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / View PDF</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title={`Download ${fileName}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
