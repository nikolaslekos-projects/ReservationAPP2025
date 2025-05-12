-- --------------------------------------------------------
-- Διακομιστής:                  127.0.0.1
-- Έκδοση διακομιστή:            11.7.2-MariaDB - mariadb.org binary distribution
-- Λειτ. σύστημα διακομιστή:     Win64
-- HeidiSQL Έκδοση:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for restaurant_booking
CREATE DATABASE IF NOT EXISTS `restaurant_booking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `restaurant_booking`;

-- Dumping structure for πίνακας restaurant_booking.reservations
CREATE TABLE IF NOT EXISTS `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `people_count` int(11) NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table restaurant_booking.reservations: ~1 rows (approximately)
DELETE FROM `reservations`;
INSERT INTO `reservations` (`reservation_id`, `user_id`, `restaurant_id`, `date`, `time`, `people_count`) VALUES
	(7, 15, 5, '2025-05-17', '05:10:00', 4);

-- Dumping structure for πίνακας restaurant_booking.restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table restaurant_booking.restaurants: ~12 rows (approximately)
DELETE FROM `restaurants`;
INSERT INTO `restaurants` (`restaurant_id`, `name`, `location`, `opening_hours`, `description`) VALUES
	(1, 'Taverna Nikos', 'Αθήνα', 'Καθημερινά 12:00 - 23:00', 'Παραδοσιακή ελληνική ταβέρνα στο κέντρο της Αθήνας, γνωστή για το αυθεντικό σουβλάκι και τις μεσογειακές γεύσεις.'),
	(2, 'Σκατζοheros', 'Πάτρα', 'Δευτ-Παρ 11:00 - 22:00, Σ/Κ 12:00 - 00:00', 'Δημιουργική κουζίνα με έμφαση στα τοπικά προϊόντα της Πάτρας, σε έναν χώρο που συνδυάζει μοντέρνα αισθητική με παραδοσιακά στοιχεία.'),
	(3, 'Etrusco', 'Κέρκυρα', 'Καθημερινά 19:30–23:30', 'Βραβευμένο γκουρμέ εστιατόριο στην Κέρκυρα, προσφέροντας σύγχρονες ελληνικές γεύσεις με ιταλικές επιρροές.'),
	(4, 'Selene', 'Σαντορίνη', 'Καθημερινά 18:30–23:00', 'Εμβληματικό εστιατόριο στη Σαντορίνη, γνωστό για την παραδοσιακή κουζίνα Κυκλάδων και τη θέα στο ηλιοβασίλεμα.'),
	(5, 'Botrini’s', 'Αθήνα', 'Τρίτη–Σάββατο 19:30–23:30', 'Fine dining εμπειρία με υπογραφή του σεφ Έκτορα Μποτρίνη, συνδυάζοντας τεχνικές υψηλής γαστρονομίας με ελληνικές πρώτες ύλες.'),
	(6, 'Σπονδή', 'Αθήνα', 'Καθημερινά 19:00–23:30', 'Από τα πιο διάσημα εστιατόρια της Αθήνας, η Σπονδή προσφέρει κλασική γαλλική κουζίνα σε πολυτελές περιβάλλον.'),
	(7, 'Καρνάγιο', 'Άγιος Νικόλας,Κρήτη', 'Καθημερινά 16:00 - 00:00', 'Παραδοσιακή ταβέρνα στο Αίγιο Νικολάς, φημισμένη για τα φρέσκα θαλασσινά και τη ζεστή οικογενειακή ατμόσφαιρα.'),
	(8, 'Olive Restaurant', 'Πιερία', 'Δευτέρα - Παρασκευή 11:30 - 21:30', 'Μοντέρνο εστιατόριο στην Πειραιά με έμφαση στις ελιές και τα τοπικά ελληνικά προϊόντα, ιδανικό για μεσημεριανό και δείπνο.'),
	(9, 'Γλυκάνισος', 'Θεσσαλονίκη', 'Καθημερινά 12:00 - 23:00', 'Ρομαντικό εστιατόριο στη Θεσσαλονίκη, προσφέροντας πιάτα ελληνικής κουζίνας με δημιουργικές πινελιές και προσεγμένη κάβα.'),
	(10, 'Τραπέζια', 'Θεσσαλονίκη', 'Τρίτη - Κυριακή 08:00 - 16:00', 'Ανανεωμένο μεζεδοπωλείο στη Θεσσαλονίκη, γνωστό για τα ποιοτικά μεζεδάκια και τις παραδοσιακές ελληνικές γεύσεις.'),
	(11, 'Apiri Greek Eatery ', 'Ηράκλειο, Κρήτη', 'Καθημερινά 13:00–23:00', 'Γαστρονομικός προορισμός στο Ηράκλειο Κρήτης, με μοντέρνες ερμηνείες παραδοσιακών κρητικών συνταγών.'),
	(12, 'Το Κάστρο', 'Μεθώνη, Μεσσηνία', ' Καθημερινά 12:00–23:00', 'Παραδοσιακό καφέ-εστιατόριο στη Μεθώνη, ιδανικό για χαλαρές στιγμές δίπλα στο κάστρο και απολαυστική ελληνική κουζίνα.');

-- Dumping structure for πίνακας restaurant_booking.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table restaurant_booking.users: ~2 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
	(1, 'Nikos', 'nikosdsada@example.com', '$2b$10$gj.BfLtKNLxGJ2IY5zvbzuWOgK/YeQX3u0gTHp0KK4FO45yuqi8H2'),
	(2, 'Nikos', 'nikos@example.com', '$2b$10$VrwrDMDJFew6z90OX/TxZ.O8g6SO8GsuAGCmK85iQEWvpIPoX2Q9O');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
