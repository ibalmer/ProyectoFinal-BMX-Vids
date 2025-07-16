-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2025 a las 00:25:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bmx_vids`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `publish_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `video_link` varchar(255) NOT NULL,
  `tags` text NOT NULL,
  `publish_date` datetime DEFAULT current_timestamp(),
  `author` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 1,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id`, `title`, `description`, `content`, `video_link`, `tags`, `publish_date`, `author`, `user_id`, `type_id`) VALUES
(149, 'Little Devil Criminal Mischief', 'A 2001 bmx bike video', 'A 2001 bmx bike video featuring Van Homan, Jason Enns, Garrett Byrnes, Kris Bennett, Marvin Loetterle, Josh Stricker, Pat Juliff, Nate Hanson, Matt Beringer, and more..', 'https://www.youtube.com/watch?v=AncLtID_yYQ', '2001, little devil', '2025-07-16 18:42:36', 'ivancito', 26, 1),
(150, 'Nike 6.0 \"Writing On The Walls\" #bmx Video', 'Nike 6.0 bmx video', 'Mind melter for its time. Parts from Mike Spinner, Nygel Sylvester, Dennis Enarson, and Garrett Reynolds..', 'https://www.youtube.com/watch?v=anffSO726d0', 'nike, street', '2025-07-16 18:44:40', 'ivancito', 26, 1),
(151, 'Pedal To The Metal Tour', 'Metal bmx video', 'Riders\nMike Aitken\nRuben Alcantara\nBrian Foster\nChase Hawk\nScotty Cranmer\nCorey Bohan\nJoe Rich\nHeath Pinter\nAllan Cooke.\n.', 'https://www.youtube.com/watch?v=WVnEDiWnj9Y', 'fly, odysey, fit', '2025-07-16 18:46:17', 'ivancito', 26, 1),
(152, 'Ride Bmx Flipside', 'Ride BMX\'s latest installment documents the encounters of four virtually unknown but immensley talented riders on their quest to Greenville, North Carolina, to hang with Dave Mirra', 'Ride BMX\'s latest installment documents the encounters of four virtually unknown but immensley talented riders on their quest to Greenville, North Carolina, to hang with Dave Mirra and some of the best pros in the sport. The roles are then reversed when the pros visit their cities to ride street. Watch as the likes of Mirra and Josh Harrnington throw down with street up and comers including Nigel Sylvester, E-man, Blackman, and more in one of the most unique and entertaining films ever to hit the sport. ', 'https://www.youtube.com/watch?v=RVtu94YOh34', 'ride, animal, fit', '2025-07-16 18:48:04', 'ivancito', 26, 1),
(153, 'Animal \"Cuts\"', 'Riders include Mike Brennan Mike Osso, Steven Hamilton, Nigel Sylvester, Bob Scerbo', '2010. Riders include Mike Brennan Mike Osso, Steven Hamilton, Nigel Sylvester, Bob Scerbo, Ralph Sinisi, Lino Gonzales, Dave Belcher, 90 East crew, Edwin De La Rosa, Garret Hoogerhyde, Tyrone Williams, Jared Washington, Butcher, Mark Gralla, Tom White, Wiz, Worms, Marv, Jeff Kocsis, Max Gaetig, and more....', 'https://www.youtube.com/watch?v=zxaWsHg_4ow', 'animal, street, 2010', '2025-07-16 18:50:36', 'ivancito', 26, 1),
(154, 'Anthem II', 'Riders include Mike Aitken, Brian Yeagle, Dirt Ron, Brian Foster, Mark Mulville, Eli Platt, Chase Hawk, Clint Reynolds, Chris Doyle, Geoff Slattery, Sean Burns, and more....', '\"Anthem embodies BMX in its purist most simplest form yet remains to this day one of the rawest BMX videos ever made. Its one of the few bike videos of that era that still make me want to go ride build trails, and support my scene\" -Chris f\'n Doyle. 2010', 'https://www.youtube.com/watch?v=xyQke0hrS-A', '2010, odysey, dirts, united', '2025-07-16 18:52:36', 'ivancito', 26, 1),
(155, 'Odyssey Electronical', 'odysey video 2006', 'Riders: Gary Young, Matt Beringer, Jimmy Levan, Kc Badger, Adam Banton, Taj Mihelich, Jim Bauer, Josh Betley, Mike Aitken, Jim Cielencki, Chase Hawk, Aaron Ross\n', 'https://www.youtube.com/watch?v=j6ja4JftCLA', '2006, street', '2025-07-16 18:56:14', 'ivancito', 26, 1),
(156, 'Demolition Last Chance', 'With added new riders to the already legendary team lineup', '\"With added new riders to the already legendary team lineup, we have one of the most creative and diverse teams to date.\" Featuring full sections from Chris Doyle, Dave Dillewaard, Jason Enns, Dave Osato, Ryan \"Biz\" Jordan, Christian Rigal, Connor Lodes, Alfredo Mancuso, Tate Roskelley, Dennis Enarson, Rob Wise, Daniel \"Lil-D\" Martinez and more...', 'https://www.youtube.com/watch?v=XwsbW7byRZA', '2011', '2025-07-16 18:58:43', 'ivancito', 26, 1),
(157, 'Deadline ', 'Filmed and Edited by Tony Ennis.', 'Filmed and Edited by Tony Ennis. Full parts from Garrett Reynolds, Ty Morrow, Steve Croteau, Augie Simoncini, Colin Varanyak, JJ Palmere, and Kevin Kiraly', 'https://www.youtube.com/watch?v=YC8iA1qjKNg', '2012, street', '2025-07-16 19:01:07', 'ivancito', 26, 1),
(158, 'Cult \" Let ‘Em Talk \" ', 'OGs already have this one memorized.', 'Riders\nChase Dehart\nChase Hawk\nDakota Roche\nAlex Kennedy\nSebastian Keep\nTrey Jones\nRussell Barone', 'https://www.youtube.com/watch?v=giiuNIOKJkU', 'cult', '2025-07-16 19:02:16', 'ivancito', 26, 1),
(159, 'Shadow Conspiracy  \"The Calling\" ', 'BMX Film, The Calling 2005', 'BMX Film, The Calling including Joe Simon, Ryan Sher, Byron Anderson, John Jennings, Alistair Whitton.', 'https://www.youtube.com/watch?v=dijgE1RIVGs', '2005, shadow', '2025-07-16 19:03:41', 'ivancito', 26, 1),
(160, 'Ride Bmx \"Insight\"  ', ' Insight was an extremely influential video (2008)', 'Insight was an extremely influential video for the time showcasing \"the process\" of filming a part, from getting clips, to the good, bad, and random moments between. get the perspectives of Dakota Roche, Chester Blacksmith, Darryl Tocco, Jared Washington, Mike Brennan, Davey Watson, and more.\nFilmed and edited by the great Ryan Navazio. ', 'https://www.youtube.com/watch?v=UclhHtfu3cc', 'bmx mag, 2008', '2025-07-16 19:04:51', 'ivancito', 26, 1),
(161, 'Shadow Conspiracy \"Into The Void\"', 'filmed in 2008', 'Riders, Chase Dehart, Dave Rytell, Karl Poynter, Seth Kimbrough, Alistair Whitton, Owain Clegg, Bjoern Elvering, Drew Bezanson Ryan Sher, Ricky Bates, Eli Platt, Johnny Devlin, Filmed and edited by Johnny Devlin', 'https://www.youtube.com/watch?v=bpCal8s7pt8', '2008, shadow', '2025-07-16 19:06:04', 'ivancito', 26, 1),
(162, 'United \" Dont Matter \" ', '(2007) Video', 'Riders\nTheo Simpson\nFriends & Fortes\nSteve Barrow\nJohn Dye\nKye Forte\nLeo Forte\nCorey Martinez\nIan Morris\nRyan Metro\nPeter Adam\nSteve Debusk\nGeoff Slattery\nRicky Feather\nCaleb Kilby\nRobin Fenlon\nBrian Tunney\nIan Morris\nTom Blyth\nRichard \'Cleggy\' Rowlands\nRyan Metro\nCaleb Kilby\nDean Hearne\nMike Ardelean\nNathan Williams 2007', 'https://www.youtube.com/watch?v=KmATGRudZNU', 'street, 2007', '2025-07-16 19:07:08', 'ivancito', 26, 1),
(163, 'Etnies Forward ', '#bmx Video (2002)', 'Full parts from Mike \"Rooftop\" Escimilla, Jason Enns, Sandy Carson, Brian Terrada, Garrett Byrnes, Edwin Delarosa, Josh Stricker, Joe Rich, Nathan Wessel, Ian Morris, Dave Freimuth, Taj Mihelich, and Ruben Alcantara. Lots of other shredders in the mix section, filmed and edited by Dave Parrick.', 'https://www.youtube.com/watch?v=2poPndL51HU', 'etnies, 2002', '2025-07-16 19:08:02', 'ivancito', 26, 1),
(164, 'SHUFFLE | Odyssey BMX', 'SHUFFLE through some sessions over the past year with the Odyssey crew. This collection of footage was captured during filming missions in California, Washington, Nevada, Texas, and South Africa. NOW PLAYING on odysseybmx.com.', 'In Order of Appearance: Preston Okert, Aryei Levenson, Murray Loubser, Corey Walsh, Gary Young, Santi Laverde, Boyd Hilder, Mikey Andrew, Devin Burks, Hilario Olivos, Johnny Raekes, Justin Spriet, John Nelson, Jacob Cable, Takato Ueda, Dennis Enarson, Matt Nordstrom, Perris Benegas, and Bethany Hedrick.\n\n\nVideo by Zach Krejmas\nTitle Art / Animation by Dave Fortman\nAdditional Filming by Phoenix Jurgens, Blake Peters, Scott Marceau, Rich Forne\nCover photo by Scott Marceau', 'https://www.youtube.com/watch?v=sZfM_MBvtqc', 'odysey', '2025-07-16 19:09:32', 'ivancito', 26, 2),
(165, 'Vans BMX Presents: KEVIN PERAZA, CON TODO  | VANS | BMX', 'Vans BMX is proud to present the latest short film from team rider Kevin Peraza, Con Todo, directed by filmmaker and friend Juani Zurita. Meaning “giving it all” or “with everything,” the film explores Kevin’s roots, highlighting his high-energy riding at', 'Con Todo is supported by Kevin’s latest Vans collaboration, the BMX Style 114 by Kevin Peraza. To see the full collection go to http://Vans.com/BMX\n \nVideo: Juani Zurita \nPhotography: Jeff Zielinski', 'https://www.youtube.com/watch?v=9B0RpT90SnQ', '', '2025-07-16 19:10:52', 'ivancito', 26, 2),
(166, 'Mark Burnett - Take Your Time - The Shadow Conspiracy', '\"I met Chadwick when I was 14. I was a skeletal version of who I am today. Imagine hand-picking a 14 year old kid to accompany a group of 20-somethings on the road as a 26 year old man. How do you do that? If you tried to discipline me at that age I proba', 'Here it is.  We are starting off 2018 with something huge. Shadow Rider Mark Burnett has been traveling, working his ass off, and collecting footage for two years to create this edit with filmer Ryan Chadwick.  Enjoy and here are a few words from Mark himself about his experience with Chadwick-', 'https://www.youtube.com/watch?v=11qhDF2NAlQ', 'shadow', '2025-07-16 19:11:44', 'ivancito', 26, 2),
(167, ' Miami Twice', 'It\'s been a minute since the guys were together on a trip so when we decided on Miami we knew we needed a heavy crew to go. \n\nWe joined Shadow Conspiracy and Subrosa pro riders Simone Barraco, Matt Ray, and Joris Coulomb together for a 10 day trip in the ', '\"Miami Twice\" is the first video in a little bit from us, but it kicked off the feelings we all love of BMX and riding with homies and they guys felt right at home while being on the road together. More to come! 👀', 'https://www.youtube.com/watch?v=kFmw93jmVEw', 'shadow, street', '2025-07-16 19:13:00', 'ivancito', 26, 2),
(168, 'BMX - Mike Stahl 2019 S&M Video', 'camera emoji: Grant C. Subscribe for more - https://www.youtube.com/user/sandmbik....', 'camera emoji: Grant C. Subscribe for more - https://www.youtube.com/user/sandmbik....', 'https://www.youtube.com/watch?v=LSY7ve2B45s', 'sym', '2025-07-16 19:15:00', 'ivancito', 26, 2),
(169, 'RAMBLER by S&M', 'LUKAS & NATE HALAHAN', 'Lukas Halahan nonchalantly blasts like he was born with a turbo button and Nathan Halahan is certified, Grade A(pe) good at riding little bikes on big piles of dirt. Both are already making good on  #lifegoals to roam around the world building and boosting said soil mounds for the foreseeable future. The Halahan brothers might be young, but they possess wisdom beyond their years, and they\'ve already figured out that it\'s the journey not the destination. Introducing Rambler - a new trail-centric line from S&M x Lukas & Nate Halahan. See you down the road... #shieldbmx #ramblers ', 'https://www.youtube.com/watch?v=lMFuqIXMn_w', 'dirt', '2025-07-16 19:16:01', 'ivancito', 26, 2),
(170, 'CLINT REYNOLDS\' S&M C.C.R.', 'It\'s pretty wild that Clint Reynolds has been on S&M for over 10 years now. What\'s even wilder is that he\'s been doing it on the same frame the whole time -- his dream rig... the S&M C.C.R. \n\nDon\'t fix it if it ain\'t broke! ', 'CCR Frame (21\" TT): https://www.sandmbikes.com/product/ha... - \nCredence XL Bar: https://www.sandmbikes.com/product/ha...\nCredence Turtleneck Stem: https://www.sandmbikes.com/product/ha...\nWidemouth Pitchfork: https://www.sandmbikes.com/product/ha...\nReynolds Grip: https://www.sandmbikes.com/product/ha...\nS&M Railed Seat: https://www.sandmbikes.com/product/ha...\nMainline Tire (2.4 in Front): https://www.sandmbikes.com/product/ha... 2.4 in Front\nTrackmark Tire (2.1 in Back): https://www.sandmbikes.com/product/ha... ', 'https://www.youtube.com/watch?v=oE9PF2XGIaM', 'dirt, sym', '2025-07-16 19:17:44', 'ivancito', 26, 2),
(171, 'Bone Deth CRIME VIDEO', 'Filmed and edited by Sean Burns \n\n“Crime” - 999\n“Punk Police” - Fancy Rosy', 'Bone Deth CRIME Frame Promo - featuring Adem Gunaydin, Albie Bennett, Josh Delarosa, Jordan O’Kane, Joshny Babu, James Rodriguez, Kert Petersel and Robby Nelson. ', 'https://www.youtube.com/watch?v=zVmFDk9ALtg', '', '2025-07-16 19:18:27', 'ivancito', 26, 2),
(172, 'Josh Delarosa Bike Check - Bone Deth', 'bike check', 'Josh Delarosa Bike Check - Bone Deth\nbonedethchurch.com\n@bone_deth @josh_delarosa_', 'https://www.youtube.com/watch?v=Na8YZ8PbgDo', 'bike check', '2025-07-16 19:19:30', 'ivancito', 26, 2),
(173, 'DECLAN MURRAY - A BONE DETH SPECIAL PRESENTATION', 'https://digbmx.com/project-x\nhttps://digbmx.com | http://www.digbmxstore.com | Subscribe to the DIG channel for more videos - http://bit.ly/DigBMX', 'The words \"creative\" and \"original\" can get thrown around pretty loosely, but if the Oxford Dictionary made a BMX version of their famous book, Bone Deth\'s Declan Murray would be under both of those definitions. We guarantee you\'ve not seen anything like this before... who needs bars anyway?!', 'https://www.youtube.com/watch?v=7YBXMxgwO0c', '', '2025-07-16 19:20:19', 'ivancito', 26, 2),
(174, 'JOSH DELAROSA - A BONE DETH SPECIAL PRESENTATION', 'Hold on to your hats for another wild Special Presentation from Bone Deth, this time with roof dwelling stunt man, Josh Delarosa. This is all killer, no filler! Roof to rail, a huge halfcab, and a host of bonkers setups, this is essential viewing. Shout o', 'Hold on to your hats for another wild Special Presentation from Bone Deth, this time with roof dwelling stunt man, Josh Delarosa. This is all killer, no filler! Roof to rail, a huge halfcab, and a host of bonkers setups, this is essential viewing. Shout out to Josh for keeping the roof game alive! ', 'https://www.youtube.com/watch?v=OY9H5UMKa54', '', '2025-07-16 19:21:07', 'ivancito', 26, 2),
(175, 'Bernardo Almeida - 100%V BMX 2014', 'Edición: \nGustavo Hoshino\n\nCámaras: \nGustavo Hoshino\nSebastian Perez (@perezeba)\nMarco Postiglione.\n\nMúsica: \nRadio Moscow - LuckyDutch', 'Bernardo Almeida (@berni_bmx) grabado en Septiembre 2014, web video para 100%V (@100porcientov).', 'https://www.youtube.com/watch?v=mv7-IB1Zd5E', '', '2025-07-16 19:22:18', 'ivancito', 26, 2),
(176, 'Mariano Cappelletti - Ene Ene Bikes x 100%V - 2015', 'Edición: \nGustavo Hoshino\n\nCámaras: \nGustavo Hoshino\nLeandro Dalto\n\nMúsica: \nThe Stone Roses - Love Spreads.', 'Mariano Cappelletti (@cappellettimariano) grabado entre Marzo y Mayo de 2015, web video para Ene Ene Bikes (@eneenebikes) en conjunto con 100%V BMX (@100poricnetov).', 'https://www.youtube.com/watch?v=K3xGYT2m_98', '', '2025-07-16 19:23:18', 'ivancito', 26, 2),
(177, 'BURN IT TO THE GROUND - SWAMPFEST 2025', 'The culmination of one hell of a weekend in Waldo, Floarida! It\'s difficult to give an actual sense of the madness that is Swampfest, but here goes. Enjoy!\n\nVideo by Rob Dolecki\n', 'The culmination of one hell of a weekend in Waldo, Floarida! It\'s difficult to give an actual sense of the madness that is Swampfest, but here goes. Enjoy!\n\nVideo by Rob Dolecki\n', 'https://www.youtube.com/watch?v=b1asgmJHZF0', '', '2025-07-16 19:24:05', 'ivancito', 26, 3),
(178, 'Huge BMX Street Series Jam in Berlin Germany', 'Some of the best riders in Germany plus various members of the Monster Energy team all gathered in Berlin yesterday for the third Street Series stop. Dan Lacey, Nathan Williams, Ed Zunda and Fernando Laczko were on hand from the Monster team but a lot of ', 'Over 400 BMX riders gathered in Berlin, Germany for a huge Street Jam and insane riding went down. SUBSCRIBE for more: http://bit.ly/1gYdZLu', 'https://www.youtube.com/watch?v=yNYDkt7b7uE', '', '2025-07-16 19:25:10', 'ivancito', 26, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_post`
--

