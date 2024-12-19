-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2024 at 10:25 PM
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
-- Database: `gynaecology`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission`
--

CREATE TABLE `admission` (
  `id` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `phn` bigint(11) NOT NULL,
  `bht` varchar(11) NOT NULL,
  `ward_no` int(5) NOT NULL DEFAULT 21,
  `consultant` varchar(50) NOT NULL,
  `status` enum('admit','discharged') NOT NULL DEFAULT 'admit',
  `add_count` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission`
--

INSERT INTO `admission` (`id`, `date`, `phn`, `bht`, `ward_no`, `consultant`, `status`, `add_count`) VALUES
(1, '2024-02-29 12:07:00', 11223344556, '654123/2024', 21, 'x', 'admit', 1),
(2, '2024-09-03 12:49:00', 11223543556, '654123/2024', 21, 'x', 'admit', 1),
(5, '2024-09-02 12:22:00', 11223344556, '654123/2023', 21, 'y', 'admit', 2),
(6, '2024-09-04 17:38:00', 81223543557, '654123/2024', 21, 'y', 'admit', 1);

-- --------------------------------------------------------

--
-- Table structure for table `investigation`
--

CREATE TABLE `investigation` (
  `id` int(5) NOT NULL,
  `visit_id` int(5) NOT NULL,
  `fbc_wbc` int(5) NOT NULL,
  `fbc_hb` int(5) NOT NULL,
  `fbc_pt` int(5) NOT NULL,
  `ufr_wc` int(5) NOT NULL,
  `ufr_rc` int(5) NOT NULL,
  `ufr_protein` int(5) NOT NULL,
  `se_k` int(5) NOT NULL,
  `se_na` int(5) NOT NULL,
  `crp` int(5) NOT NULL,
  `fbs` int(5) NOT NULL,
  `ppbs_ab` int(5) NOT NULL,
  `ppbs_al` int(5) NOT NULL,
  `ppbs_ad` int(5) NOT NULL,
  `lft_alt` int(5) NOT NULL,
  `lft_ast` int(5) NOT NULL,
  `invest_other` varchar(15) NOT NULL,
  `scan_mri` varchar(50) NOT NULL,
  `scan_ct` varchar(50) NOT NULL,
  `uss_tas` varchar(50) NOT NULL,
  `uss_tus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medical_hx`
--

CREATE TABLE `medical_hx` (
  `id` int(25) NOT NULL,
  `phn` bigint(11) NOT NULL,
  `allergy` varchar(100) NOT NULL,
  `past_med` text NOT NULL,
  `past_med_other` varchar(150) NOT NULL,
  `past_surg` text NOT NULL,
  `past_surg_other` varchar(150) NOT NULL,
  `hx_diseases` varchar(150) NOT NULL,
  `hx_cancer` varchar(150) NOT NULL,
  `hx_cancer_other` varchar(150) NOT NULL,
  `diagnosis` varchar(150) NOT NULL,
  `other` varchar(150) NOT NULL,
  `height` decimal(10,0) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `menarche_age` int(4) NOT NULL,
  `menopausal_age` int(5) NOT NULL,
  `lmp` int(5) NOT NULL,
  `menstrual_cycle` enum('regular','irregular') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_hx`
--

INSERT INTO `medical_hx` (`id`, `phn`, `allergy`, `past_med`, `past_med_other`, `past_surg`, `past_surg_other`, `hx_diseases`, `hx_cancer`, `hx_cancer_other`, `diagnosis`, `other`, `height`, `weight`, `menarche_age`, `menopausal_age`, `lmp`, `menstrual_cycle`) VALUES
(1, 11223344556, 'peanut', 'Ishemic heart diseases, Hypertension, Bronchial asthma', 'jhgjhfg', 'Laparoscopic myomectomy, Tubal ligation', 'gjhfghf', 'jasud', 'Vulvular CA, Ovarian CA, Cervical CA', 'jhifjhh', 'hohwrowe', '', 164, 63, 25, 45, 24, 'regular'),
(2, 11223543556, 'hdfsdjd', 'Ishemic heart diseases, Arthritis, Renal diseases', 'dfd', 'Lower Segment Cesarian Section, Tubal ligation', '', 'nothing', 'Ovarian CA, Vulvular CA, Cervical CA', 'je', '', '', 164, 65, 25, 45, 24, 'regular'),
(3, 81223543557, '', 'Hypertension, Hypothyroidism, Renal diseases, Ishemic heart diseases', 'sdfsdsfsdf', 'Total abdominal hysterectomy, Tubal ligation', 'fd', '', 'Cervical CA, Ovarian CA', '', 'fdfsdsdfsf', '', 164, 63, 25, 45, 24, 'regular');

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
  `phone_no` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `phn`, `full_name`, `address`, `blood_gr`, `dob`, `marrital_status`, `nic`, `phone_no`) VALUES
(1, 12345678912, 'Vieronick', 'Jaffna', 'B+', '1999-02-22', 'unmarried', '', '771236543'),
(6, 85332145665, 'Viero', 'Jaffna', 'A-', '2014-01-28', 'married', '123456789789', '771236543'),
(7, 25836974100, 'Vieroooo', 'Jaffna', 'B+', '1999-02-02', '', '199924316876', '771236543'),
(10, 12345678902, 'tharshani', 'Jaffna', 'O+', '2002-03-07', 'married', '200013456888', '771236543'),
(11, 12345678903, 'gobini', 'Jaffna', 'AB+', '2024-03-12', 'married', '200012345689', '771236543'),
(12, 12345678904, 'nerujani', 'Colombo', 'B-', '2024-03-07', 'married', '200012345678', '771236543'),
(13, 12345678905, 'sneha', 'Jaffna', 'O+', '2024-02-27', 'married', '200045678916', '771236543'),
(14, 12345678907, 'Vithurshi', 'Kokuvil', 'B+', '1998-05-26', 'unmarried', '199812345678', '774572497'),
(15, 12345678906, 'Viththagi', 'Kondavil', 'A+', '1999-10-06', 'married', '199978945612', '774480178'),
(22, 54643134564, 'Jenny', 'Jaffna', 'A+', '0000-00-00', 'married', '123456789123', '1231546324'),
(24, 56456456456, 'Jenni', 'Jaffna', 'A+', '0000-00-00', 'married', '465455456456', '1548784545'),
(26, 56465454456, 'Jennuine', 'Jaffna', 'A+', '1998-06-27', 'unmarried', '985455456456', '1548784545'),
(28, 11223344556, 'Kayal', 'Jaffna', 'B-', '2001-02-07', 'married', '200042526248', '0777123456'),
(30, 11223543556, 'Jenny', 'Jaffna', 'AB+', '2008-02-14', 'married', '200142526248', '0777123456'),
(51, 81223543557, 'Jennitta', 'Jaffna', 'O+', '2000-09-11', 'unmarried', '200052526248', '0777123456');

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
(2, 'vieronicka', 'viero@gmail.com', 771236543, '', '$2a$10$epb9ppxqnhhGicjvodtbn.vz9.BMCiMp9Fk1wrZjtPKASUhOGgNve', ''),
(3, 'Kayal', 'kayal@gmail.com', 777123456, 'registrar', '$2a$10$udYOydxqrfOlv4FIO5CPE.tbsJOnF2tMZ9/g8589NaDHQGuMq8WX.', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `date` datetime NOT NULL,
  `visit_id` int(12) NOT NULL,
  `admission_id` int(5) NOT NULL,
  `visit_count` int(5) NOT NULL,
  `seen_by` varchar(25) NOT NULL,
  `complaints` text NOT NULL,
  `abnormal_bleeding` text NOT NULL,
  `complaint_other` text NOT NULL,
  `exam_bp` varchar(15) NOT NULL,
  `exam_pulse` int(10) NOT NULL,
  `exam_abdominal` text NOT NULL,
  `exam_gynaecology` text NOT NULL,
  `manage_minor_eua` text NOT NULL,
  `manage_minor_eb` text NOT NULL,
  `manage_major` text NOT NULL,
  `manage_medical` text NOT NULL,
  `manage_surgical` text NOT NULL,
  `diagnosis` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission`
--
ALTER TABLE `admission`
  ADD PRIMARY KEY (`id`,`date`),
  ADD KEY `phnnn` (`phn`);

--
-- Indexes for table `medical_hx`
--
ALTER TABLE `medical_hx`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `phnn` (`phn`);

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medical_hx`
--
ALTER TABLE `medical_hx`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admission`
--
ALTER TABLE `admission`
  ADD CONSTRAINT `phnnn` FOREIGN KEY (`phn`) REFERENCES `patient` (`phn`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medical_hx`
--
ALTER TABLE `medical_hx`
  ADD CONSTRAINT `phnn` FOREIGN KEY (`phn`) REFERENCES `patient` (`phn`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
