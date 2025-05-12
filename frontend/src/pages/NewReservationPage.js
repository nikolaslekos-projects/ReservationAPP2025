import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const NewReservationPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        setRestaurants(res.data.restaurants);
      } catch (err) {
        alert("Σφάλμα φόρτωσης εστιατορίων");
      }
    };
    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/reservations",
        { restaurant_id: restaurantId, date, time, people_count: peopleCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Κράτηση καταχωρήθηκε!");
      navigate("/reservations");
    } catch (err) {
      alert("❌ Αποτυχία καταχώρησης κράτησης.");
    }
  };

  return (
    <div className="container">
      <h2>Νέα Κράτηση</h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>Εστιατόριο:</label>
            <select
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              required
            >
              <option value="">-- Επιλέξτε --</option>
              {restaurants.map((r) => (
                <option key={r.restaurant_id} value={r.restaurant_id}>
                  {r.name} – {r.location}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(2)}>
              Επόμενο ➡️
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label>Ημερομηνία:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Ώρα:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <label>Άτομα:</label>
            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <button type="button" onClick={() => setStep(1)}>
                ⬅️ Πίσω
              </button>
              <button type="button" onClick={() => setStep(3)}>
                Επόμενο ➡️
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Επιβεβαίωση Κράτησης</h3>
            <p>
              <strong>Εστιατόριο:</strong>{" "}
              {restaurants.find((r) => r.restaurant_id === parseInt(restaurantId))?.name}
            </p>
            <p>
              <strong>Ημερομηνία:</strong> {date}
            </p>
            <p>
              <strong>Ώρα:</strong> {time}
            </p>
            <p>
              <strong>Άτομα:</strong> {peopleCount}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <button type="button" onClick={() => setStep(2)}>
                ⬅️ Πίσω
              </button>
              <button type="submit">Κάνε Κράτηση ✅</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default NewReservationPage;
