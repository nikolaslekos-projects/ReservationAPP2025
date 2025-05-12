Αυτή η εφαρμογή αποτελείται από Backend (Node.js/Express) και Frontend (React), καθώς και βάση δεδομένων σε MariaDB (μέσω HeidiSQL).

 Απαραίτητες Προϋποθέσεις
Node.js & npm εγκατεστημένα

HeidiSQL ή MariaDB client

 Εγκατάσταση και Εκκίνηση Backend
cd backend
npm install
npm run dev


Εγκατάσταση και Εκκίνηση Frontend
cd frontend
npm install
npm start

Εισαγωγή Βάσης Δεδομένων (HeidiSQL)
Άνοιξε το HeidiSQL.
Δημιούργησε μία νέα βάση δεδομένων π.χ. restaurant_booking.
Κάνε Import το αρχείο: restaurant_booking.sql
Ρύθμισε τα DB credentials στο backend/.env αρχείο (user, password, db).

Επισκέψου: http://localhost:3000

Κάνε εγγραφή / σύνδεση.

Δες εστιατόρια, κάνε κρατήσεις, επεξεργασία, διαγραφή.

