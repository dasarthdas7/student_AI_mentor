# 🎓 Student Performance Analyzer & AI Mentor + Intelligent Document Analyzer

A full-stack AI platform built for hackathons to optimize student study habits, analyze performance metrics, generate personalized timetables, and summarize uploaded educational resources with interactive RAG/LLM Q&A.

---

## 🌟 Key Features

1. **Intelligent Document Analyzer (RAG + LLM)**:
   - **File Upload**: Upload study guides, lecture slides, or class notes (`.pdf`, `.docx`, `.txt`).
   - **Key Takeaways & Bullet Summary**: Extracts core points into bite-sized, easy-to-learn summaries.
   - **Modular Breakdown**: Categorizes concepts into definitions, formulas, and step-by-step methodologies.
   - **High-Yield 10-Question Quiz**: Dynamic quiz generated per document/subject with real-time feedback and explanation cards.
   - **Live RAG Q&A Chatbot**: Chat directly with your uploaded materials in the floating AI Assistant widget.

2. **Student Performance Analyzer & AI Mentor**:
   - **Performance Dashboard**: Visual subject score bar chart, overall grade averages, and weak subject detection.
   - **Interactive Conversational Onboarding**: AI chatbot guides students step-by-step to record age, subjects, marks, and free hours.
   - **Dynamic Study Timetable / Scheduler**: Auto-generates weekly study slots, prioritizing weak areas with high-density revision blocks.

---

## 🛠️ Architecture

- **Frontend**: React 18, Recharts (Data Visualization), Lucide React (Icons), Tailwind CSS (Modern Glassmorphic UI).
- **Backend**: Express.js, Node.js (ES Modules).
- **Services**:
  - `mentorService.js`: Performance data aggregation & student profiles.
  - `documentService.js`: Intelligent document analysis, bullet points summarization, and quiz engine.
  - `scheduleService.js`: Weighted weekly study timetable algorithm.
  - `chatService.js`: Live RAG Q&A pipeline and conversational onboarding agent.
  - `userService.js`: Student user profile database.

---

## 🚀 How to Run the Project

### Quick Launcher (Windows)
Double-click `start-app.bat` or run in terminal:
```cmd
.\start-app.bat
```

### Manual Launch

1. **Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   *Runs on `http://localhost:5002`*

2. **Frontend Application**:
   ```bash
   cd frontend
   npm start
   ```
   *Opens automatically on `http://localhost:3000`*

---

## 🌐 API Endpoints Summary

- `GET /api/users` - Fetch list of registered students
- `GET /api/users/:userId` - Fetch specific student profile
- `POST /api/users` - Register a new student profile
- `GET /api/mentor/:studentId` - Retrieve student performance & weak topics
- `GET /api/schedule/:userId` - Generate weekly weighted study schedule
- `POST /api/document/analyze` - Process uploaded file and generate key takeaways & quiz
- `POST /api/chat` - Interactive AI Mentor & RAG Document Q&A chatbot
