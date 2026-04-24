// pages/api/auth/logout.js
import { sessionsStore } from "../../../lib/data";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const sessionId = req.cookies?.session;
  if (sessionId) delete sessionsStore[sessionId];
  res.setHeader("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
  return res.status(200).json({ ok: true });
}
