// backend/server.js
import express from 'express';
import cors from 'cors';
import { getStudentData, generateChatResponse } from './services/mentorService.js';
import { analyzeDocument } from './services/documentService.js';
import { getUser, getAllUsers, createUser, updateUser } from './services/userService.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// ─── USER ROUTES ───

app.get('/api/users', (req, res) => {
  return res.json(getAllUsers());
});

app.get('/api/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
});

app.post('/api/users', (req, res) => {
  try {
    const newUser = createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:userId', (req, res) => {
  const updated = updateUser(req.params.userId, req.body);
  if (!updated) return res.status(404).json({ error: "User not found" });
  return res.json(updated);
});

// ─── MENTOR ROUTES ───

app.get('/api/mentor/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentData = await getStudentData(studentId);
    return res.json(studentData);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

// ─── DOCUMENT ROUTES ───

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

// ─── CHAT ROUTES ───
// Both paths point to the same logic. topicScores is optional, and studentId 
// can arrive as either "studentId" or "userId" from the frontend — this fixes 
// onboarding chat (no scores yet), the dashboard chat widget, and any 
// frontend/backend field-name mismatch.

async function handleChat(req, res) {
  try {
    const studentId = req.body.studentId || req.body.userId;
    const { message, topicScores } = req.body;
    if (!studentId || !message) {
      return res.status(400).json({ error: "Missing required properties: studentId, message." });
    }
    const reply = await generateChatResponse(studentId, message, topicScores || null);
    return res.json({ response: reply });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

app.post('/api/mentor/chat', handleChat);
app.post('/api/chat', handleChat);

app.listen(PORT, () => {
  console.log("Backend server is active on http://localhost:" + PORT);
});