CREATE TABLE `type_post` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_post`
--

INSERT INTO `type_post` (`id`, `name`) VALUES
(1, 'full videos'),
(2, 'web videos'),
(3, 'event videos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `user_name`, `name`, `last_name`, `user_password`, `email`, `user_type`) VALUES
(1, 'ibalmer', 'Ivan', 'Balmer', '$2b$10$lkpZtDGO7X/qzvBtrBuc2.p672JcBZ.t60RV4bd6d0Gsy.znduZmy', 'ivan@balmersin.com', 'admin'),
(21, 'cirqupipa', 'Leonardo', 'Garcia', '$2b$10$tK6beUAy03hUHY/oaTGStORGOQkXYcnVVUsvxHD8G3dZbPDRmSfe2', 'leonardo_garcia@ramon.com', 'admin'),
(22, 'jesica', 'jesica', 'juarez', '$2b$10$PzLB7PwuxHLVHKWcoRCMm.qerUIfnlPcqyWhTgJysUy1NEC2Y0R6S', 'jesica@juarez.com', 'user'),
(23, 'jesijesi', 'jesica', 'juarez', '$2b$10$k1ALweZHSJ4Qc0pOtUViv.fyhIaECbdHsS37YDKUx8.oOkJEYbbpW', 'jesi@hola.com', 'admin'),
(24, 'el_balmer', 'ivan', 'balmer', '$2b$10$aXsJYwKWqGNCVDkcvanTYuBZiGFzZbHRDyv5BZ/FU5HrmqoJRm0be', 'ivan@prueba.com', 'user'),
(25, 'el_leo_garcia', 'leonardo', 'garcia', '$2b$10$mvr40EWDenau/nprHagMTu.xvCN2gioFikOq.CSDQKUEmiHrrCRQe', 'le_leo@garcia.com', 'user'),
(26, 'ivancito', 'ivan', 'balmer', '$2b$10$3yC/VCJlXP198sR49XJL5.xnJl0LSSUS6vRtlH/IdoZfv3aSmPKVy', 'ivan@cito.com', 'admin'),
(27, 'pedrolin', 'pedro', 'pedro', '$2b$10$QsH4rvGKLoFZuq50QoETJOZclLNF.3Sr/Ebb3RycrbmMENP/ec30O', 'pedro@pedro.com', 'user'),
(28, 'juancito', 'juan', 'cito', '$2b$10$JP4uy7F.peivXCX6CAPTFOhs016m/Pr.rhWaZuaB5/B9bbZMgLkNG', 'juan@cito.com', 'user'),
(29, 'atendedor', 'atendedor', 'd\'boludos', '$2b$10$b4n1hE6ybah3sivtYiDKyu4Ji6s0jzJUoe2aXh.7IBMFk4DhrI9ce', 'atendedor@boludos.com', 'user'),
(31, 'el leo 3d', 'leo', 'nardo', '$2b$10$BBbJrxMbvzWCAsuPvp8cJuYOVhR5fnRsJOJIXPbcWbKPyg0VQXzx.', 'leonardo_garcia@ramones.com', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_comentarios_post` (`post_id`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `type_id` (`type_id`) USING BTREE;

--
-- Indices de la tabla `type_post`
--
ALTER TABLE `type_post`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`user_name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT de la tabla `type_post`
--
ALTER TABLE `type_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comentarios_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_type_post` FOREIGN KEY (`type_id`) REFERENCES `type_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
