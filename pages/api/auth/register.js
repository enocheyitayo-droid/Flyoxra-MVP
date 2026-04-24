import { getUserByEmail, usersStore, sessionsStore } from "../../../lib/data";
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });
  if (getUserByEmail(email)) return res.status(409).json({ error: "Email already registered" });
  const user = { id:"u"+Date.now(), name, email, password, role:"client", operator_id:null, tier:"Silver", created_at: new Date().toISOString() };
  usersStore.push(user);
  const sid = "sess_" + Date.now() + Math.random().toString(36).slice(2);
  sessionsStore[sid] = user.id;
  res.setHeader("Set-Cookie", `session=${sid}; HttpOnly; Path=/; SameSite=Lax`);
  return res.status(201).json({ user: { id:user.id, name:user.name, email:user.email, role:user.role, tier:user.tier } });
}
