// GET /api/search?category=air&vehicle_type=jet&passengers=4&booking_type=scheduled
import { searchFleet } from "../../lib/data";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { category="air", vehicle_type, passengers=1, booking_type } = req.query;
  const results = searchFleet({ category, vehicle_type, passengers }).map(v => ({
    ...v,
    availability_hours: booking_type === "immediate" ? Math.floor(Math.random() * 3) + 1 : null,
  }));
  return res.status(200).json({ results, count: results.length });
}
