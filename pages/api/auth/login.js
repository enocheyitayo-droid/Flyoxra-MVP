import { getUserByEmail, sessionsStore } from "../../../lib/data";
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user || user.password !== password)
    return res.status(401).json({ error: "Invalid credentials" });
  const sid = "sess_" + Date.now() + Math.random().toString(36).slice(2);
  sessionsStore[sid] = user.id;
  res.setHeader("Set-Cookie", `session=${sid}; HttpOnly; Path=/; SameSite=Lax`);
  return res.status(200).json({ user: { id:user.id, name:user.name, email:user.email, role:user.role, operator_id:user.operator_id, tier:user.tier } });
}
