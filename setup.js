const fs = require('fs');
const path = require('path');

// Helper to write files and ensure the directory path exists
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Created: ${filePath}`);
}

console.log("Starting Student AI Mentor workspace generator...");

// ==========================================
// 1. BACKEND FILES
// ==========================================

// backend/package.json
writeFile('backend/package.json', `{
  "name": "student-ai-mentor-backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2"
  }
}`);

// backend/services/mentorService.js
writeFile('backend/services/mentorService.js', `
// MOCK — will be replaced with real model output / database query

const MOCK_STUDENTS = {
  S1: {
    student_id: "S1",
    student_name: "Alex",
    topic_scores: [
      { topic: "Entropy", score: 42 },
      { topic: "Kinematics", score: 88 },
      { topic: "Photosynthesis", score: 71 }
    ],
    weak_topics: [
      {
        topic: "Entropy",
        insight_type: "struggle",
        mentor_message: "You've scored below 50% on Entropy across your last 3 quizzes."
      }
    ]
  },
  S2: {
    student_id: "S2",
    student_name: "Jordan",
    topic_scores: [
      { topic: "Linear Algebra", score: 91 },
      { topic: "Calculus", score: 48 },
      { topic: "Probability", score: 82 }
    ],
    weak_topics: [
      {
        topic: "Calculus",
        insight_type: "struggle",
        mentor_message: "Calculus limits and derivatives have been challenging for you in recent assignments."
      }
    ]
  },
  S3: {
    student_id: "S3",
    student_name: "Taylor",
    topic_scores: [
      { topic: "Data Structures", score: 55 },
      { topic: "Algorithms", score: 45 },
      { topic: "Databases", score: 89 }
    ],
    weak_topics: [
      {
        topic: "Algorithms",
        insight_type: "struggle",
        mentor_message: "Asymptotic analysis and recursion are currently dragging down your performance."
      }
    ]
  }
};

/**
 * Retrieves educational progress metrics for a student by ID.
 * @param {string} studentId 
 */
export async function getStudentData(studentId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const student = MOCK_STUDENTS[studentId];
  if (!student) {
    throw new Error("Student with ID " + studentId + " not found.");
  }
  return student;
}
`);

// backend/services/documentService.js
writeFile('backend/services/documentService.js', `
// MOCK — will be replaced with real model output

const MOCK_BREAKDOWNS = {
  "Entropy": {
    breakdown: [
      {
        heading: "What is Entropy?",
        explanation: "Entropy is a measure of molecular disorder or randomness within a system. Consider a tidy room: without putting effort (energy) in to clean it, it naturally slides toward chaos. In thermodynamics, physical systems naturally move toward maximum chaos.",
        relevance_tag: "This relates to Q3 you got wrong about systems tending towards spontaneous disorder."
      },
      {
        heading: "The Second Law of Thermodynamics",
        explanation: "This fundamental law states that the total entropy of an isolated system always increases over time. Heat cannot spontaneously flow from a cooler body to a warmer body without external work.",
        relevance_tag: "This relates to Q5 regarding heat transfers and external work requirements."
      }
    ],
    quiz: [
      {
        question: "According to the Second Law of Thermodynamics, what happens to the total entropy of an isolated system over time?",
        options: [
          "It decreases",
          "It remains completely constant",
          "It always increases",
          "It fluctuates unpredictably"
        ],
        answer: "It always increases",
        explanation: "The Second Law dictates that the total entropy of an isolated system must increase over time, tending toward thermodynamic equilibrium (maximum disorder)."
      },
      {
        question: "Which of the following serves as a physical representation of a high-entropy state?",
        options: [
          "A neatly stacked deck of cards",
          "A scattered deck of cards all over the floor",
          "A frozen ice crystal at absolute zero",
          "A highly ordered crystalline structure"
        ],
        answer: "A scattered deck of cards all over the floor",
        explanation: "Entropy represents molecular disorder. A chaotic, scattered configuration contains higher entropy than a structured, highly organized state."
      }
    ]
  },
  "Calculus": {
    breakdown: [
      {
        heading: "Understanding the Derivative",
        explanation: "A derivative describes the instantaneous rate of change of a function. Geometrically, it represents the slope of the tangent line to a curve at any specific coordinate.",
        relevance_tag: "This relates to Q2 where you struggled to calculate instantaneous velocity."
      },
      {
        heading: "The Power Rule",
        explanation: "To take the derivative of x raised to any power 'n', you multiply the coefficient by 'n' and decrease the exponent by 1. For example, the derivative of x³ is 3x².",
        relevance_tag: "This relates to Q4 where you miscalculated a polynomial derivative."
      }
    ],
    quiz: [
      {
        question: "What does the derivative of a position-versus-time function represent?",
        options: [
          "Total distance traveled",
          "Instantaneous velocity",
          "Average acceleration",
          "Force"
        ],
        answer: "Instantaneous velocity",
        explanation: "Because the derivative tracks the instantaneous rate of change of output with respect to input, tracking position change over time yields instantaneous velocity."
      }
    ]
  },
  "Algorithms": {
    breakdown: [
      {
        heading: "Big-O Notation Demystified",
        explanation: "Big-O notation describes the limiting behavior of an algorithm's execution time or space requirements as the input size (N) grows toward infinity. It measures worst-case efficiency.",
        relevance_tag: "This relates to Q1 where you misidentified O(N log N) runtime."
      }
    ],
    quiz: [
      {
        question: "Which of the following time complexities represents the fastest growth rate (least efficient) for large inputs?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        answer: "O(N^2)",
        explanation: "Quadratic complexity scales exponentially faster than linear, constant, or logarithmic times, representing poor efficiency as N becomes very large."
      }
    ]
  }
};

