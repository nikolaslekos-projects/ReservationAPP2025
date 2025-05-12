import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({ date: "", time: "", people_count: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("date");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/user/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(res.data.reservations);
      } catch (err) {
        alert("❌ Δεν είστε συνδεδεμένος. Κάντε login ξανά.");
        navigate("/login");
      }
    };

    fetchReservations();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις την κράτηση;")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations((prev) => prev.filter((r) => r.reservation_id !== id));
      alert("✅ Διαγραφή επιτυχής");
    } catch (err) {
      alert("❌ Αποτυχία διαγραφής");
    }
  };

  const handleEditClick = (res) => {
    setEditingReservation(res);
    setFormData({ date: res.date, time: res.time, people_count: res.people_count });
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/reservations/${editingReservation.reservation_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations((prev) =>
        prev.map((r) =>
          r.reservation_id === editingReservation.reservation_id ? { ...r, ...formData } : r
        )
      );
      setEditingReservation(null);
      alert("✅ Επεξεργασία επιτυχής");
    } catch (err) {
      alert("❌ Αποτυχία επεξεργασίας");
    }
  };

  const filteredReservations = reservations
    .filter((r) =>
      r.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "date") return a.date.localeCompare(b.date);
      if (sortCriteria === "time") return a.time.localeCompare(b.time);
      if (sortCriteria === "people_count") return a.people_count - b.people_count;
      return 0;
    });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Οι Κρατήσεις μου</h2>
      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => navigate("/new-reservation")}>➕ Νέα Κράτηση</button>

        <input
          type="text"
          placeholder="🔍 Αναζήτηση εστιατορίου..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1",
            padding: "0.6rem 1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        />

        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            minWidth: "180px",
          }}
        >
          <option value="date">📅 Ημερομηνία</option>
          <option value="time">⏰ Ώρα</option>
          <option value="people_count">👥 Άτομα</option>
        </select>
      </div>

      {filteredReservations.length === 0 ? (
        <p>Δεν υπάρχουν κρατήσεις.</p>
      ) : (
        filteredReservations.map((res) => (
          <div key={res.reservation_id} className="reservation-card">
            <strong>{res.restaurant_name}</strong> – {res.date} – {res.time} – {res.people_count} άτομα
            <div className="reservation-actions">
              <button className="delete" onClick={() => handleDelete(res.reservation_id)}>
                ❌ Διαγραφή
              </button>
              <button className="edit" onClick={() => handleEditClick(res)}>
                ✏️ Επεξεργασία
              </button>
            </div>
          </div>
        ))
      )}

      {editingReservation && (
        <div className="modal-backdrop" onClick={() => setEditingReservation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Επεξεργασία Κράτησης</h3>

            <label>Ημερομηνία:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <label>Ώρα:</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />

            <label>Άτομα:</label>
            <input
              type="number"
              min="1"
              value={formData.people_count}
              onChange={(e) => setFormData({ ...formData, people_count: e.target.value })}
            />

            <div className="actions">
              <button className="save" onClick={handleEditSave}>💾 Αποθήκευση</button>
              <button className="cancel" onClick={() => setEditingReservation(null)}>❌ Ακύρωση</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
