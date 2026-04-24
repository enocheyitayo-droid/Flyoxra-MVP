// PATCH /api/bookings/:id  { status: "confirmed"|"rejected"|"cancelled" }
import { bookingsStore } from "../../../lib/data";

export default function handler(req, res) {
  const { id } = req.query;
  const idx = bookingsStore.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  if (req.method === "GET")   return res.status(200).json({ booking: bookingsStore[idx] });
  if (req.method === "PATCH") {
    const { status } = req.body;
    if (!["confirmed","rejected","cancelled"].includes(status))
      return res.status(400).json({ error: "Invalid status" });
    bookingsStore[idx] = { ...bookingsStore[idx], status, updated_at: new Date().toISOString() };
    return res.status(200).json({ booking: bookingsStore[idx] });
  }
  res.status(405).end();
}
