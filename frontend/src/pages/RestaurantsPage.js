import React, { useEffect, useState } from "react";
import api from "../services/api";

const restaurantImages = {
  "Taverna Nikos": "/images/taverna.jpg",
  "Σκατζοheros": "/images/Σκατζοheros.jpg",
  "Etrusco": "/images/Etrusco.jpg",
  "Selene": "/images/Selene.jpg",
  "Botrini’s": "/images/Botrini’s.jpg",
  "Σπονδή": "/images/Σπονδή.jpg",
  "Καρνάγιο": "/images/Καρνάγιο.jpg",
  "Olive Restaurant": "/images/Olive Restaurant.jpg",
  "Γλυκάνισος": "/images/Γλυκάνισος.jpg",
  "Τραπέζια": "/images/Τραπέζια.jpg",
  "Apiri Greek Eatery ": "/images/Apiri Greek Eatery.jpg",
  "Το Κάστρο": "/images/Το Κάστρο.jpg",
};

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [popupRestaurant, setPopupRestaurant] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        setRestaurants(res.data.restaurants);
      } catch (err) {
        alert("❌ Σφάλμα φόρτωσης εστιατορίων");
      }
    };
    fetchRestaurants();
  }, []);

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (sortCriteria === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "location") {
      return a.location.localeCompare(b.location);
    } else if (sortCriteria === "opening_hours") {
      const timeA = a.opening_hours.split("-")[0].trim();
      const timeB = b.opening_hours.split("-")[0].trim();
      return timeA.localeCompare(timeB);
    }
    return 0;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>🍽️ Εστιατόρια</h2>

      <div className="sort-dropdown">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option disabled value="">
            Ταξινόμηση ως προς
          </option>
          <option value="alphabetical">Αλφαβητικά (Α-Ω)</option>
          <option value="location">Τοποθεσία (Α-Ω)</option>
          <option value="opening_hours">Ωράριο (από το πρωί)</option>
        </select>
      </div>

      <div className="grid">
        {sortedRestaurants.map((r) => (
          <div key={r.restaurant_id} className="card">
            <img
              src={restaurantImages[r.name] || "https://via.placeholder.com/400x300?text=Restaurant"}
              alt={r.name}
              onClick={() => setPopupRestaurant(r)}
              style={{ cursor: "pointer" }}
            />
            <div className="card-body">
              <h3>{r.name}</h3>
              <p>📍 {r.location}</p>
            </div>
          </div>
        ))}
      </div>

      {popupRestaurant && (
        <div className="popup-backdrop" onClick={() => setPopupRestaurant(null)}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
              {popupRestaurant.name}
            </h3>
            <p style={{ color: "#777", marginBottom: "0.5rem" }}>
              📍 {popupRestaurant.location}
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              🕒 Ωράριο λειτουργίας: {popupRestaurant.opening_hours}
            </p>
            <p className="popup-description">
              {popupRestaurant.description}
            </p>
            <button
              className="popup-button"
              onClick={() => setPopupRestaurant(null)}
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
