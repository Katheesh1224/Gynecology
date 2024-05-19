-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2024 at 08:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gyn`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission`
--

CREATE TABLE `admission` (
  `id` int(25) NOT NULL,
  `date` datetime NOT NULL,
  `phn` int(15) NOT NULL,
  `bht` varchar(10) NOT NULL,
  `ward_no` int(11) NOT NULL DEFAULT 21,
  `consultant` varchar(50) NOT NULL,
  `allergy` varchar(100) NOT NULL,
  `past_obs` varchar(5) NOT NULL,
  `past_med` varchar(150) NOT NULL,
  `past_surg` varchar(150) NOT NULL,
  `hist_cancer` varchar(150) NOT NULL,
  `menstrual_hist` varchar(150) NOT NULL,
  `complaints` varchar(150) NOT NULL,
  `diagnosis` varchar(150) NOT NULL,
  `other` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission`
--

INSERT INTO `admission` (`id`, `date`, `phn`, `bht`, `ward_no`, `consultant`, `allergy`, `past_obs`, `past_med`, `past_surg`, `hist_cancer`, `menstrual_hist`, `complaints`, `diagnosis`, `other`) VALUES
(1, '2024-02-25 04:17:00', 2147483647, '123654/789', 21, 'y', 'tablet', '', 'Epilepsy', 'Hypertension', 'none', '', 'pain', 'none', 'none'),
(2, '2023-04-05 20:17:00', 2147483647, '123654/789', 21, 'x', 'food', '', 'Bronchal Asthma', '', 'none', '', 'exausted', 'abd', 'fine');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(20) NOT NULL,
  `phn` int(15) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `blood_gr` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `dob` date NOT NULL,
  `marrital_status` enum('married','unmarried') NOT NULL,
  `nic` varchar(12) NOT NULL,
  `phone_no` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `phn`, `full_name`, `address`, `blood_gr`, `dob`, `marrital_status`, `nic`, `phone_no`) VALUES
(1, 2147483647, 'clark', 'kryptone', 'AB+', '2005-02-07', '', '123654789321', 879654123),
(2, 2147483647, 'NatashaRomanoff', 'palaly road', 'O+', '2002-09-16', '', '123654898878', 215487989),
(3, 2147483647, 'natasha', '128A mathavan road kalmunai', 'B+', '1992-07-08', 'unmarried', '123546468884', 779781737);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(10) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_no` int(10) NOT NULL,
  `role` enum('consultant','registrar','medical_officer','data_entry') NOT NULL,
  `password` varchar(300) NOT NULL,
  `status` enum('active','pending','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `full_name`, `email`, `phone_no`, `role`, `password`, `status`) VALUES
(1, 'tonystark', 'tonystark@gmail.com', 779978456, 'consultant', 'tony123', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission`
--
ALTER TABLE `admission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admission`
--
ALTER TABLE `admission`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
