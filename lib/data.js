// lib/data.js — In-memory mock database (resets on server restart)

export const OPERATORS = {
  op1: { id:"op1", name:"AeroElite Charter",        rating:4.9 },
  op2: { id:"op2", name:"BlueSky Aviation",         rating:4.8 },
  op3: { id:"op3", name:"OceanLux Yachts",          rating:4.9 },
  op4: { id:"op4", name:"MediFlight International", rating:5.0 },
  op5: { id:"op5", name:"Pinnacle Air Group",       rating:4.7 },
};

export const FLEET = [
  { id:"v1",  type:"jet",        model:"Gulfstream G700",         passenger_capacity:19, current_location:"New York (KTEB)", price_per_hour:12000, operator_id:"op1", range:"7500 nm", speed:"956 km/h", cabinClass:"Ultra Long Range", image:"https://example.com/gulfstream.jpg" },
  { id:"v2",  type:"jet",        model:"Bombardier Global 7500",  passenger_capacity:19, current_location:"London (EGLF)",   price_per_hour:14000, operator_id:"op2", range:"7700 nm", speed:"956 km/h", cabinClass:"Ultra Long Range", image:"https://example.com/global7500.jpg" },
  { id:"v3",  type:"jet",        model:"Dassault Falcon 8X",      passenger_capacity:14, current_location:"Dubai (OMDW)",    price_per_hour:10000, operator_id:"op5", range:"6450 nm", speed:"903 km/h", cabinClass:"Long Range", image:"https://example.com/falcon8x.jpg" },
  { id:"v4",  type:"jet",        model:"Cessna Citation X+",      passenger_capacity:12, current_location:"Miami (KOPF)",    price_per_hour: 6500, operator_id:"op1", range:"3460 nm", speed:"978 km/h", cabinClass:"Super Midsize", image:"https://example.com/citationx.jpg" },
  { id:"v5",  type:"jet",        model:"Embraer Praetor 600",     passenger_capacity:14, current_location:"Los Angeles",     price_per_hour: 7000, operator_id:"op5", range:"4018 nm", speed:"863 km/h", cabinClass:"Super Midsize", image:"https://example.com/praetor600.jpg" },
  { id:"v6",  type:"helicopter", model:"AgustaWestland AW139",    passenger_capacity:15, current_location:"New York",        price_per_hour: 3500, operator_id:"op2", range:"1250 km", speed:"306 km/h", cabinClass:"VIP Transport", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBAbyzFZQKSazBwHqvrSruN3aXRjaTA4Nu3uCAfCCv1Qw09MeXW6Pfg4LByJ7mlhVlhiLe-l-vqVIGAvZPp1sSdSBEi7_NiJHOLzJv6bJYdqJ-ohBoJQUqNnOY4KJglxA_BQS4LvnwWVZsJhQ66HkyUTphEHgBWDhTqgbQnuaTEgzC_SbXl0RQ5GbFpDRoLMTrNl8Dv90SS67gffi-t9fypIiOj2C2AJBVBusTTB-XMKzsNkJyAJ807LDgnxfLr5WrOUh6BupHmT14_" },
  { id:"v7",  type:"helicopter", model:"Sikorsky S-76D",          passenger_capacity:12, current_location:"London",          price_per_hour: 3000, operator_id:"op1", range:"830 km",  speed:"287 km/h", cabinClass:"Executive", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuDzg6O-v_lq0d8njv9Nd3mF1Jr58G63nvWj7u5IaObKBrOuwvrX-pDhcCOyPGn1bRV5B9q8hVIseQvsO_Q1rtQqCjJ1iwfvV8P6kvUcCSVEpgSWtD6EzLXxC92QMsF_HtDyd5OLSwBbsaDFCqerRW3QgxKNHYPGcJo0UCCOCRenuph1I9Q-y3fODzTUsrtua60OVV5J-1Q6GRrIU8aB0RKq71SSVkuPaaOpUfMr6vWGuTqm8vWR1ZieLp3NSZBpXHrwiGYsGp3H1OsC" },
  { id:"v8",  type:"helicopter", model:"Bell 525 Relentless",     passenger_capacity:16, current_location:"Dubai",           price_per_hour: 4000, operator_id:"op5", range:"1481 km", speed:"296 km/h", cabinClass:"Super Heavy", image:"https://example.com/bell525.jpg" },
  { id:"v9",  type:"ambulance",  model:"Learjet 45XR Medivac",    passenger_capacity:6,  current_location:"Chicago",         price_per_hour: 8000, operator_id:"op4", range:"2180 nm", speed:"860 km/h", cabinClass:"ICU Equipped" },
  { id:"v10", type:"ambulance",  model:"Pilatus PC-24 Ambulance", passenger_capacity:4,  current_location:"Zurich (LSZH)",   price_per_hour: 7500, operator_id:"op4", range:"2000 nm", speed:"815 km/h", cabinClass:"ICU Equipped" },
  { id:"v11", type:"ambulance",  model:"King Air 350ER Medevac",  passenger_capacity:5,  current_location:"Singapore",       price_per_hour: 5500, operator_id:"op4", range:"3300 nm", speed:"578 km/h", cabinClass:"Critical Care" },
  { id:"v12", type:"yacht",      model:"Sunseeker 131 Predator",  passenger_capacity:12, current_location:"Monaco",          price_per_hour: 5000, operator_id:"op3", range:"40 m",    speed:"30 kts",   cabinClass:"Sport Cruiser" },
  { id:"v13", type:"yacht",      model:"Benetti Classic 120",     passenger_capacity:10, current_location:"Ibiza",           price_per_hour: 4500, operator_id:"op3", range:"36 m",    speed:"16 kts",   cabinClass:"Displacement" },
  { id:"v14", type:"yacht",      model:"Feadship Royale",         passenger_capacity:14, current_location:"Miami",           price_per_hour: 8000, operator_id:"op3", range:"55 m",    speed:"15 kts",   cabinClass:"Explorer" },
  { id:"v15", type:"yacht",      model:"Azimut Grande 35M",       passenger_capacity:8,  current_location:"Santorini",       price_per_hour: 3500, operator_id:"op3", range:"35 m",    speed:"28 kts",   cabinClass:"Semi-Displacement" },
];

export const bookingsStore = [
  { id:"bk-001", user_id:"u1", vehicle_id:"v1",  type:"jet",        route:"New York (KTEB) → London (EGLF)", date:"2025-05-15", time:"09:00", passengers:6, trip_type:"one-way", booking_type:"scheduled", duration:7,  status:"confirmed", total:88200,  created_at:"2025-04-01" },
  { id:"bk-002", user_id:"u1", vehicle_id:"v12", type:"yacht",      route:"Monaco Coast Charter",            date:"2025-06-20", time:"10:00", passengers:8, trip_type:"n/a",     booking_type:"scheduled", duration:6,  status:"pending",   total:31500,  created_at:"2025-04-05" },
  { id:"bk-003", user_id:"u1", vehicle_id:"v6",  type:"helicopter", route:"Manhattan → Hamptons",            date:"2025-04-25", time:"14:30", passengers:4, trip_type:"one-way", booking_type:"immediate", duration:1,  status:"confirmed", total:3675,   created_at:"2025-04-20" },
  { id:"bk-004", user_id:"u2", vehicle_id:"v4",  type:"jet",        route:"Miami (KOPF) → Nassau",           date:"2025-05-02", time:"11:00", passengers:6, trip_type:"round",   booking_type:"scheduled", duration:2,  status:"pending",   total:13650,  created_at:"2025-04-18" },
];

export const usersStore = [
  { id:"u1", name:"James Harrington", email:"james@charter.com",  password:"demo", role:"client",   operator_id:null,  tier:"Obsidian" },
  { id:"u2", name:"Alex Monroe",      email:"alex@aeroelite.com", password:"demo", role:"operator", operator_id:"op1", tier:"Operator" },
];

export const sessionsStore = {}; // sessionId → userId

// ── Helpers ──────────────────────────────────────────────────
export const getVehicleById    = id   => FLEET.find(v => v.id === id)            || null;
export const getUserByEmail    = em   => usersStore.find(u => u.email === em)     || null;
export const getUserById       = id   => usersStore.find(u => u.id === id)        || null;
export const getBookingsByUser = uid  => bookingsStore.filter(b => b.user_id === uid);

export function getBookingsByOperator(opId) {
  const ids = FLEET.filter(v => v.operator_id === opId).map(v => v.id);
  return bookingsStore.filter(b => ids.includes(b.vehicle_id));
}

/** price = hourly_rate × duration */
export function calcPrice(vehicleId, hours) {
  const v = getVehicleById(vehicleId);
  if (!v) return null;
  const subtotal = v.price_per_hour * hours;
  const fee      = Math.round(subtotal * 0.05);
  return { hourly_rate: v.price_per_hour, hours, subtotal, service_fee: fee, total: subtotal + fee };
}

export function searchFleet({ category, vehicle_type, passengers = 1 }) {
  return FLEET.filter(v => {
    if (category === "air"   && v.type === "yacht") return false;
    if (category === "yacht" && v.type !== "yacht") return false;
    if (vehicle_type && vehicle_type !== "all" && v.type !== vehicle_type) return false;
    return v.passenger_capacity >= parseInt(passengers);
  });
}
