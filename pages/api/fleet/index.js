import { FLEET } from "../../../lib/data";
export default function handler(req, res) {
  if (req.method === "GET") {
    const { operator_id } = req.query;
    return res.status(200).json({ fleet: operator_id ? FLEET.filter(v=>v.operator_id===operator_id) : FLEET });
  }
  if (req.method === "POST") {
    const { type, model, passenger_capacity, price_per_hour, operator_id, current_location } = req.body;
    if (!type||!model||!passenger_capacity||!price_per_hour||!operator_id) return res.status(400).json({ error:"Missing fields" });
    const v = { id:"v"+Date.now(), type, model, passenger_capacity:+passenger_capacity, price_per_hour:+price_per_hour, operator_id, current_location:current_location||"TBD", range:"Custom", speed:"N/A", cabinClass:"Custom", created_at:new Date().toISOString() };
    FLEET.push(v);
    return res.status(201).json({ vehicle: v });
  }
  res.status(405).end();
}
