import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Trash2, 
  CornerDownLeft, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Cpu, 
  Zap,
  HelpCircle,
  Play
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface InteractiveConsoleStudioProps {
  theme: ThemeMode;
}

interface CommandOutput {
  id: string;
  cmd: string;
  timestamp: string;
  type?: 'standard' | 'benchmark' | 'matrix' | 'error' | 'success';
  content: React.ReactNode;
}

export const InteractiveConsoleStudio: React.FC<InteractiveConsoleStudioProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      cmd: 'whoami',
      timestamp: '13:00:01',
      type: 'standard',
      content: (
        <div className="space-y-1 text-xs">
          <div className="font-semibold text-blue-400">Nikita Bhansali</div>
          <div className="text-slate-300">
            AI/ML & Embedded Systems Engineer · B.Tech Electronics & Communication (VIT Bhopal, CGPA: 8.48)
          </div>
          <div className="text-slate-400 text-[11px]">
            Specializing in Deep Learning, Computer Vision, Edge Neural Inference, HackRF One SDR, and FreeRTOS Firmware.
          </div>
        </div>
      )
    },
    {
      id: 'init-2',
      cmd: 'status --hardware',
      timestamp: '13:00:02',
      type: 'success',
      content: (
        <div className="text-xs space-y-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span>HackRF One SDR: <strong className="text-emerald-400">READY (1MHz - 6GHz)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span>ESP32 Dual-Core RTOS: <strong className="text-emerald-400">CONNECTED</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
            <span>PyTorch / TensorRT Neural Core: <strong className="text-blue-400">ACTIVE</strong></span>
          </div>
        </div>
      )
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>(['whoami', 'status --hardware']);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBenchmarking]);

  const handleCommandExecution = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Add to history navigation
    setCmdHistoryList((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const lower = trimmed.toLowerCase();
    const cmdId = `cmd-${Date.now()}`;

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help' || lower === '?') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-2 text-xs">
            <div className="text-blue-400 font-semibold">Nikita Bhansali Engineering REPL v2.4</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
              <div><code className="text-emerald-400 font-bold">whoami</code> - Profile, Degree & Focus</div>
              <div><code className="text-emerald-400 font-bold">skills</code> - Full ML & Hardware Stack</div>
              <div><code className="text-emerald-400 font-bold">projects</code> - Top Engineering Repositories</div>
              <div><code className="text-emerald-400 font-bold">experience</code> - Roles, Leadership & Impact</div>
              <div><code className="text-emerald-400 font-bold">certs</code> - Verified Credentials & ISRO</div>
              <div><code className="text-emerald-400 font-bold">contact</code> - Email, Phone & Socials</div>
              <div><code className="text-emerald-400 font-bold">benchmark</code> - Run Edge Inference Speed Test</div>
              <div><code className="text-emerald-400 font-bold">clear</code> - Reset Terminal Screen</div>
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'whoami') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="font-bold text-white text-sm">Nikita Bhansali</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Dual-core engineer bridging the divide between high-dimensional Deep Learning and physical silicon. 
              Experienced in building computer vision models, continuous-control reinforcement learning agents, and hardware-accelerated RF communication pipelines.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">VIT Bhopal</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">CGPA: 8.48 / 10</span>
              <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">Open for Engineering Roles</span>
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'skills') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-blue-400 font-semibold">Technical Stack Breakdown:</div>
            <div className="space-y-1 text-[11px]">
              <div><strong className="text-emerald-400">AI / Deep Learning:</strong> PyTorch, TensorFlow, OpenCV, Deep RL (DQN), CNNs, Scikit-Learn, NumPy, Pandas</div>
              <div><strong className="text-blue-400">Embedded & Silicon:</strong> HackRF One SDR, ESP32, Arduino, ARM Cortex, FreeRTOS, MicroPython, I2C/SPI/UART</div>
              <div><strong className="text-amber-400">Programming Languages:</strong> Python, C, C++, Embedded C, SQL, MATLAB, Bash</div>
              <div><strong className="text-violet-400">Developer Tooling:</strong> Git/GitHub, Linux (Ubuntu), Docker, Jupyter, PlatformIO, VS Code</div>
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'projects') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-blue-400 font-semibold">Featured Engineering Projects:</div>
            <div className="space-y-2 text-[11px]">
              {PROJECTS.slice(0, 3).map((p, idx) => (
                <div key={p.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">{idx + 1}. {p.title}</span>
                    <span className="text-blue-400 font-mono text-[10px]">{p.categoryLabel || p.category}</span>
                  </div>
                  <p className="text-slate-400 text-[10px] mt-0.5">{p.subtitle || p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[9px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'experience') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-blue-400 font-semibold">Professional Roles & Leadership:</div>
            <div className="space-y-1 text-[11px]">
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800">
                <div className="font-bold text-slate-200">IEEE Computer Society Student Branch</div>
                <div className="text-emerald-400 text-[10px]">Technical Lead & ML Project Contributor</div>
                <div className="text-slate-400 text-[10px] mt-0.5">
                  Spearheaded hackathon initiatives, mentored junior members in Python/ML pipelines, and conducted hands-on technical workshops.
                </div>
              </div>
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'certs') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-blue-400 font-semibold">Honors & Verified Certifications:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id}>
                  <strong className="text-slate-200">{c.title}</strong> — <span className="text-blue-400">{c.issuer}</span> ({c.year})
                </li>
              ))}
            </ul>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'contact') {
      const output: CommandOutput = {
        id: cmdId,
        cmd: trimmed,
        timestamp: timeStr,
        content: (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-blue-400 font-semibold">Direct Communication Channels:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <a 
                href={`mailto:${PERSONAL_INFO.contact.email}`} 
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors"
              >
                <span>Email: {PERSONAL_INFO.contact.email}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={PERSONAL_INFO.contact.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors"
              >
                <span>LinkedIn: in/nikitabhansali</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={PERSONAL_INFO.contact.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-slate-200 hover:text-blue-400 transition-colors"
              >
                <span>GitHub: nikitaaaa123</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Phone: {PERSONAL_INFO.contact.phone}
              </div>
            </div>
          </div>
        )
      };
      setHistory((prev) => [...prev, output]);
      setInputVal('');
      return;
    }

    if (lower === 'benchmark') {
      setIsBenchmarking(true);
      setInputVal('');
      
      setTimeout(() => {
        setIsBenchmarking(false);
        const output: CommandOutput = {
          id: cmdId,
          cmd: 'benchmark --model resnet50 --target onnx-fp16',
          timestamp: timeStr,
          type: 'benchmark',
          content: (
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="text-emerald-400 font-bold">
                ✓ Inference Benchmark Completed (Edge Testbench)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Latency (avg)</div>
                  <div className="text-emerald-400 font-bold">4.12 ms</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Throughput</div>
                  <div className="text-blue-400 font-bold">242.7 FPS</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Quantization</div>
                  <div className="text-violet-400 font-bold">FP16 / INT8</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">Memory Peak</div>
                  <div className="text-amber-400 font-bold">142 MB</div>
                </div>
              </div>
            </div>
          )
        };
        setHistory((prev) => [...prev, output]);
      }, 1200);
      return;
    }

    // Default unrecognized command
    const output: CommandOutput = {
      id: cmdId,
      cmd: trimmed,
      timestamp: timeStr,
      type: 'error',
      content: (
        <div className="text-xs text-rose-400">
          command not found: <span className="font-bold text-white">'{trimmed}'</span>. Type <span className="text-emerald-400 font-bold cursor-pointer underline" onClick={() => handleCommandExecution('help')}>'help'</span> for a list of valid commands.
        </div>
      )
    };
    setHistory((prev) => [...prev, output]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandExecution(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length > 0) {
        const nextPointer = historyPointer === -1 ? cmdHistoryList.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPointer);
        setInputVal(cmdHistoryList[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextPointer = historyPointer + 1;
        if (nextPointer >= cmdHistoryList.length) {
          setHistoryPointer(-1);
          setInputVal('');
        } else {
          setHistoryPointer(nextPointer);
          setInputVal(cmdHistoryList[nextPointer]);
        }
      }
    }
  };

  return (
    <div className={`w-full rounded-2xl border transition-all overflow-hidden shadow-2xl ${
      isDark 
        ? 'bg-[#0a0e14]/95 border-slate-800 shadow-black/60' 
        : 'bg-white/95 border-slate-200 shadow-slate-300/40'
    }`}>
      {/* Terminal Window Chrome / Header */}
      <div className={`px-4 py-3 border-b flex items-center justify-between gap-3 ${
        isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span className={isDark ? 'text-slate-300 font-semibold' : 'text-slate-700 font-semibold'}>
              nikita@portfolio-repl: ~
            </span>
          </div>
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
            }`}
            title="Clear terminal screen (command: clear)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Body Screen */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className={`p-4 sm:p-5 h-[290px] overflow-y-auto font-mono text-xs cursor-text space-y-3 ${
          isDark ? 'bg-[#070b10] text-slate-200' : 'bg-slate-950 text-slate-100'
        }`}
      >
        {/* Welcome message banner */}
        <div className="text-[11px] text-slate-500 pb-2 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <span>Type <strong className="text-emerald-400">'help'</strong> to inspect commands, or click the quick tags below.</span>
          <span className="text-slate-600">bash 5.2.15(1)-release</span>
        </div>

        {/* History stream */}
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-400 font-bold">nikita@engineer:~$</span>
              <span className="text-white font-semibold">{item.cmd}</span>
              <span className="text-slate-600 text-[10px] ml-auto">{item.timestamp}</span>
            </div>
            <div className="pl-4 border-l-2 border-slate-800/70 py-0.5">
              {item.content}
            </div>
          </div>
        ))}

        {/* In-progress benchmark spinner animation */}
        {isBenchmarking && (
          <div className="flex items-center gap-2 text-xs text-amber-400 py-1 font-mono">
            <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>Compiling ONNX model graph & executing 1,000 inference passes...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips & Input Form */}
      <div className={`p-3 border-t space-y-2.5 ${
        isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        {/* Quick Execution Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Quick:
          </span>
          {[
            { label: 'whoami', cmd: 'whoami' },
            { label: 'skills', cmd: 'skills' },
            { label: 'projects', cmd: 'projects' },
            { label: 'experience', cmd: 'experience' },
            { label: 'certs', cmd: 'certs' },
            { label: 'contact', cmd: 'contact' },
            { label: 'benchmark', cmd: 'benchmark' },
            { label: 'help', cmd: 'help' }
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleCommandExecution(btn.cmd)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white' 
                  : 'bg-white border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 shadow-sm'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Live Input Field */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 focus-within:border-blue-500' 
            : 'bg-white border-slate-200 focus-within:border-blue-500 shadow-sm'
        }`}>
          <span className="text-emerald-500 font-bold">nikita@engineer:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'projects', or 'benchmark'..."
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-slate-200 placeholder:text-slate-500"
          />
          <button
            onClick={() => handleCommandExecution(inputVal)}
            disabled={!inputVal.trim()}
            className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
              inputVal.trim() 
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-md shadow-blue-500/20' 
                : 'text-slate-600 cursor-not-allowed opacity-50'
            }`}
            title="Execute Command (Press Enter)"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
