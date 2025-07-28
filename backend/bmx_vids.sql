-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2025 a las 00:44:14
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
(2, 'Shitluck “Against All Odds”', 'Bunch of bikers doing biker shit with the homies... What it\'s all about...  (2006)', 'Riders\nDerrick Girard\nBilly Ashby\nRoss Tanner\nDerek Gabbert\nLeland Thurman\nTony Hamlin\nChris Wilson\nRyan Metro\nRichard Ayers\nMike Tag\nCameron Wood\nGene Coffman', 'https://www.youtube.com/watch?v=4idPidD64jo&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=5', '2006, shitluck', '2025-07-28 18:29:37', 'AdminAccount', 1, 1),
(3, ' Pedal To The Metal Tour', 'Riders of Fox in bmx tour.', 'Riders\nMike Aitken\nRuben Alcantara\nBrian Foster\nChase Hawk\nScotty Cranmer\nCorey Bohan\nJoe Rich\nHeath Pinter\nAllan Cooke.', 'https://www.youtube.com/watch?v=WVnEDiWnj9Y&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=6', 'fox, tour', '2025-07-28 18:33:47', 'AdminAccount', 1, 1),
(4, '\"Killjoy\" ', 'Legendary crew video filmed and edited by Jordan Utley, Shawn Elf Walters, and more!', 'Parts from Rob Wise, Dave Thompson, Tate Roskelley, Cameron Wood, Mike Aitken, Matt Beringer, and more! If you ever have the chance, go ride BMX in Utah!', 'https://www.youtube.com/watch?v=xC6BWWvDurw&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=48', 'utah, 50 50', '2025-07-28 18:36:59', 'AdminAccount', 1, 1),
(5, 'S&M Bikes \"Please Kill Me\"', 'It\'s crazy how much BMX has progresses since this video came out.', 'Riders\nJosh Stricker\nAdam Baker\nAmos Burke\nMartin Lotterle\nBob Scerbo\nVic Ayala\nBrian Wizmerski\nRob Darden\nMatt Beringer\n\nSongs\nAll The Time In The World - The Nips\nOshuassong - Bad Brains\nMy Baby Hates Me - The Stitches\nOver The Hills & Far Away - Led Zeppelin\nBlind Ambition - The Partisans\nDont Talk To Me - G.G Allin\n93 Til Infinity - Souls Of Mischief\nA Girl Like You - Edwyn Collins\nPsycho Killer - Talking Heads\nBlank Generation - Richard Hell & The Voidoids\nArt Is Hard - Cursive\nMiserlou - Agent Orange\nAnother Girl Another Planet - The Only Ones', 'https://www.youtube.com/watch?v=IsdookvDDJQ&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=46', 's&m', '2025-07-28 18:40:03', 'AdminAccount', 1, 1),
(6, 'Cult \"Small Talk\" AM', 'Cults AM video.', 'Riders include Iz Pulido, Steven Mack, Grant Germain, Joe Molina, Josh Alderete, Floyd, Andrew Castenada, Timmy Theus, and more.', 'https://www.youtube.com/watch?v=0pRm4rEHac0&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=40', 'cult, AM', '2025-07-28 18:48:05', 'AdminAccount', 1, 1),
(7, 'Facad!', 'Enjoy the full version from the master tape', 'Davey Watson, Bruce Crisman, Seth Kimbrough, a ton of dudes in the friends section and Mike Hoder.\n', 'https://www.youtube.com/watch?v=XoW9nLhsXfc&list=PLWR71nX0Pne-1gVyM69n9bfCuK12T4gQM&index=113', 'facad, 2006', '2025-07-28 18:49:41', 'AdminAccount', 1, 1),
(8, 'Little Devil Criminal Mischief', 'A 2001 bmx bike video', 'A 2001 bmx bike video featuring Van Homan, Jason Enns, Garrett Byrnes, Kris Bennett, Marvin Loetterle, Josh Stricker, Pat Juliff, Nate Hanson, Matt Beringer, and more..', 'https://www.youtube.com/watch?v=AncLtID_yYQ', '2001, little devil', '2025-07-16 18:42:36', 'AdminAccount', 1, 1),
(10, 'Ride Bmx Flipside', 'Ride BMX\'s latest installment documents the encounters of four virtually unknown but immensley talented riders on their quest to Greenville, North Carolina, to hang with Dave Mirra', 'Ride BMX\'s latest installment documents the encounters of four virtually unknown but immensley talented riders on their quest to Greenville, North Carolina, to hang with Dave Mirra and some of the best pros in the sport. The roles are then reversed when the pros visit their cities to ride street. Watch as the likes of Mirra and Josh Harrnington throw down with street up and comers including Nigel Sylvester, E-man, Blackman, and more in one of the most unique and entertaining films ever to hit the sport. ', 'https://www.youtube.com/watch?v=RVtu94YOh34', 'ride, animal, fit', '2025-07-16 18:48:04', 'AdminAccount', 1, 1),
(11, 'Animal \"Cuts\"', 'Riders include Mike Brennan Mike Osso, Steven Hamilton, Nigel Sylvester, Bob Scerbo', '2010. Riders include Mike Brennan Mike Osso, Steven Hamilton, Nigel Sylvester, Bob Scerbo, Ralph Sinisi, Lino Gonzales, Dave Belcher, 90 East crew, Edwin De La Rosa, Garret Hoogerhyde, Tyrone Williams, Jared Washington, Butcher, Mark Gralla, Tom White, Wiz, Worms, Marv, Jeff Kocsis, Max Gaetig, and more....', 'https://www.youtube.com/watch?v=zxaWsHg_4ow', 'animal, street, 2010', '2025-07-16 18:50:36', 'AdminAccount', 1, 1),
(12, 'Anthem II', 'Riders include Mike Aitken, Brian Yeagle, Dirt Ron, Brian Foster, Mark Mulville, Eli Platt, Chase Hawk, Clint Reynolds, Chris Doyle, Geoff Slattery, Sean Burns, and more....', '\"Anthem embodies BMX in its purist most simplest form yet remains to this day one of the rawest BMX videos ever made. Its one of the few bike videos of that era that still make me want to go ride build trails, and support my scene\" -Chris f\'n Doyle. 2010', 'https://www.youtube.com/watch?v=xyQke0hrS-A', '2010, odysey, dirts, united', '2025-07-16 18:52:36', 'AdminAccount', 1, 1),
(13, 'Odyssey Electronical', 'odysey video 2006', 'Riders: Gary Young, Matt Beringer, Jimmy Levan, Kc Badger, Adam Banton, Taj Mihelich, Jim Bauer, Josh Betley, Mike Aitken, Jim Cielencki, Chase Hawk, Aaron Ross\n', 'https://www.youtube.com/watch?v=j6ja4JftCLA', '2006, street', '2025-07-16 18:56:14', 'AdminAccount', 1, 1),
(14, 'Demolition Last Chance', 'With added new riders to the already legendary team lineup', '\"With added new riders to the already legendary team lineup, we have one of the most creative and diverse teams to date.\" Featuring full sections from Chris Doyle, Dave Dillewaard, Jason Enns, Dave Osato, Ryan \"Biz\" Jordan, Christian Rigal, Connor Lodes, Alfredo Mancuso, Tate Roskelley, Dennis Enarson, Rob Wise, Daniel \"Lil-D\" Martinez and more...', 'https://www.youtube.com/watch?v=XwsbW7byRZA', '2011', '2025-07-16 18:58:43', 'AdminAccount', 1, 1),
(15, 'Deadline ', 'Filmed and Edited by Tony Ennis.', 'Filmed and Edited by Tony Ennis. Full parts from Garrett Reynolds, Ty Morrow, Steve Croteau, Augie Simoncini, Colin Varanyak, JJ Palmere, and Kevin Kiraly', 'https://www.youtube.com/watch?v=YC8iA1qjKNg', '2012, street', '2025-07-16 19:01:07', 'AdminAccount', 1, 1),
(16, 'Cult \" Let \'Em Talk \" ', 'OGs already have this one memorized.', 'Riders\nChase Dehart\nChase Hawk\nDakota Roche\nAlex Kennedy\nSebastian Keep\nTrey Jones\nRussell Barone', 'https://www.youtube.com/watch?v=giiuNIOKJkU', 'cult', '2025-07-16 19:02:16', 'AdminAccount', 1, 1),
(17, 'Shadow Conspiracy  \"The Calling\" ', 'BMX Film, The Calling 2005', 'BMX Film, The Calling including Joe Simon, Ryan Sher, Byron Anderson, John Jennings, Alistair Whitton.', 'https://www.youtube.com/watch?v=dijgE1RIVGs', '2005, shadow', '2025-07-16 19:03:41', 'AdminAccount', 1, 1),
(18, 'Ride Bmx \"Insight\"  ', ' Insight was an extremely influential video (2008)', 'Insight was an extremely influential video for the time showcasing \"the process\" of filming a part, from getting clips, to the good, bad, and random moments between. get the perspectives of Dakota Roche, Chester Blacksmith, Darryl Tocco, Jared Washington, Mike Brennan, Davey Watson, and more.\nFilmed and edited by the great Ryan Navazio. ', 'https://www.youtube.com/watch?v=UclhHtfu3cc', 'bmx mag, 2008', '2025-07-16 19:04:51', 'AdminAccount', 1, 1),
(19, 'Shadow Conspiracy \"Into The Void\"', 'filmed in 2008', 'Riders, Chase Dehart, Dave Rytell, Karl Poynter, Seth Kimbrough, Alistair Whitton, Owain Clegg, Bjoern Elvering, Drew Bezanson Ryan Sher, Ricky Bates, Eli Platt, Johnny Devlin, Filmed and edited by Johnny Devlin', 'https://www.youtube.com/watch?v=bpCal8s7pt8', '2008, shadow', '2025-07-16 19:06:04', 'AdminAccount', 1, 1),
(20, 'United \" Dont Matter \" ', '2007 united video', 'riders: corey martinez, nathan williams....', 'https://www.youtube.com/watch?v=KmATGRudZNU', 'street,2007,united', '2025-07-16 19:07:08', 'AdminAccount', 1, 1),
(21, 'Etnies Forward ', 'Etnies bmx Video ', 'Full parts from Mike \"Rooftop\" Escimilla, Jason Enns, Sandy Carson, Brian Terrada, Garrett Byrnes, Edwin Delarosa, Josh Stricker, Joe Rich, Nathan Wessel, Ian Morris, Dave Freimuth, Taj Mihelich, and Ruben Alcantara. Lots of other shredders in the mix section, filmed and edited by Dave Parrick.', 'https://www.youtube.com/watch?v=2poPndL51HU', 'etnies, 2002', '2025-07-16 19:08:02', 'AdminAccount', 1, 1),
(22, 'SHUFFLE | Odyssey BMX', 'SHUFFLE through some sessions over the past year with the Odyssey crew. This collection of footage was captured during filming missions in California, Washington, Nevada, Texas, and South Africa. NOW PLAYING on odysseybmx.com.', 'In Order of Appearance: Preston Okert, Aryei Levenson, Murray Loubser, Corey Walsh, Gary Young, Santi Laverde, Boyd Hilder, Mikey Andrew, Devin Burks, Hilario Olivos, Johnny Raekes, Justin Spriet, John Nelson, Jacob Cable, Takato Ueda, Dennis Enarson, Matt Nordstrom, Perris Benegas, and Bethany Hedrick.\n\n\nVideo by Zach Krejmas\nTitle Art / Animation by Dave Fortman\nAdditional Filming by Phoenix Jurgens, Blake Peters, Scott Marceau, Rich Forne\nCover photo by Scott Marceau', 'https://www.youtube.com/watch?v=sZfM_MBvtqc', 'odysey', '2025-07-16 19:09:32', 'AdminAccount', 1, 2),
(23, 'Vans BMX Presents: KEVIN PERAZA, CON TODO  | VANS | BMX', 'Vans BMX is proud to present the latest short film from team rider Kevin Peraza, Con Todo, directed by filmmaker and friend Juani Zurita. Meaning \"giving it all\" or \"with everything,\" the film explores Kevin\'s roots, highlighting his high-energy riding at', 'Con Todo is supported by Kevin\'s latest Vans collaboration, the BMX Style 114 by Kevin Peraza. To see the full collection go to http://Vans.com/BMX\n \nVideo: Juani Zurita \nPhotography: Jeff Zielinski', 'https://www.youtube.com/watch?v=9B0RpT90SnQ', '', '2025-07-16 19:10:52', 'AdminAccount', 1, 2),
(24, ' Miami Twice', 'It\'s been a minute since the guys were together on a trip so when we decided on Miami we knew we needed a heavy crew to go. \n\nWe joined Shadow Conspiracy and Subrosa pro riders Simone Barraco, Matt Ray, and Joris Coulomb together for a 10 day trip in the ', '\"Miami Twice\" is the first video in a little bit from us, but it kicked off the feelings we all love of BMX and riding with homies and they guys felt right at home while being on the road together. More to come! 👀', 'https://www.youtube.com/watch?v=kFmw93jmVEw', 'shadow, street', '2025-07-16 19:13:00', 'AdminAccount', 1, 2),
(25, 'BMX - Mike Stahl 2019 S&M Video', 'camera emoji: Grant C. Subscribe for more - https://www.youtube.com/user/sandmbik....', 'camera emoji: Grant C. Subscribe for more - https://www.youtube.com/user/sandmbik....', 'https://www.youtube.com/watch?v=LSY7ve2B45s', 'sym', '2025-07-16 19:15:00', 'AdminAccount', 1, 2),
(26, 'RAMBLER by S&M', 'LUKAS & NATE HALAHAN', 'Lukas Halahan nonchalantly blasts like he was born with a turbo button and Nathan Halahan is certified, Grade A(pe) good at riding little bikes on big piles of dirt. Both are already making good on  #lifegoals to roam around the world building and boosting said soil mounds for the foreseeable future. The Halahan brothers might be young, but they possess wisdom beyond their years, and they\'ve already figured out that it\'s the journey not the destination. Introducing Rambler - a new trail-centric line from S&M x Lukas & Nate Halahan. See you down the road... #shieldbmx #ramblers ', 'https://www.youtube.com/watch?v=lMFuqIXMn_w', 'dirt', '2025-07-16 19:16:01', 'AdminAccount', 1, 2),
(27, 'CLINT REYNOLDS\' S&M C.C.R.', 'It\'s pretty wild that Clint Reynolds has been on S&M for over 10 years now. What\'s even wilder is that he\'s been doing it on the same frame the whole time -- his dream rig... the S&M C.C.R. \n\nDon\'t fix it if it ain\'t broke! ', 'CCR Frame (21\" TT): https://www.sandmbikes.com/product/ha... - \nCredence XL Bar: https://www.sandmbikes.com/product/ha...\nCredence Turtleneck Stem: https://www.sandmbikes.com/product/ha...\nWidemouth Pitchfork: https://www.sandmbikes.com/product/ha...\nReynolds Grip: https://www.sandmbikes.com/product/ha...\nS&M Railed Seat: https://www.sandmbikes.com/product/ha...\nMainline Tire (2.4 in Front): https://www.sandmbikes.com/product/ha... 2.4 in Front\nTrackmark Tire (2.1 in Back): https://www.sandmbikes.com/product/ha... ', 'https://www.youtube.com/watch?v=oE9PF2XGIaM', 'dirt, sym', '2025-07-16 19:17:44', 'AdminAccount', 1, 2),
(28, 'Bone Deth CRIME VIDEO', 'Filmed and edited by Sean Burns \n\n\"Crime\" - 999\n\"Punk Police\" - Fancy Rosy', 'Bone Deth CRIME Frame Promo - featuring Adem Gunaydin, Albie Bennett, Josh Delarosa, Jordan O\'Kane, Joshny Babu, James Rodriguez, Kert Petersel and Robby Nelson. ', 'https://www.youtube.com/watch?v=zVmFDk9ALtg', '', '2025-07-16 19:18:27', 'AdminAccount', 1, 2),
(29, 'Josh Delarosa Bike Check - Bone Deth', 'bike check', 'Josh Delarosa Bike Check - Bone Deth\nbonedethchurch.com\n@bone_deth @josh_delarosa_', 'https://www.youtube.com/watch?v=Na8YZ8PbgDo', 'bike check', '2025-07-16 19:19:30', 'AdminAccount', 1, 2),
(30, 'DECLAN MURRAY - A BONE DETH SPECIAL PRESENTATION', 'https://digbmx.com/project-x\nhttps://digbmx.com | http://www.digbmxstore.com | Subscribe to the DIG channel for more videos - http://bit.ly/DigBMX', 'The words \"creative\" and \"original\" can get thrown around pretty loosely, but if the Oxford Dictionary made a BMX version of their famous book, Bone Deth\'s Declan Murray would be under both of those definitions. We guarantee you\'ve not seen anything like this before... who needs bars anyway?!', 'https://www.youtube.com/watch?v=7YBXMxgwO0c', '', '2025-07-16 19:20:19', 'AdminAccount', 1, 2),
(31, 'JOSH DELAROSA - A BONE DETH SPECIAL PRESENTATION', 'Hold on to your hats for another wild Special Presentation from Bone Deth, this time with roof dwelling stunt man, Josh Delarosa. This is all killer, no filler! Roof to rail, a huge halfcab, and a host of bonkers setups, this is essential viewing. Shout o', 'Hold on to your hats for another wild Special Presentation from Bone Deth, this time with roof dwelling stunt man, Josh Delarosa. This is all killer, no filler! Roof to rail, a huge halfcab, and a host of bonkers setups, this is essential viewing. Shout out to Josh for keeping the roof game alive! ', 'https://www.youtube.com/watch?v=OY9H5UMKa54', '', '2025-07-16 19:21:07', 'AdminAccount', 1, 2),
(32, 'Mariano Cappelletti - ', 'Edición: \nGustavo Hoshino\n\nCámaras: \nGustavo Hoshino\nLeandro Dalto\n\nMúsica: \nThe Stone Roses - Love Spreads.', 'Mariano Cappelletti (@cappellettimariano) grabado entre Marzo y Mayo de 2015, web video para Ene Ene Bikes (@eneenebikes) en conjunto con 100%V BMX (@100poricnetov).', 'https://www.youtube.com/watch?v=K3xGYT2m_98', '', '2025-07-16 19:23:18', 'AdminAccount', 1, 2),
(33, 'BURN IT TO THE GROUND - SWAMPFEST 2025', 'The culmination of one hell of a weekend in Waldo, Floarida! It\'s difficult to give an actual sense of the madness that is Swampfest, but here goes. Enjoy!\n\nVideo by Rob Dolecki\n', 'The culmination of one hell of a weekend in Waldo, Floarida! It\'s difficult to give an actual sense of the madness that is Swampfest, but here goes. Enjoy!\n\n\n', 'https://www.youtube.com/watch?v=b1asgmJHZF0', '', '2025-07-16 19:24:05', 'AdminAccount', 1, 3),
(34, 'BMX - ENE ENE STREET JAM BUENOS AIRES ARGENTINA', '¿Estás seguro de que quieres eliminar este comentario?\nEsta acción es permanente.\n', '¿Estás seguro de que quieres eliminar este comentario?\nEsta acción es permanente.\n', 'https://www.youtube.com/watch?v=lUXPmySewXU', 'ivan,ene ene', '2025-07-17 13:54:08', 'AdminAccount', 1, 3),
(35, 'SAY LESS | Odyssey BMX', 'Corey Walsh, Gary Young, Dennis Enarson, Perris Benegas, Justin Spriet, Tom Dugan, and Noah Miranda. SAY LESS! Enjoy.\n\nVideo by Zach Krejmas\nArt by Dave Fortman\nPhotography by Scott Marceau\n', 'Corey Walsh, Gary Young, Dennis Enarson, Perris Benegas, Justin Spriet, Tom Dugan, and Noah Miranda. SAY LESS! Enjoy.\n\nVideo by Zach Krejmas\nArt by Dave Fortman\nPhotography by Scott Marceau\n', 'https://www.youtube.com/watch?v=NUpMUcnrHKw', 'odyssey,manu,agus', '2025-07-17 19:24:29', 'AdminAccount', 1, 2),
(36, 'Boyd Hilder vs. Dennis Enarson – El Juego de Bicicletas en el Parque – Videos del Viernes', 'Los videos del viernes de esta semana los presenta @sdwheelworks5761', 'Igual, pero diferente. El australiano Boyd Hilder se enfrenta a nuestro querido Dennis Enarson en una pelea cuerpo a cuerpo en el nuevo Claremont Skatepark. Puede que empiecen con buen pie, pero pronto empiezan a hacer trucos que saben que el otro no puede hacer, ¡y la cosa se pone fea! ¡No te lo querrás perder!', 'https://www.youtube.com/watch?v=mo5JkOxGRDw', 'game of bike', '2025-07-20 20:39:35', 'AdminAccount', 1, 2),
(37, 'RattyMaty -- Radius -- Profile Bmx', 'Originally posted in Collaboration with Dig Bmx.', 'Fufanu and abubaca fans rejoice! Ratty Maty is back  with an absolute stocker of a video for Profile, and he means business! \'Radius\' really highlights Maty\'s incredible ability to ride all sorts of transitions of all sizes and types— from ramps, to concrete DIY spots, dirt jumps, and everything in between. It\'s always refreshing to see lesser-seen stuff like switch bar-grabs, hurricanes, and a backside boneless make an appearance too. Enjoy!\n', 'https://www.youtube.com/watch?v=f1lhsbtfJAE', 'bici, profile', '2025-07-20 21:23:37', 'AdminAccount', 1, 2),
(38, 'BEST RUNS – SIMPLE  SESSION – BMX FINALS 2024', 'Doing it for Alex Hiam! As usual the BMX Finals ‪@simple-session‬2024 ', 'Doing it for Alex Hiam! As usual the BMX Finals ‪@simple-session‬2024 were insane (see above), but unfortunately they were also overshadowed by a bad crash that Alex Hiam took during qualifying. The Australian is currently stable and continues to be monitored closely in the ICU in the local hospital in Estonia. The prognosis for his recovery is positive.', 'https://www.youtube.com/watch?v=tJ59DSFcJg4', 'simple sesion, 2024', '2025-07-20 23:23:10', 'AdminAccount', 1, 3),
(39, 'INSANE FINALS! BATTLE OF HASTINGS 2022', 'Here we go, Battle of Hastings Finals is here...', 'Here we go, Battle of Hastings Finals is here, and it was INSANE. The culmination of all the weekend events landed us here with teams Varanyak, Dove, Reilly, Jones, and Perrin all battling it out for the win. \nThe format is: Four riders per team, two 50 second runs, and three attempts at a best trick. Teams are judged overall. Hit play and see who took the win...', 'https://www.youtube.com/watch?v=z9s798kkZss', 'finals, 2022', '2025-07-20 23:24:57', 'AdminAccount', 1, 3),
(40, 'The Death Of Fun ', 'Eastern Bikes // 2009', 'Eastern Bikes showed how to make real web videos with the Inside/Out series. Well filmed, well edited, solid action and a new concept made the four episodes stand out from the monotony. Is the presented standard also reached by the recently released DVD \"The death of fun\"?', 'https://www.youtube.com/watch?v=IhcqFipeZ8s&list=PLWR71nX0Pne-1gVyM69n9bfCuK12T4gQM&index=36', 'eastern, 2009', '2025-07-28 18:56:09', 'AdminAccount', 1, 1),
(41, 'Until Monkeys Fly', 'Hoffman Bikes // 1997', '\"Until Monkeys Fly\" is a 1997 BMX video produced by Hoffman Bikes. It features a mix of narrative and action segments, with a storyline involving a character called \"Monkey Boy\" who encounters the Hoffman riders. The video then transitions into a showcase of BMX riding, including flatland, dirt, street, mini ramp, and vert riding, with Matt Hoffman demonstrating impressive skills. ', 'https://www.youtube.com/watch?v=28P8zIkyf_k&list=PLWR71nX0Pne-1gVyM69n9bfCuK12T4gQM&index=16', 'hoffman, 1997', '2025-07-28 18:57:50', 'AdminAccount', 1, 1),
(42, 'On The Clock', 'Volume Bikes // 2007', 'Filmed & edited by Glenn PP Milligan.', 'https://www.youtube.com/watch?v=cJ5GRlnZlaA&list=PLWR71nX0Pne-1gVyM69n9bfCuK12T4gQM&index=10', '2007, volume', '2025-07-28 18:58:57', 'AdminAccount', 1, 1),
(43, 'Fly Bikes Uno! ', 'Fly bikes 2005', 'Flybikes\' video \"Uno\" showcases the brand\'s DIY, imaginative approach to BMX riding, featuring the team building makeshift ramps from pallets and riding them in unique locations. The video highlights the team\'s creativity and resourcefulness, as well as their passion for riding in diverse environments. ', 'https://www.youtube.com/watch?v=gs3AnsAQmrg&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=31', 'fly', '2025-07-28 19:02:02', 'AdminAccount', 1, 1),
(44, 'Shook \"Put In Werk\"', 'Needless to say with a line up of riders like that, you know this is packed with some excellent riding and the the film work is definitely on point. Great watch from start to finish!', 'features Cam Wood, Chase Dehart, Daniel Dhers, Eric Cuiper, Jack Maddock, Jarrod Allen, Jeff Kennedy, Marlon Europe, Rahmel Hoyle, Raul Ruiz, Rob Wise and Skyler Ellingson. ', 'https://www.youtube.com/watch?v=f8jWs9Xgtjw&list=PL8nxrUFABsdmfWSL8ikquWND4HI7DeeP0&index=33', 'shook', '2025-07-28 19:03:26', 'AdminAccount', 1, 1),
(45, 'randy taylor props bio', 'Randy had a significant interview/biography feature with Props Video magazine that was \"considered by many as the best of the year.\"', 'This connection to Props magazine was clearly a career highlight that showcased his personality and riding style to the BMX community.', 'https://www.youtube.com/watch?v=riPEmeBig50', 'randy taylor, props', '2025-07-28 19:13:20', 'AdminAccount', 1, 2),
(46, 'Kaz Campbell / Welcome to Eclat', 'With a long haul visit planned to Australia at the end of August', 'Kaz Campbell wanted to get a video part laid down on home turf before jetting away. With the UK being home to arguably the best trail scene in the world and with Kaz determined to ride as much as possible, he and filmer Sam Barrow set out to work and pulled together 5 plus minutes of style and finesse\n\n“Huge thanks to the sick trail builders and spots that make the UK scene incredible” - Sam Barrow', 'https://www.youtube.com/watch?v=yP9seK0Lbgg', 'eclat', '2025-07-28 19:14:20', 'AdminAccount', 1, 2),
(47, 'Shawn Mcintosh Primo Edit', '2014 Primo Video', 'Filmed By: Aaron Brenner & Miles Rogoish\nEdited By: Miles Rogoish', 'https://www.youtube.com/watch?v=s7FrII0En5s', 'primo, 2014', '2025-07-28 19:15:42', 'AdminAccount', 1, 2),
(48, 'DIRTYGEMS Embalse', 'FILMERS: Gaspar Guendulain x Maximiliano Coca', '\n@SSMELIAN\n@NICOLAS_STORELLO\n\n@_.ANDRESMEDINA._\n\n@bikeparkembalse', 'https://www.youtube.com/watch?v=RuA0rMQfrY0', 'embalse, cordoba', '2025-07-28 19:17:25', 'AdminAccount', 1, 2),
(49, '\"TY\" - TY MORROW // ÉCLAT BMX', 'One of the most progressive riders of a generation; Ty Morrow delivers another insane video part filmed by Calvin Kosovich in California over the past year. Respect the work ethic and enjoy the fruits of his labour.', 'Filmed & edited by Calvin Kosovich.', 'https://www.youtube.com/watch?v=dUBw4wDx1w0', 'eclat, ty morrow', '2025-07-28 19:18:33', 'AdminAccount', 1, 2),
(50, 'WELCOME DYLAN LEWIS / ÉCLAT BMX', 'éclat proudly welcomes Dylan Lewis to the family. Dylan\'s riding needs no introduction, no one blasts a quarter like this guy. We\'re stoked to welcome Dylan into the fold and have him repping éclat down under.', 'Filmed & edited by John Young.', 'https://www.youtube.com/watch?v=Haw0LJyp14M', 'eclat', '2025-07-28 19:19:42', 'AdminAccount', 1, 2),
(51, 'Props Issue 41 - Sebastian Keep Bio', 'Classic bio of Bas Keep from Issue 41', 'Classic bio of Bas Keep from Issue 41, circa 2001. We had a chance  to catch up with Bas recently to reflect on the section from 11 years ago. Interview at link below.\n', 'https://www.youtube.com/watch?v=SCuoAxi15lU', 'props, sebastian keep', '2025-07-28 19:20:40', 'AdminAccount', 1, 2),
(52, 'Dan Coller Props Bio Remix! - Kink BMX', 'The original section was featured in Props BMX Issue 79, filmed and edited by Darryl Tocco. Darryl recently breathed some new life into this arguably overlooked release from Dan Coller a few years back. Savage riding and good soundtrack to back it up!', 'Photo shot by Gutstains\n\nShot by Darryl Tocco\n\nFollow Kink on Instagram - @KinkBMX\nYoutube - KinkBMXVideos \nTwitter - @KinkBikes\nFacebook.com/Kinkbmx\nhttp://www.KinkBMX.com', 'https://www.youtube.com/watch?v=x5O7BWydGjM&list=RDx5O7BWydGjM&start_radio=1', 'kink, props', '2025-07-28 19:21:44', 'AdminAccount', 1, 2),
(53, 'Garrett Reynolds Bio', 'Issue 75 - Garrett Reynolds Bio', 'What can you say about Garrett Reynolds except that he absolutely kills it. This Bio from Props Issue 75 shows Garrett at his best.', 'https://www.youtube.com/watch?v=VDW4Fz1fyFM', 'garret reynolds, props', '2025-07-28 19:22:57', 'AdminAccount', 1, 2),
(54, 'Dave Thompson Props Bio', 'Check out his explosive Props Bio!', 'Dave Thompson is an exciting new BMX talent from Salt Lake City.', 'https://www.youtube.com/watch?v=tnmB4b-aVbc', 'props', '2025-07-28 19:24:34', 'AdminAccount', 1, 2),
(55, 'ECLAT \'BEST TRICKS\' JAM | BMX STREET STATION 2025 x \'CASH UP\'', 'ECLAT \'Best Tricks jam - Day 2 at BMX Street Station in Lyon, France, hosted by our friends at Bros Bike Store in partnership with the Monster Energy \'Cash Up\' series.', 'Video by Fred Murray', 'https://www.youtube.com/watch?v=UCQMZjznpaQ', 'eclat, 2025, jam', '2025-07-28 19:28:42', 'AdminAccount', 1, 3),
(56, 'SPINE FINALS - FISE Montpellier 2025', 'It\'s one of the highlights of the whole FISE Montpellier event - Spine Finals! Sit back and enjoy all the madness from Saturday night.', 'Congrats to:\n1st - Justin Dowell\n2nd - Alec Danelutti\n3rd - Irek Rizaev', 'https://www.youtube.com/watch?v=pkJhzGemiCw', 'finals, fise', '2025-07-28 19:30:46', 'AdminAccount', 1, 3),
(57, 'PERFORMANCE STREET JAM - PARIS, FRANCE | DIG BMX', '\nBack in September last year, our friends at Performance BMX organized a street jam in Paris.', ' France with the support from the likes of Traffic Distribution (with WeThePeople and Eclat), RedBull, Le Comptoir Bike Shop and crews. The resulting day turned out pretty wild and so much good riding went down. But this event wasn\'t only a street jam, it also played host to the premiere for their latest full-length video, \"Boulevard\" which you can also see on DIG soon.', 'https://www.youtube.com/watch?v=a5e27zPvQvQ', 'jam, francia', '2025-07-28 19:32:25', 'AdminAccount', 1, 3),
(58, 'ROSARIO STREET JAM 2024 - LBCW BMX', 'El 14 de septiembre de 2024 el bmx se reunió en  Rosario. Con el fin de pasar un día sobre la bici mientras recorríamos algunos spots de la ciudad.', 'GRACIAS A TODAS LAS PERSONAS QUE HICIERON POSIBLE ESTE EVENTO.\nAPOYARON ESTE EVENTO\n@albitortas \n@exotica_mancha \n@thecoffeebox.arg \n@nutzpastademani \n@drt.films \n@groovestore94 \n@poppaclo \n@darkriide \n@doopel_ \n@fluidweb ', 'https://www.youtube.com/watch?v=ig64_U7ZOsE', '2024, rosario', '2025-07-28 19:33:35', 'AdminAccount', 1, 3),
(59, 'FISE Park Final Highlights', '2017 FISE: Montpellier - Park Final Highlights', 'Watch some of the best park riders in the world put one of the burliest FISE courses of all time to work! Insane riding by Logan Martin, Daniel Dhers, Nick Bruce, Drew Bezanson, Brandon Loupos, Nick Bruce, Kevin Peraza, and more!', 'https://www.youtube.com/watch?v=GJzT6ueBVtg', 'fise', '2025-07-28 19:34:49', 'AdminAccount', 1, 3),
(60, 'SANTA FE STREET JAM X ENE ENE BIKES & PARANOID BMX', 'Luego de las malas pasadas que nos jugó el clima, pudimos llevar a cabo esto que con tanto amor y esfuerzo hacemos. \nAgradecemos de corazón a todos aquellos que nos acompañaron y se hicieron presentes en la ciudad de Santa Fé, esto sin lugar a duda se log', 'Gracias a @carlsvsqz por el trabajo gráfico, a @jbmx85 @mauriciobonadeo @dix.fotografia por hostearnos y darnos una mano durante el finde, nuevamente gracias @mauriciobonadeo & Dix por las fotografías edición y también a @nestbmx6 @nachomalagutti por el aporte de material.\n.\nA @yonki.life y a @lbcwbmx por colaborar con premios para los pibes. #nnprndstreetjam #bmx \n\nGracias por el apoyo!', 'https://www.youtube.com/watch?v=4hy3O3zLTsI', 'ene ene, jam, paranoid', '2025-07-28 19:36:07', 'AdminAccount', 1, 3),
(61, 'BMX STREET STATION 2025 | \'CASH UP\'', 'If you\'re looking for a BMX holiday next year make sure it\'s BMX Street Station! Sit back and enjoy the mayhem. Massive thanks to Bros Bike Store, Monster Energy, Vans and everyone else who supported the event.', 'You may have already caught some of our highlights from the BMX Street Station X Cash Up weekend out in Lyon, France, put on by our friends at Bros Bike Store, but now we\'ve got all the events from the two days together in one video for you. \n', 'https://www.youtube.com/watch?v=5DZlRJ8MfB8', '2025, jam', '2025-07-28 19:37:23', 'AdminAccount', 1, 3),
(62, 'FISE  Park Finals Highlights', 'FISE Montpellier 2016: Park Finals Highlights', 'Logan Martin, Daniel Dhers, Alex Coleborn, Daniel Sandoval, Mike Varga, Colton Walker, Nick Bruce, and more battle it out for the top spot in the park final at 2016\'s first FISE event. Amazing riding from the best in the world!', 'https://www.youtube.com/watch?v=i3Ia2iLYo-4', 'fise, 2016', '2025-07-28 19:38:28', 'AdminAccount', 1, 3),
(63, ' ENE ENE PARANOID STREET JAM MENDOZA ARGENTINA', 'Presentamos el vídeo de lo que fue la pasada street jam en la provincia de Mendoza. Otra vez tuvimos una masiva convocatoria de rider de todo el país y de varios países vecinos con un nivel increíble. No hay muchas palabras para describir lo que fue la #n', 'Queremos agradecer especialmente a nuestros amigos de Paranoid BMX por ayudarnos y compartir este evento, Ema Scutella, Pablo Gallardo, Panty Canepa, toda la crew de Rio Cuarto, También a los chicos de Mendoza Richard, Liso, Tomy, Condor que nos brindaron todo para pasar una estadía única, y que mas decir a todos los que vinieron avalan la movida que hacemos. Video realizado por Sebastian Perez.', 'https://www.youtube.com/watch?v=u1axpyDyxf8', 'ene ene, mendoza, jam', '2025-07-28 19:39:42', 'AdminAccount', 1, 3);

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
  `user_type` enum('user','admin') NOT NULL DEFAULT 'user',
  `favs` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `user_name`, `name`, `last_name`, `user_password`, `email`, `user_type`, `favs`) VALUES
(1, 'AdminAccount', 'Admin', 'Admin', '$2b$10$Rfha.Kr7SxAAK0Yzw.v5vu1FL2wOgpoGOt/LcdOT/XhtCSfIpgn2W', 'admin@admin.adm', 'admin', '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `type_post`
--
ALTER TABLE `type_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
