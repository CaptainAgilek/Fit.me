-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost:3306
-- Vytvořeno: Ned 10. led 2021, 18:24
-- Verze serveru: 5.7.32-0ubuntu0.18.04.1
-- Verze PHP: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `user_team02`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `action`
--

CREATE TABLE `action` (
  `action_id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `max_capacity` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `action`
--

INSERT INTO `action` (`action_id`, `place_id`, `date`, `time`, `price`, `trainer_id`, `max_capacity`, `name`, `photo_id`) VALUES
(35, 30, '2020-11-29', '10:00:00', '200.00', 21, 15, 'Yoga pro začátečníky', 196),
(54, 30, '2020-11-29', '10:15:00', '200.00', 21, 10, 'Lekcia Boxu', 203),
(72, 40, '2021-01-13', '10:00:00', '200.00', 21, 10, 'Kruhový Trénink', 222),
(73, 40, '2021-01-11', '10:00:00', '200.00', 139, 7, 'Lekce Boxu', 223),
(74, 40, '2021-01-11', '09:00:00', '200.00', 21, 20, 'Strala Jóga', 224),
(77, 43, '2021-01-14', '10:00:00', '200.00', 21, 10, 'Pilates', 230),
(78, 43, '2021-01-13', '17:00:00', '200.00', 139, 6, 'Lekce Boxu', 231),
(79, 43, '2021-01-12', '11:00:00', '200.00', 140, 5, 'Kruhový Trénink', 232),
(80, 30, '2021-01-13', '10:00:00', '200.00', 21, 10, 'Lekce Pilates', 233);

-- --------------------------------------------------------

--
-- Struktura tabulky `benefit`
--

CREATE TABLE `benefit` (
  `benefit_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `benefit`
--

INSERT INTO `benefit` (`benefit_id`, `name`) VALUES
(2, 'Active Pass'),
(1, 'Multisport');

-- --------------------------------------------------------

--
-- Struktura tabulky `benefit_user`
--

CREATE TABLE `benefit_user` (
  `benefit_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `benefit_user`
--

INSERT INTO `benefit_user` (`benefit_id`, `user_id`) VALUES
(1, 1),
(1, 37),
(2, 37),
(1, 40),
(2, 40),
(1, 67),
(2, 67),
(1, 104),
(2, 116),
(1, 141);

-- --------------------------------------------------------

--
-- Struktura tabulky `organization`
--

CREATE TABLE `organization` (
  `user_id` int(11) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `organization`
--

INSERT INTO `organization` (`user_id`, `organization_name`, `username`, `phone`) VALUES
(104, 'Fit Up Sportoviště', 'Fit Up', '999888777'),
(111, 'Fitup', '', ''),
(116, 'newOrgName', 'newUsernames', '333333333'),
(130, 'Jan Jaroš', 'Jan Jaroš', ''),
(138, 'Xplore Fitness', 'Xplore Fitness', ''),
(141, 'Euforie Fitness', 'Euforie Fitness', '420923571');

-- --------------------------------------------------------

--
-- Struktura tabulky `organization_trainer`
--

CREATE TABLE `organization_trainer` (
  `organization_id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `organization_trainer`
--

INSERT INTO `organization_trainer` (`organization_id`, `trainer_id`, `description`) VALUES
(69, 19, NULL),
(104, 18, 'Tobias je licencovaným fitness trenérem 1. kvalifikačního stupně. Pomůže Vám s tréninkem na získání lepší kondice a formování postavy pro muže i ženy.  Těší se na váš společný trénink, vidíme se ve fitku!'),
(104, 21, 'Prioritou této všestranné trenérky je aby člověk cvičil se správnou technikou, pořádně si zamakal a zlepšoval se každým jedním tréninkem.'),
(138, 18, 'Tobias je licencovaným fitness trenérem 1. kvalifikačního stupně. Pomůže Vám s tréninkem na získání lepší kondice a formování postavy pro muže i ženy.  Těší se na váš společný trénink, vidíme se v Xplore Fitness!'),
(138, 21, 'Prioritou této všestranné trenérky je aby člověk cvičil se správnou technikou, pořádně si zamakal a zlepšoval se každým jedním tréninkem.'),
(138, 139, NULL),
(141, 21, 'Prioritou této všestranné trenérky je aby člověk cvičil se správnou technikou, pořádně si zamakal a zlepšoval se každým jedním tréninkem.'),
(141, 139, 'Filip je licencovaným fitness trenérem 1. kvalifikačního stupně. Pomůže Vám s tréninkem na získání lepší kondice a formování postavy pro muže i ženy. Těší se na váš společný trénink, vidíme se ve fitku!'),
(141, 140, 'Prioritou této všestranné trenérky je aby člověk cvičil se správnou technikou, pořádně si zamakal a zlepšoval se každým jedním tréninkem.');

-- --------------------------------------------------------

--
-- Struktura tabulky `photo`
--

CREATE TABLE `photo` (
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `gallery_name` varchar(255) DEFAULT NULL,
  `photo_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `photo`
--

INSERT INTO `photo` (`photo_id`, `user_id`, `description`, `url`, `gallery_name`, `photo_type_id`) VALUES
(1, 1, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 0),
(70, 32, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/3e51bc24abd20c8f42170b13bcab5ddf.jpg', NULL, 1),
(71, 69, NULL, 'http://localhost:4000/photos/589786.jpg', NULL, 0),
(72, 67, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/white-cockatoo-144761817-5c62f84846e0fb0001f08faf.jpg', NULL, 1),
(73, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/white-cockatoo-144761817-5c62f84846e0fb0001f08faf.jpg', NULL, 0),
(81, 70, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/11001902821_97f5b5f029e4e3fe4707_192.jpg', NULL, 0),
(82, 37, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/61wTAtTXzEL._AC_SY450_.jpg', NULL, 0),
(85, 1, NULL, 'http://localhost:4000/photos/noun_Shop_1112649.png', NULL, 0),
(86, 1, NULL, 'http://localhost:4000/photos/MicrosoftTeams-image (3).png', NULL, 0),
(87, 1, NULL, 'http://localhost:4000/photos/image 20.png', NULL, 0),
(88, 1, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 0),
(89, 1, NULL, 'http://localhost:4000/photos/tc.PNG', NULL, 0),
(90, 1, NULL, 'http://localhost:4000/photos/MicrosoftTeams-image (3).png', NULL, 0),
(91, 1, NULL, 'http://localhost:4000/photos/125771865_3424038524353704_582726282322304471_n.jpg', NULL, 0),
(92, 1, NULL, 'http://localhost:4000/photos/125771865_3424038524353704_582726282322304471_n.jpg', NULL, 0),
(93, 1, NULL, 'http://localhost:4000/photos/MicrosoftTeams-image (3).png', NULL, 0),
(94, 1, NULL, 'http://localhost:4000/photos/MicrosoftTeams-image (3).png', NULL, 0),
(95, 1, NULL, 'http://localhost:4000/photos/125771865_3424038524353704_582726282322304471_n.jpg', NULL, 0),
(96, 1, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 0),
(97, 1, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 0),
(98, 1, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 0),
(99, 1, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 0),
(100, 1, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 0),
(104, 3, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/white-cockatoo-144761817-5c62f84846e0fb0001f08faf.jpg', NULL, 1),
(118, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(119, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(120, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(121, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(122, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(123, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(124, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(125, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(126, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(127, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(128, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(129, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(130, 69, NULL, 'http://localhost:4000/photos/DowHowTrendSetup.png', NULL, 4),
(131, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(132, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(133, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(134, 69, NULL, 'http://localhost:4000/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(135, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(136, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(137, 69, NULL, 'http://localhost:4000/photos/ic.PNG', NULL, 4),
(138, 69, NULL, 'http://localhost:4000/photos/old.PNG', NULL, 4),
(139, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(140, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(149, 69, NULL, 'http://localhost:4000/photos/EA.exe', NULL, 4),
(150, 69, NULL, 'http://localhost:4000/photos/EA.exe', NULL, 4),
(151, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(152, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(153, 104, NULL, 'http://localhost:4000/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(154, 104, NULL, 'http://localhost:4000/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(155, 69, NULL, 'http://localhost:4000/photos/29513017_1808490382779340_4708255709132221035_n.jpg', NULL, 4),
(156, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/ic.PNG', NULL, 4),
(157, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 4),
(158, 104, NULL, 'http://localhost:4000/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(159, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/26731606_2026867840904146_2350529294803134639_n.jpg', 'DEFAULT', 3),
(160, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/29513017_1808490382779340_4708255709132221035_n.jpg', 'DEFAULT', 3),
(161, 104, NULL, 'http://localhost:4000/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(162, 104, NULL, 'http://localhost:4000/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(163, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/61wTAtTXzEL._AC_SY450_.jpg', NULL, 3),
(164, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/61wTAtTXzEL._AC_SY450_.jpg', NULL, 4),
(165, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga.jpeg', NULL, 4),
(166, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/170905-working-out-group-ac-512p_2b5db137b66bedb7f1d96c24b8ca1b8a.fit-760w.jpg', NULL, 4),
(167, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/360_F_362844988_REcxEHkuES4svxVQYT6GhlhfcsY1BcLS.jpg', NULL, 4),
(168, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/Kruhový Tréning.jpg', 'DEFAULT', 3),
(169, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga.jpeg', NULL, 4),
(170, 21, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/anastase-maragos-ZUBNPRZsQvk-unsplash-copy.jpg', NULL, 1),
(171, 18, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/alonso-reyes-0HlI76m4jxU-unsplash-copy.jpg', NULL, 1),
(172, 104, NULL, 'http://localhost:4000/photos/Fit-Up.jpg', NULL, 1),
(173, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(176, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Fit-Up.jpg', NULL, 1),
(177, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Fit-Up.jpg', NULL, 1),
(178, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Fit-Up.jpg', NULL, 1),
(179, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(180, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(181, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Fit-Up.jpg', NULL, 1),
(182, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(183, 69, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/26731606_2026867840904146_2350529294803134639_n.jpg', NULL, 1),
(184, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga.jpeg', NULL, 4),
(185, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga.jpeg', NULL, 4),
(186, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Kruhový Tréning.jpg', NULL, 4),
(187, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Kruhový Tréning.jpg', NULL, 4),
(188, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(189, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(190, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(191, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(192, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(193, 104, NULL, 'http://localhost:4000/photos/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 1),
(194, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga training.jpg', NULL, 4),
(195, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga training.jpg', NULL, 4),
(196, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga training.jpg', NULL, 4),
(197, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Kruhový Tréning.jpg', NULL, 4),
(198, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(199, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(200, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(201, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(202, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/Yoga.jpeg', NULL, 3),
(203, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(204, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/box.jpg', NULL, 3),
(205, 40, NULL, 'http://localhost:4000/photos/5638848_hejtmanka-jermanova-kalousek-stredocesky-kraj-v0.jpg', NULL, 1),
(215, 116, NULL, 'http://localhost:4000/photos/kalouseksluk-586x401.jpg', NULL, 1),
(216, 123, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/white-cockatoo-144761817-5c62f84846e0fb0001f08faf.jpg', NULL, 1),
(218, 126, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/61wTAtTXzEL._AC_SY450_.jpg', NULL, 1),
(219, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/cockatoo-walking-cacatua-alba-768x668.jpg', NULL, 3),
(220, 104, NULL, 'http://localhost:4000/photos/bruce-mars-gJtDg6WfMlQ-unsplash.jpg', NULL, 4),
(221, 37, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/carl-barcelo-nqUHQkuVj3c-unsplash.jpg', NULL, 1),
(222, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/kruhovyTrenink.jpg', NULL, 4),
(223, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/hermes-rivera-qbf59TU077Q-unsplash.jpg', NULL, 4),
(224, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga training.jpg', NULL, 4),
(225, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Snímka obrazovky 2021-01-10 o 14.40.49.png', NULL, 1),
(226, 139, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/anastase-maragos-7kEpUPB8vNk-unsplash.jpg', NULL, 1),
(227, 140, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Yoga.jpeg', NULL, 1),
(228, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Snímka obrazovky 2021-01-10 o 15.03.08.png', NULL, 1),
(229, 141, NULL, 'http://localhost:4000/photos/box.jpg', NULL, 4),
(230, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/bruce-mars-gJtDg6WfMlQ-unsplash.jpg', NULL, 4),
(231, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(232, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/Kruhový Tréning.jpg', NULL, 4),
(233, 104, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/bruce-mars-gJtDg6WfMlQ-unsplash.jpg', NULL, 4),
(234, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/box.jpg', 'DEFAULT', 3),
(235, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/Yoga training.jpg', 'DEFAULT', 3),
(236, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/box2.jpg', 'DEFAULT', 3),
(237, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/posilovna.jpg', 'DEFAULT', 3),
(238, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/cinky.jpg', 'DEFAULT', 3),
(239, 141, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/box.jpg', NULL, 4),
(240, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/anastase-maragos-7kEpUPB8vNk-unsplash.jpg', NULL, 4),
(241, 138, NULL, 'http://dev.backend.team02.vse.handson.pro/photos/organizations/anastase-maragos-7kEpUPB8vNk-unsplash.jpg', NULL, 3);

-- --------------------------------------------------------

--
-- Struktura tabulky `photo_type`
--

CREATE TABLE `photo_type` (
  `photo_type_id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `photo_type`
--

INSERT INTO `photo_type` (`photo_type_id`, `type_name`) VALUES
(4, 'ACTION'),
(2, 'BANNER'),
(3, 'OTHER'),
(1, 'PROFILE_PICTURE');

-- --------------------------------------------------------

--
-- Struktura tabulky `place`
--

CREATE TABLE `place` (
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `place`
--

INSERT INTO `place` (`place_id`, `user_id`, `city`, `street`, `zip`, `country`) VALUES
(1, 1, 'Praha 6', 'Dejvická', 42, ''),
(4, 3, 'city', NULL, NULL, 'Nebraska'),
(5, 3, 'Snowhill', NULL, NULL, 'Oregon'),
(14, 32, 'Mesto', 'ulice', 123, 'Cesko'),
(15, 34, '', 'dsadasdasda', 44434, ''),
(16, 69, 'Praha', 'mojeulice', 42123, 'Česko'),
(17, 40, 'adasdas', 'dasdasd', 33333, 'dasdas'),
(19, 37, 'Bratislava', 'Starovinohradská', 98249, 'Slovensko'),
(20, 67, '', 'Ulice 2700', 50000, ''),
(22, 111, 'Bratislava', 'Starovinohradská', 98249, 'Slovensko'),
(23, 116, 'daasd', 'dasdasd', 33333, 'dDsda'),
(24, 116, 'changedCity', 'changedStreet', 22222, 'dsadasd'),
(25, 116, 'daasd', 'dasdasd', 33333, 'dDsda'),
(26, 116, 'daasd', 'dasdasd', 33333, 'dDsda'),
(27, 116, 'daasd', 'dasdasd', 33333, 'dDsda'),
(28, 116, 'changedCity', 'changedStreet', 22222, 'dsadasd'),
(30, 104, 'Praha', 'Vinohradská 190', 13000, 'Czechia'),
(31, 126, 'Bratislava', 'Ilkovičova 2961', 84104, 'Slovensko'),
(36, 123, 'test', 'Ulice 27', 50000, 'teststat'),
(38, 130, 'tstets', 'test', 25878, 'Czechia'),
(39, 137, 'Praha ', 'Růžová', 25878, 'Česko'),
(40, 138, 'Praha', 'Na Příkopě', 11000, 'Česko'),
(41, 139, 'Praha', 'Ilkovičova ', 11000, 'Česko'),
(42, 140, 'Praha', 'Starovinohradská', 11000, 'Česko'),
(43, 141, 'Praha', 'Štefánikova', 11000, 'Česko');

-- --------------------------------------------------------

--
-- Struktura tabulky `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `stars` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `organization_id`, `text`, `stars`) VALUES
(1, 67, 104, '“Přátelská atmosféra a kvalitní trenéři  :) “', 4),
(2, 67, 123, '\"Nejlepsi trener na svete\"', 5),
(3, 67, 126, '\"Super tréner\"', 5),
(20, 37, 141, 'Skvelá skúsenosť. Určite návštevu zopakujem!', 4),
(21, 37, 138, 'Vrelo odporúčam lekcie boxu! Tréner dá zabrať, človek však ani nezbadá ako tá hodina rýchlo ubehne. ', 5);

-- --------------------------------------------------------

--
-- Struktura tabulky `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(4, 'ROLE_ORGANIZATION'),
(2, 'ROLE_SPORTSMAN'),
(3, 'ROLE_TRAINER'),
(1, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Struktura tabulky `role_user`
--

CREATE TABLE `role_user` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `role_user`
--

INSERT INTO `role_user` (`role_id`, `user_id`) VALUES
(1, 1),
(2, 1),
(1, 3),
(2, 3),
(1, 18),
(2, 18),
(1, 19),
(2, 19),
(1, 21),
(2, 21),
(1, 22),
(2, 22),
(1, 23),
(2, 23),
(1, 32),
(2, 32),
(1, 34),
(2, 34),
(1, 35),
(2, 35),
(1, 36),
(2, 36),
(1, 37),
(2, 37),
(1, 38),
(2, 38),
(1, 40),
(2, 40),
(1, 50),
(2, 50),
(1, 60),
(2, 60),
(1, 67),
(2, 67),
(1, 69),
(2, 69),
(1, 70),
(2, 70),
(1, 74),
(2, 74),
(1, 91),
(2, 91),
(1, 104),
(4, 104),
(1, 111),
(4, 111),
(1, 116),
(4, 116),
(1, 118),
(1, 119),
(1, 120),
(1, 121),
(1, 122),
(1, 123),
(3, 123),
(1, 124),
(3, 124),
(1, 125),
(3, 125),
(1, 126),
(3, 126),
(1, 128),
(3, 128),
(1, 130),
(4, 130),
(1, 131),
(3, 131),
(1, 137),
(4, 137),
(1, 138),
(4, 138),
(1, 139),
(3, 139),
(1, 140),
(3, 140),
(1, 141),
(4, 141);

-- --------------------------------------------------------

--
-- Struktura tabulky `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `service`
--

INSERT INTO `service` (`service_id`, `name`, `description`) VALUES
(6, 'AERIAL JÓGA', 'POJĎME SPOLEČNĚ CVIČIT'),
(7, 'GRAVID JÓGA', 'POJĎME SPOLEČNĚ CVIČIT'),
(8, 'HOT JÓGA', 'POJĎME SPOLEČNĚ CVIČIT'),
(9, 'STRALA JÓGA', 'POJĎME SPOLEČNĚ CVIČIT'),
(10, 'JÓGA PRO ZAČÁTEČNÍKY', 'POJĎME SPOLEČNĚ CVIČIT'),
(11, 'BODY PUMP', 'POJĎME SPOLEČNĚ CVIČIT'),
(12, 'KRAV MAGA', 'POJĎME SPOLEČNĚ CVIČIT'),
(13, 'THAI BOX', 'POJĎME SPOLEČNĚ CVIČIT'),
(14, 'KRUHOVÝ TRÉNINK', 'POJĎME SPOLEČNĚ CVIČIT'),
(15, 'SOUKROMÉ LEKCE', 'POJĎME SPOLEČNĚ CVIČIT'),
(16, 'SPORTOVNÍ AEROBIK', 'POJĎME SPOLEČNĚ CVIČIT'),
(17, 'PILATES', 'POJĎME SPOLEČNĚ CVIČIT'),
(18, 'PLAVÁNÍ', 'POJĎME SPOLEČNĚ CVIČIT'),
(19, 'POLE DANCE', 'POJĎME SPOLEČNĚ CVIČIT'),
(20, 'ZUMBA', 'POJĎME SPOLEČNĚ CVIČIT');

-- --------------------------------------------------------

--
-- Struktura tabulky `sportsman`
--

CREATE TABLE `sportsman` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `sportsman`
--

INSERT INTO `sportsman` (`user_id`, `firstname`, `lastname`, `username`, `phone`) VALUES
(1, 'dasdasd', 'dasdas', 'BílejTesák', '123456789'),
(3, 'Jerhemy', 'Kingkongo', 'The Bigg Monkey', NULL),
(18, 'Karel', 'Omáčka', NULL, NULL),
(19, 'Karel', 'Omáčka', NULL, NULL),
(21, 'Van', 'Hellsing', NULL, NULL),
(22, 'Andrej', 'Babitch', NULL, NULL),
(23, 'Andrejko', 'Bureš', NULL, NULL),
(32, 'Láďa', 'Vagner', 'MasterHacker', '123456789'),
(34, 'Velkej', 'John', 'Rambo', '777777'),
(35, 'Martin', 'Kid', 'billythekid', NULL),
(36, 'Lenka', 'Brandova', 'Lenka', NULL),
(37, 'Lenka', 'Brand', 'Lena', '420923571'),
(38, 'adam', 'lancaric', 'adamusos', NULL),
(40, 'Adamra', 'lancaric', 'adam.lancaric', NULL),
(50, 'Jeremy', 'BigBoy', 'kokos', NULL),
(60, 'asdads', 'sadassa', 'asdsadas', NULL),
(67, 'Petr', 'Šimandl', 'simp06', '123456789'),
(69, 'Boris', 'Testovačenko', 'Testik', '123456789'),
(70, 'Tomáš', 'Horáček', 'heracek', NULL),
(91, 'test', 'test', 'test@test.cz', NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `trainer`
--

CREATE TABLE `trainer` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `trainer`
--

INSERT INTO `trainer` (`user_id`, `firstname`, `lastname`, `username`, `facebook`, `instagram`, `phone`, `description`) VALUES
(3, 'Karel', 'Novák', 'Novičok', 'novacek.fb', '@kajanovak', '', NULL),
(18, 'Tobias', 'Reuter', 'TReuter', 'tobias.reuter.37', '@tobiasreuter', '', NULL),
(19, 'Alojs', 'Trenerko', 'Trenky', 'alois.fb', 'alois.ig', '', NULL),
(21, 'Sofia', 'Taty', 'Sofiataty', 'sofia.taty', '@sofiatatyfitness', '', NULL),
(123, 'jestelepsi', 'trenerek', 'trener06', NULL, NULL, '000111444', NULL),
(124, 'Leni', 'Brand', 'Lenka', NULL, NULL, '', NULL),
(125, 'Lenka', 'Brandova', 'xbrandova', NULL, NULL, '', NULL),
(126, 'Peter', 'Szollosi', 'Alexander', NULL, NULL, '123456789', 'Zima je ideálny čas na šport. Zabavia sa deti aj dospelí. Prvá lekcia zdarma'),
(128, 'Jirka', 'Ovcacek', 'ovci muz', NULL, NULL, '', NULL),
(131, 'Jan', 'Jaroš', 'ext_jjaros', NULL, NULL, NULL, NULL),
(139, 'Filip', 'Wagner', 'Filip Wagner', NULL, NULL, '420923571', 'Filip je licencovaným fitness trenérem 1. kvalifikačního stupně. Pomůže Vám s tréninkem na získání lepší kondice a formování postavy pro muže i ženy.  Těší se na váš společný trénink!'),
(140, 'Dominika', 'Kľučková', 'Dominika ', NULL, NULL, '420923571', 'Prioritou této všestranné trenérky je aby člověk cvičil se správnou technikou, pořádně si zamakal a zlepšoval se každým jedním tréninkem.');

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verification_token` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `verification_token`, `is_verified`) VALUES
(1, 'martinsedlacek7@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$w3SFq0xCfCGTMOluAjrJkg$dUCgFEMNQSxiJLB0sXKzs9WyHKRL3NecaTrUPF0aASY', '1603986108526509369067115', 1),
(3, 'koef', '$argon2i$v=19$m=4096,t=3,p=1$pvrEvey+g1i4ksPsOWJqBg$xs/OcuB17zdRrvIi9ZKMEQJUxtMiIB2M6/wDvcv9oBs', '1604337129720769686927827', 0),
(18, 'test_usery@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$flHBZQOjQH+KbzeXPx8AKg$9HpUHlargxZMud/ZQzK+GQStXVy7ri71BiR4H/hGBHM', '16045108516334253884806', 1),
(19, 'test_userz@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$8ze6xU2NIGlGOaF7nKOiZg$YvmexP+sG7Xk91J7eP6RLOXtcyAA+jnFrrh+QykZ0c', '1604510870385527040555228', 0),
(21, 'test_user5@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$R4ocSNUYc28L1n1A4RhczA$SgccbeYiq3jlnsIaDCOOhoTJYWe2zCHxNCNPMDjyqvI', '1604514075826521913602821', 1),
(22, 'test_user6@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$Tx6mTdwfvwEIz99F6nNkGA$WN+C8uMYCpPwJ33So4r5KUtNIuP9F0yUOtnuDrKP5UA', '1604514109923609580549974', 0),
(23, 'test_user7@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$O18gKj1kmko4/e+X+X81+A$oveIUicQ2himYvCS6sPQYp2sY5FZTqWXzULBfbD7Z5Y', '160451412941723178279391', 0),
(32, 'progtestguru1@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$ZMZD673VCj1WMn0tY6yucg$T5T3v0cpm5bQVVVl96u+BZrwDCZ6EFeHHhZQZmmN0pg', '1604524741151606765585423', 0),
(34, 'test_user8@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$BNE65lUhiyxXMJLk7ffmJw$uBOYoq9kbEfNi6usWCk8OJuRZDWzWqV9wVxNUhYXjZg', '160460495924545106010455', 1),
(35, 'billy@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$4AnBAVEX0MYoC+7V7KE8sA$LwWIa4cATgdvxhPvBkrWKWz61EltbG85+DyYmhQk5mQ', '1604615859877565761769103', 1),
(36, 'lenka.brand@zoznam.sk', '$argon2i$v=19$m=4096,t=3,p=1$y40H5XmRhSaxWV81skkJ6Q$ypgh3lY5BYlD6IIuNtB+J66w2gCoTri5cVOAJFuEkys', '1604656561462806009806401', 1),
(37, 'brand.lenka@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$Dw+5kJQDo6ipiAmdTfv9WA$rbGODlBP2+tXg9lEs/szxj7J54057TXCX3PQjqiGG/Y', '1604656651179629220017301', 1),
(38, 'adadd@seznam.cz', '$argon2i$v=19$m=4096,t=3,p=1$LXPKxA8bmxUu4ps4AdLx9A$3LtsCeXA0nxPWF2qw/8fEn5FOQYDMS1J+tG1f+2ZxGU', '1604671279313359571921089', 1),
(40, 'adam.lancaric@post.cz', '$argon2i$v=19$m=4096,t=3,p=1$Io0hy+HR3NuD2SEkhG07Uw$Lv3UAvLN3KN66ZnDoAfc5MQwl8hFL4vJyHlOhrm7KL8', '1604671433960471454211956', 1),
(50, 'abcd@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$MuKurNeD4he0FAo/OQwv3w$d64kKeYjpMKwnDzCTm1q3/9ZvLIPGEkbBK722KrGHuM', '1604672080263634866503659', 0),
(60, 'sadssad@sakjs.alsk', '$argon2i$v=19$m=4096,t=3,p=1$ZXHGtOpzwx2G+ZjUrg8TYg$9VylBvPa4SMkRnxsiHcrBor0JBflejbezrGIp7u3MBk', '1604673812956676376847139', 0),
(67, 'simp06@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$TLSFkJ3Cmc/xkyeznzCeHg$AbgwFN6iGvFvTDvDklEJtu7/yiLs7T3rINSldpvBKEU', '1604842989787450381170368', 1),
(69, 'test_user10@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$YXcmaz353iDA0dHW++8zbQ$ZUAOpKiFSt/uX2zW6cZRpUfXvL2C2S/spUBAPH96e2g', '1604855179418704294046946', 1),
(70, 'tomas.horacek@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$V1f51w7utefUTz3CvdvLEw$Raj7x18/JyLxGN8H9yXVrIUso46u5YBPrNNYofRedRY', '1604937099708354570128020', 1),
(74, 'jarj10@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$g2q5aoFJ8GvRTfk1oO1XCw$rpHtI/gSEgRiD6C6BF7zqDgm4cV3tjF8G/klLuiisHY', '1605457062450621353203478', 1),
(91, 'ikea24@seznam.cz', '$argon2i$v=19$m=4096,t=3,p=1$7EgaSpTLqQgxPCxXfXhA2Q$c9xt1VxTIuo8dQnFpdrMzIAhH3m4U5LZEBaB3PIKN3w', '1605876010181316942154878', 0),
(104, 'info@fitup.cz', '$argon2i$v=19$m=4096,t=3,p=1$zxzSw6HUAEPjWqLED5brCw$gddUe0NC6+ewwvHIvoqz3UQvND5a/hAd3BlX5k0O/5I', '1605972155765113139708083', 1),
(111, 'bral06@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$dtJRGx2baJILaZQTU2CK2A$ba/EqgJyB5n+o9RVEJ0DciJ29Ve8a+Ux664OE5OA8L8', '1606222230626908045375590', 0),
(116, 'kolm15@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$opVaiSrfbjTgGXM8ZFlH4w$xzSFrfNxdkkUhR2+L7lMbPPf2XlsIaB6IBgdSLUeaMg', '1606485726235484022174044', 1),
(118, 'treuter@fit.me', '$argon2i$v=19$m=4096,t=3,p=1$4RP1guwvdy8c1H2FKTJU0g$SacdMALNvlLtpNmeEBbqiflYf4rMNXzbGtzfxbNKVR4', '1606734993232493312631866', 0),
(119, 'xbrandova@stuba.sk', '$argon2i$v=19$m=4096,t=3,p=1$fTgTGbZqx3XhCEwQrf9kxA$F9pS2EDFbkHpI4KWLhjajfcFxhxfoxZe31VXvFWkNC0', '1606811228366245403422600', 0),
(120, 'll.ll@gmai.com', '$argon2i$v=19$m=4096,t=3,p=1$/OSjTtavLNx9pvG10zlwiw$byZk2jly/jTw1c+269bpBswYsy/VW0TRS3mr0uF2QBw', '1606811329756971422485572', 0),
(121, 'test_123@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$w/50uPEx+/b4LJi2QgQRNw$7GsFI6OXRnjgZRXc2EEzXxHFXt+DrahXpVcaJcW4rIo', '1606982402622754938326383', 0),
(122, 'sofia@taty.com', '$argon2i$v=19$m=4096,t=3,p=1$vhZxiv2AmbMSoTEtTSR8bA$COLvPFK2mFFlI9/805sg7X+VV47DbNVsENwNtytX2sM', '160701283133859721849952', 0),
(123, 'nejlepsi@trener.com', '$argon2i$v=19$m=4096,t=3,p=1$TpBAnB49jNTJggjy1ZbTng$bG2QrD6o8xeJ1xXPXOofe3olmP7ignJxc3C81lnMyr4', '1607013093468316589643411', 1),
(124, 'test_111@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$J9gwasazqgELZT6c9exm+g$nXvOBiWfgVYJATnk8Nrl/8Sm7Nu84w25DQmaTyrt87Q', '1607065100112662706069737', 0),
(125, 'test_useryy@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$Otf3rl/xDj3MN+G2byWkVA$jg3HvhskjxwH2lrwkgIl6hvdUIWi4dM6uAne/2l3Xns', '1607065206995577137409118', 0),
(126, 'test_1111@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$ljtObTin6HKDjhlGR38MAQ$PoW6a0XU24MPWQRc57UxKcOaojWuFgj+p5ScNkD5gmE', '1607065496855104635596786', 1),
(128, 'ovcak@ovcin.cz', '$argon2i$v=19$m=4096,t=3,p=1$6zldvuLhMBPaSJoH/FL5aQ$Th2sbF2h70nKpN90aZ/SjUfNBtqAUtw6hTX6ZreM6m0', '1607262411410524581058316', 1),
(130, 'rockman.jj@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$UotL9ky7Pxeh4tIP5QdZZw$kQhko8jCEXjBj2uxZL/0rnm6sU5A7Rt+JphrwzZFr5Q', '160743785504739050542452', 1),
(131, 'jan.jaros123@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$ltGsTS00pas09f+AOkRK4g$tjsniUnnVYP7J9z0/VxKXA7LFu/yWZAXdSEJuttK250', '1607589397246289451071289', 1),
(137, 'info@fitnesscenter.cz', '$argon2i$v=19$m=4096,t=3,p=1$8ShvBPYt+VrdJHCnBDO4Kg$mWL3zfTXGqRP20nyCesWym3D9M+nEEq0n4q1kkcu4b0', '1610285189471988270326757', 0),
(138, 'info@xplorefitness.cz', '$argon2i$v=19$m=4096,t=3,p=1$MSZIRElN4Ll1DnQxurJadg$VDtcdnKPIYSNuPEzlbfjqbANoUahX8lSZPMUfMTni5s', '1610285360508192797303782', 1),
(139, 'wagner.filip@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$/qmn6pobDksgUtloKS/TwQ$ota1IjbCx/NeAyHzCakVoR5wh0Hg/T5dBLvxVhiFeUY', '1610286529993371744799231', 1),
(140, 'kluckova.dominika@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$W26/tfCjocYxt08h/Rxsmw$m1ivcRXj2egD9PLlmmeBo+nZQjYEzX+LXYcG3FL7A9U', '1610286866997368162581026', 1),
(141, 'info@euforiefitness.cz', '$argon2i$v=19$m=4096,t=3,p=1$s1y5rbKiepgJEZqnnvzm7g$A2xzDA03XpkK0OGCcpz5CnIpKRdweq9ZauM986X2wq8', '1610287205809311292222514', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `user_service`
--

CREATE TABLE `user_service` (
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `user_service`
--

INSERT INTO `user_service` (`user_id`, `service_id`) VALUES
(130, 6),
(131, 6),
(104, 7),
(130, 7),
(104, 8),
(130, 8),
(131, 8),
(140, 8),
(138, 9),
(128, 10),
(140, 10),
(123, 11),
(126, 11),
(139, 11),
(128, 12),
(104, 13),
(138, 13),
(140, 13),
(141, 13),
(128, 14),
(138, 14),
(141, 14),
(139, 15),
(140, 15),
(104, 17),
(123, 17),
(141, 17);

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `trainer_ibfk_1` (`trainer_id`),
  ADD KEY `photo_ibfk1` (`photo_id`);

--
-- Klíče pro tabulku `benefit`
--
ALTER TABLE `benefit`
  ADD PRIMARY KEY (`benefit_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Klíče pro tabulku `benefit_user`
--
ALTER TABLE `benefit_user`
  ADD PRIMARY KEY (`benefit_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Klíče pro tabulku `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `name` (`organization_name`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Klíče pro tabulku `organization_trainer`
--
ALTER TABLE `organization_trainer`
  ADD PRIMARY KEY (`organization_id`,`trainer_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Klíče pro tabulku `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `photo_user_ibfk_1` (`user_id`);

--
-- Klíče pro tabulku `photo_type`
--
ALTER TABLE `photo_type`
  ADD PRIMARY KEY (`photo_type_id`),
  ADD UNIQUE KEY `cddfdsf` (`type_name`);

--
-- Klíče pro tabulku `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`place_id`),
  ADD KEY `place_user_ibfk_1` (`user_id`);

--
-- Klíče pro tabulku `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rating_user` (`user_id`),
  ADD KEY `rating_org` (`organization_id`);

--
-- Klíče pro tabulku `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Klíče pro tabulku `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`role_id`,`user_id`),
  ADD KEY `role_user_ibfk_2` (`user_id`);

--
-- Klíče pro tabulku `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Klíče pro tabulku `sportsman`
--
ALTER TABLE `sportsman`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Klíče pro tabulku `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Klíče pro tabulku `user_service`
--
ALTER TABLE `user_service`
  ADD UNIQUE KEY `user_id` (`user_id`,`service_id`),
  ADD KEY `service_id` (`service_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `action`
--
ALTER TABLE `action`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT pro tabulku `benefit`
--
ALTER TABLE `benefit`
  MODIFY `benefit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `photo`
--
ALTER TABLE `photo`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;
--
-- AUTO_INCREMENT pro tabulku `place`
--
ALTER TABLE `place`
  MODIFY `place_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT pro tabulku `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT pro tabulku `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pro tabulku `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT pro tabulku `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `action`
--
ALTER TABLE `action`
  ADD CONSTRAINT `photo_ibfk1` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`photo_id`),
  ADD CONSTRAINT `trainer_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `benefit_user`
--
ALTER TABLE `benefit_user`
  ADD CONSTRAINT `benefit_user_ibfk_1` FOREIGN KEY (`benefit_id`) REFERENCES `benefit` (`benefit_id`),
  ADD CONSTRAINT `benefit_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Omezení pro tabulku `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Omezení pro tabulku `organization_trainer`
--
ALTER TABLE `organization_trainer`
  ADD CONSTRAINT `organization_trainer_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `organization_trainer_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `user` (`user_id`);

--
-- Omezení pro tabulku `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `place_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_org` FOREIGN KEY (`organization_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `rating_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Omezení pro tabulku `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `sportsman`
--
ALTER TABLE `sportsman`
  ADD CONSTRAINT `sportsman_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `trainer`
--
ALTER TABLE `trainer`
  ADD CONSTRAINT `trainer_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Omezení pro tabulku `user_service`
--
ALTER TABLE `user_service`
  ADD CONSTRAINT `user_service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
