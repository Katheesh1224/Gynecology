-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2024 at 12:47 PM
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
-- Database: `gynn`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission`
--

CREATE TABLE `admission` (
  `id` int(25) NOT NULL,
  `date` datetime NOT NULL,
  `phn` bigint(11) NOT NULL,
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
  `other` varchar(150) NOT NULL,
  `status` enum('admit','discharged') NOT NULL DEFAULT 'admit',
  `height` decimal(10,0) NOT NULL,
  `weight` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission`
--

INSERT INTO `admission` (`id`, `date`, `phn`, `bht`, `ward_no`, `consultant`, `allergy`, `past_obs`, `past_med`, `past_surg`, `hist_cancer`, `menstrual_hist`, `complaints`, `diagnosis`, `other`, `status`, `height`, `weight`) VALUES
(4, '2024-02-28 15:09:00', 12345678912, '232321/202', 21, 'y', 'Hello', '', '', '', '', '', 'Hi', 'cscsc', '', 'discharged', 0, 0),
(5, '2024-02-26 18:12:00', 85332145665, '123456/202', 21, 'x', 'hkjkks', '', '', '', 'N<Mmn,mn', '', 'mndm,nsmdns', '<MN<MN,mn,m', ' nM<N,mn,mn', 'discharged', 0, 0),
(6, '2024-02-25 15:19:00', 25836974100, '123456/123', 21, 'y', 'ngnggcb', '', '', '', 'fgncngvh', '', 'ghgjjgj', 'nfjnvnnbb', '', 'admit', 0, 0),
(8, '2024-03-06 15:26:00', 12345678902, '123456/123', 21, 'x', 'aaaaaaaaaaaaaaaaaaa', '', '', '', '', '', 'bbbbbbbbbbbbbbb', 'wwwwwwwwwwwwww', '', 'admit', 0, 0),
(9, '2024-03-16 15:28:00', 12345678903, '234567/202', 21, '', '', '', '', '', '', '', '', 'wwwwwwwwwwwwwwwww', 'aaaaaaaaaaaaaaaaaaaa', 'admit', 0, 0),
(10, '2024-03-06 15:29:00', 12345678904, '234567/202', 21, '', 'ddddddddddddddd', '', '', '', '', '', 'gggggggggggggggg', 'qqqqqqqqqqqqqqqqqq', '', 'discharged', 0, 0),
(11, '2024-03-06 15:31:00', 12345678905, '234567/202', 21, '', 'kkkkkkkkkkkkkkkkkk', '', '', '', '', '', 'tttttttttttttttttt', 'hhhhhhhhhhhhhhhhhhhhh', '', 'admit', 0, 0),
(12, '2024-02-25 16:47:00', 12345678907, '123456/202', 21, 'y', 'talking ', '', '', '', '', '', 'No complaints', 'Dia', '', 'admit', 180, 72),
(13, '2024-01-31 16:52:00', 12345678906, '874569/202', 21, 'z', 'Ieee', '', '', '', '', '', 'Compsoc, WIE', 'hjhjhhj', '', 'admit', 180, 80);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(20) NOT NULL,
  `phn` bigint(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `blood_gr` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `dob` date NOT NULL,
  `marrital_status` enum('married','unmarried') NOT NULL DEFAULT 'married',
  `nic` varchar(12) NOT NULL,
  `phone_no` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `phn`, `full_name`, `address`, `blood_gr`, `dob`, `marrital_status`, `nic`, `phone_no`) VALUES
(5, 12345678912, 'Vieronick', 'Jaffna', 'B+', '1999-02-22', 'unmarried', '', 771236543),
(6, 85332145665, 'Viero', 'Jaffna', 'A-', '2014-01-28', 'married', '123456789789', 771236543),
(7, 25836974100, 'Vieroooo', 'Jaffna', 'B+', '1999-02-02', '', '199924316876', 771236543),
(10, 12345678902, 'tharshani', 'Jaffna', 'O+', '2002-03-07', 'married', '200013456888', 771236543),
(11, 12345678903, 'gobini', 'Jaffna', 'AB+', '2024-03-12', 'married', '200012345689', 771236543),
(12, 12345678904, 'nerujani', 'Colombo', 'B-', '2024-03-07', 'married', '200012345678', 771236543),
(13, 12345678905, 'sneha', 'Jaffna', 'O+', '2024-02-27', 'married', '200045678916', 771236543),
(14, 12345678907, 'Vithurshi', 'Kokuvil', 'B+', '1998-05-26', 'unmarried', '199812345678', 774572497),
(15, 12345678906, 'Viththagi', 'Kondavil', 'A+', '1999-10-06', 'married', '199978945612', 774480178);

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
  `status` enum('active','pending','inactive') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `full_name`, `email`, `phone_no`, `role`, `password`, `status`) VALUES
(1, 'tonystark', 'tonystark@gmail.com', 779978456, 'consultant', 'tony123', 'active'),
(2, 'vieronicka', 'viero@gmail.com', 771236543, '', 'admin123', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission`
--
ALTER TABLE `admission`
  ADD PRIMARY KEY (`id`,`date`),
  ADD UNIQUE KEY `phn` (`phn`),
  ADD UNIQUE KEY `phn_2` (`phn`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`,`phn`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `phn` (`phn`);

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
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admission`
--
ALTER TABLE `admission`
  ADD CONSTRAINT `phnn` FOREIGN KEY (`phn`) REFERENCES `patient` (`phn`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
