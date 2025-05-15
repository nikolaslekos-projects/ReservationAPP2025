This application consists of a Backend (Node.js/Express), a Frontend (React), and a MariaDB database (managed via HeidiSQL).

Prerequisites
Node.js and npm must be installed
HeidiSQL or any MariaDB client must be available

Backend Installation and Startup
Navigate to the backend folder
Run npm install to install dependencies
Run npm run dev to start the development server

Frontend Installation and Startup
Navigate to the frontend folder
Run npm install to install dependencies
Run npm start to launch the frontend

Database Import (via HeidiSQL)
Open HeidiSQL
Create a new database, for example: restaurant_booking
Import the file: restaurant_booking.sql
Set the database credentials in the backend/.env file (user, password, database name)

Visit http://localhost:3000
Register or log in
Browse restaurants, make reservations, edit or delete them

