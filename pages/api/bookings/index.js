// GET  /api/bookings?user_id=u1
// POST /api/bookings
import { bookingsStore, getVehicleById, calcPrice } from "../../../lib/data";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { user_id } = req.query;
    const list = user_id ? bookingsStore.filter(b => b.user_id === user_id) : bookingsStore;
    return res.status(200).json({ bookings: list });
  }
  if (req.method === "POST") {
    const { vehicle_id, user_id, duration = 3, ...rest } = req.body;
    if (!vehicle_id || !user_id) return res.status(400).json({ error: "vehicle_id and user_id required" });
    const vehicle = getVehicleById(vehicle_id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    const pricing = calcPrice(vehicle_id, parseFloat(duration));
    const booking = {
      id: "bk-" + Date.now(), user_id, vehicle_id, type: vehicle.type,
      duration: parseFloat(duration), status: "pending",
      total: pricing.total, pricing, created_at: new Date().toISOString(), ...rest,
    };
    bookingsStore.unshift(booking);
    return res.status(201).json({ booking });
  }
  res.status(405).end();
}
