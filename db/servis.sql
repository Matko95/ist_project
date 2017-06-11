-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2017 at 07:44 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servis`
--

-- --------------------------------------------------------

--
-- Table structure for table `automobil`
--

CREATE TABLE `automobil` (
  `id_automobil` int(11) NOT NULL,
  `podaci` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('nije stigao na red','popravlja se','popravljen') COLLATE utf8_unicode_ci DEFAULT NULL,
  `cena_popravke` double NOT NULL,
  `korisnik_id` int(11) NOT NULL,
  `popravka_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `automobil`
--

INSERT INTO `automobil` (`id_automobil`, `podaci`, `status`, `cena_popravke`, `korisnik_id`, `popravka_id`) VALUES
(21, 'golf 3 gti', 'popravlja se', 20000, 0, 0),
(22, 'nissan', 'nije stigao na red', 2000, 0, 0),
(26, 'adfdsa', 'popravlja se', 143324, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id_korisnik` int(11) NOT NULL,
  `korisnicko_ime` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id_korisnik`, `korisnicko_ime`, `lozinka`) VALUES
(1, 'adminee', 'admin'),
(2, 'ee', 'ee'),
(3, 'eee', 'ee'),
(4, 'afg', 'asgfsg');

-- --------------------------------------------------------

--
-- Table structure for table `popravka`
--

CREATE TABLE `popravka` (
  `id_popravka` int(11) NOT NULL,
  `deo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cena_dela` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `popravka`
--

INSERT INTO `popravka` (`id_popravka`, `deo`, `cena_dela`) VALUES
(1, 'tocak', 2500),
(2, 'MARINIJAe', 34343);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `automobil`
--
ALTER TABLE `automobil`
  ADD PRIMARY KEY (`id_automobil`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id_korisnik`);

--
-- Indexes for table `popravka`
--
ALTER TABLE `popravka`
  ADD PRIMARY KEY (`id_popravka`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `automobil`
--
ALTER TABLE `automobil`
  MODIFY `id_automobil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id_korisnik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `popravka`
--
ALTER TABLE `popravka`
  MODIFY `id_popravka` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