/**
 * Process uploaded documents and generate mock structured conceptual guides and mini-quizzes.
 * @param {string} studentId
 * @param {string} topic
 * @param {string} fileName
 */
export async function analyzeDocument(studentId, topic, fileName) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const matchedData = MOCK_BREAKDOWNS[topic] || MOCK_BREAKDOWNS["Entropy"];
  return {
    breakdown: matchedData.breakdown,
    quiz: matchedData.quiz
  };
}
`);

// backend/server.js
writeFile('backend/server.js', `
import express from 'express';
import cors from 'cors';
import { getStudentData } from './services/mentorService.js';
import { analyzeDocument } from './services/documentService.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// GET /api/mentor/:studentId
app.get('/api/mentor/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentData = await getStudentData(studentId);
    return res.json(studentData);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

// POST /api/document/analyze
app.post('/api/document/analyze', async (req, res) => {
  try {
    const { studentId, topic, fileName } = req.body;
    
    if (!studentId || !topic) {
      return res.status(400).json({ error: "Missing required fields: studentId, topic." });
    }

    const analysisResult = await analyzeDocument(studentId, topic, fileName || "uploaded_doc.pdf");
    return res.json(analysisResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Backend server is active on http://localhost:" + PORT);
});
`);


// ==========================================
// 2. FRONTEND FILES
// ==========================================

// frontend/package.json
writeFile('frontend/package.json', `{
  "name": "student-ai-mentor-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.7",
    "lucide-react": "^0.395.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.4",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`);

// frontend/tailwind.config.js
writeFile('frontend/tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mentorBg: "#f8fafc",
        mentorNavy: "#0f172a",
        mentorIndigo: "#6366f1"
      }
    },
  },
  plugins: [],
}
`);

// frontend/postcss.config.js
writeFile('frontend/postcss.config.js', `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

// frontend/public/index.html
writeFile('frontend/public/index.html', `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Student AI Mentor</title>
  </head>
  <body class="bg-slate-50">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`);

// frontend/src/index.css
writeFile('frontend/src/index.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
}
`);

// frontend/src/index.js
writeFile('frontend/src/index.js', `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

// frontend/src/App.js
writeFile('frontend/src/App.js', `
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Sparkles, UploadCloud, BookOpen, CheckCircle, AlertTriangle, 
  ChevronDown, ChevronUp, RefreshCw, ArrowLeft, GraduationCap, ChevronRight
} from 'lucide-react';

const API_BASE = "http://localhost:5001/api";

const SplineCompanion = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-slate-200">AI Study Companion Active</span>
      </div>
      <iframe 
        src="https://my.spline.design/superkidrobotcopy-wwH8wMT0o6fALA5V1BAkUXZb/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        title="Interactive 3D Robot Assistant"
        className="pointer-events-auto"
      />
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState('SELECT');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  
  const [selectedTopic, setSelectedTopic] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const fetchStudentDashboard = async (studentId) => {
    try {
      const res = await fetch(API_BASE + "/mentor/" + studentId);
      if (!res.ok) throw new Error("Could not retrieve mentor details.");
      const data = await res.json();
      setStudentData(data);
      setPage('DASHBOARD');
    } catch (err) {
      alert("Error: Make sure your backend server is running on port 5001!");
      console.error(err);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudentId(id);
    fetchStudentDashboard(id);
  };

  const handleAnalyzeDocument = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    try {
      const res = await fetch(API_BASE + "/document/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudentId,
          topic: selectedTopic,
          fileName: uploadedFile ? uploadedFile.name : "concept_sheet.pdf"
        })
      });
      if (!res.ok) throw new Error("Document analysis failed.");
      const data = await res.json();
      setAnalysisResult(data);
      
      const initialOpen = {};
      data.breakdown.forEach((_, idx) => { initialOpen[idx] = true; });
      setOpenSections(initialOpen);
      
      setPage('BREAKDOWN');
    } catch (err) {
      alert("Error parsing document.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setPage('QUIZ');
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    const currentQuiz = analysisResult.quiz[currentQuizIndex];
    if (selectedAnswer === currentQuiz.answer) {
      setQuizScore(prev => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    if (currentQuizIndex + 1 < analysisResult.quiz.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setPage('RESULTS');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col justify-between">
      <header className="bg-white border-b border-slate-100 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('SELECT')}>
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student AI Mentor</h1>
              <p className="text-xs text-slate-500 font-medium">Guiding personalized pathways to academic mastery</p>
            </div>
          </div>
          {studentData && page !== 'SELECT' && (
            <div className="flex items-center gap-3 bg-indigo-50/50 px-4 py-2 rounded-2xl border border-indigo-100/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-indigo-900">
                Student: {studentData.student_name}
              </span>
              <button 
                onClick={() => { setStudentData(null); setPage('SELECT'); }}
                className="text-xs text-slate-500 hover:text-indigo-600 transition ml-2 border-l border-indigo-200 pl-2 font-medium"
              >
                Change
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto p-4 md:p-8 flex-grow flex flex-col justify-center">
        
        {page === 'SELECT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Learning
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Targeted insights to accelerate your potential.
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Our platform connects direct student performance analytics with a customized AI study tutor to pinpoint knowledge deficits and bridge those gaps with materials-based quizzes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Select a Mock Student to begin:
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "S1", name: "Alex", desc: "Struggling with Entropy (Thermodynamics)" },
                    { id: "S2", name: "Jordan", desc: "Needs help on Calculus limits/derivatives" },
                    { id: "S3", name: "Taylor", desc: "Finding algorithms analysis challenging" }
                  ].map(st => (
                    <button
                      key={st.id}
                      onClick={() => handleSelectStudent(st.id)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 text-left hover:border-indigo-400 hover:bg-indigo-50/20 hover:shadow-sm transition-all group"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">{st.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">{st.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SplineCompanion />
            </div>
          </div>
        )}

        {page === 'DASHBOARD' && studentData && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <GraduationCap className="w-96 h-96" />
              </div>
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="text-indigo-300 font-bold tracking-wider text-xs uppercase">Welcome back!</span>
                <h2 className="text-3xl font-extrabold tracking-tight">Hello, {studentData.student_name}! 👋</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Your current assessment performance dashboard is structured below. Review your weak competencies, select a topic, and upload study materials to prompt a dynamic concept review.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-500" /> Topic Performance Summary
                </h3>
                <div className="h-64 w-full flex-grow">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentData.topic_scores} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="topic" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                      />
                      <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]}>
                        {studentData.topic_scores.map((entry, index) => {
                          const isWeak = studentData.weak_topics.some(w => w.topic === entry.topic);
                          return (
                            <Cell 
                              key={"cell-" + index} 
                              fill={isWeak ? '#f43f5e' : '#6366f1'} 
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-3 text-xs justify-center font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Proficient Track</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Weak Areas Focus</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" /> Urgent Weak Areas
                  </h3>
                  <div className="space-y-4">
                    {studentData.weak_topics.map((item, idx) => (
                      <div key={idx} className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex flex-col gap-3">
                        <div>
                          <span className="text-xs font-bold text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Priority Focus
                          </span>
                          <h4 className="font-extrabold text-slate-900 mt-1.5 text-base">{item.topic}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic bg-white/80 p-2.5 rounded-xl border border-rose-50">
                          &ldquo;{item.mentor_message}&rdquo;
                        </p>
                        <button
                          onClick={() => {
                            setSelectedTopic(item.topic);
                            setPage('UPLOAD');
                          }}
                          className="w-full mt-1 bg-rose-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs hover:bg-rose-700 transition flex items-center justify-center gap-1.5 shadow-sm shadow-rose-200"
                        >
                          <UploadCloud className="w-4 h-4" /> Upload Study Resource
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'UPLOAD' && (
          <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-10 space-y-6">
            <button 
              onClick={() => setPage('DASHBOARD')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>

            <div>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Topic Intervention
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Upload study material for {selectedTopic}</h2>
              <p className="text-slate-500 text-sm mt-1">
                Provide a PDF or document matching this weak concept. The system will parse the resource and generate a custom review structure.
              </p>
            </div>

            <form onSubmit={handleAnalyzeDocument} className="space-y-6">
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition relative">
                <input 
                  type="file" 
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-3">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  {uploadedFile ? uploadedFile.name : "Click or drag to select file"}
                </p>
                <p className="text-xs text-slate-400 mt-1">Accepts PDF, DOCX up to 10MB</p>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-150"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing your document...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze Document</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {page === 'BREAKDOWN' && analysisResult && (
          <div className="max-w-3xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Concept Study Framework</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Personalized Material Analysis</h2>
                <p className="text-slate-500 text-sm">We simplified the uploaded resource around your historical error patterns.</p>
              </div>
              <button
                onClick={startQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-2xl transition shadow-md shadow-emerald-105 flex items-center justify-center gap-2 whitespace-nowrap self-start md:self-auto"
              >
                <BookOpen className="w-4 h-4" /> Start Mini-Quiz
              </button>
            </div>

            <div className="space-y-4">
              {analysisResult.breakdown.map((item, idx) => {
                const isOpen = openSections[idx];
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection(idx)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-800 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900">{item.heading}</h3>
                      </div>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-6 border-t border-slate-100 space-y-4">
                        <p className="text-slate-600 text-sm leading-relaxed">{item.explanation}</p>
                        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-100 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                          <span>{item.relevance_tag}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {page === 'QUIZ' && analysisResult && (
          <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Concept Comprehension Check</span>
                <h3 className="text-xl font-extrabold text-slate-900">Mini-Quiz — {selectedTopic}</h3>
              </div>
              <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {currentQuizIndex + 1} / {analysisResult.quiz.length}
              </span>
            </div>

            <div className="space-y-5">
              <h4 className="text-lg font-bold text-slate-800">
                {analysisResult.quiz[currentQuizIndex].question}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {analysisResult.quiz[currentQuizIndex].options.map((opt, oIdx) => {
                  let optStyle = "border-slate-200 hover:border-indigo-400 hover:bg-slate-50";
                  if (selectedAnswer === opt) {
                    optStyle = "border-indigo-600 bg-indigo-50/40 font-semibold text-indigo-900";
                  }
                  
                  if (isAnswerSubmitted) {
                    if (opt === analysisResult.quiz[currentQuizIndex].answer) {
                      optStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-800 font-semibold";
                    } else if (selectedAnswer === opt) {
                      optStyle = "border-rose-300 bg-rose-50/50 text-rose-800";
                    } else {
                      optStyle = "border-slate-100 bg-slate-50/30 opacity-60 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedAnswer(opt)}
                      className={"flex items-center gap-3 p-4 rounded-xl border text-left text-sm transition " + optStyle}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <div className={"p-5 rounded-2xl border text-sm space-y-3 " + (
                  selectedAnswer === analysisResult.quiz[currentQuizIndex].answer 
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-100' 
                    : 'bg-rose-50 text-rose-900 border-rose-100'
                )}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedAnswer === analysisResult.quiz[currentQuizIndex].answer ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
                        <span>Incorrect. Let's review standard definitions:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90 pl-7">
                    {analysisResult.quiz[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                    className="bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
                  >
                    <span>
                      {currentQuizIndex + 1 < analysisResult.quiz.length ? "Next Question" : "Complete Quiz"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {page === 'RESULTS' && analysisResult && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Session Complete</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Excellent Effort!</h2>
              <p className="text-slate-500 text-sm mt-1">
                You have finished reviewing study documentation for <strong>{selectedTopic}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Score</span>
              <h3 className="text-4xl font-extrabold text-indigo-600 mt-1">
                {quizScore} / {analysisResult.quiz.length}
              </h3>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-indigo-950 text-xs italic leading-relaxed text-left">
              &ldquo;Good work reviewing these elements! Taking notes on the re-teach feedback will stabilize these formulas before exam week.&rdquo;
            </div>

            <button
              onClick={() => {
                fetchStudentDashboard(selectedStudentId);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-100 py-6 px-6 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Student AI Mentor. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-indigo-600 cursor-pointer">Academic Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
`);

console.log("\\nWorkspace successfully generated!");
console.log("==========================================");
console.log("To run your full-stack project, run these commands in separate terminal sessions:");
console.log("");
console.log("1. Run the Backend:");
console.log("   cd backend && npm install && npm start");
console.log("");
console.log("2. Run the Frontend:");
console.log("   cd frontend && npm install && npm start");
console.log("==========================================");