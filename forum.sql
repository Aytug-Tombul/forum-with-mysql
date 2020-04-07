-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 07 Nis 2020, 11:23:49
-- Sunucu sürümü: 5.7.28
-- PHP Sürümü: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `forum`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` varchar(250) NOT NULL,
  `title_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `posts`
--

INSERT INTO `posts` (`id`, `post`, `title_id`, `user_id`, `date`) VALUES
(18, 'If you like a project you can give a star :)', 24, 4, '2020-04-07'),
(17, 'Welcome to my Github', 23, 4, '2020-04-07'),
(16, 'test4', 22, 4, '2020-04-07'),
(15, 'test3', 21, 4, '2020-04-07');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `titles`
--

DROP TABLE IF EXISTS `titles`;
CREATE TABLE IF NOT EXISTS `titles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `titles`
--

INSERT INTO `titles` (`id`, `title`, `user_id`, `category_name`, `date`) VALUES
(24, 'Welcome', 4, 'Health', '2020-04-07 14:23:08'),
(23, 'test5', 4, 'Sport', '2020-04-07 14:22:44'),
(22, 'test4', 4, 'Games', '2020-04-07 14:22:07'),
(21, 'test3', 4, 'Sport', '2020-04-07 14:21:26');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `referrer` varchar(20) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `token` varchar(15) DEFAULT NULL,
  `token_Expire` datetime NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `referrer`, `photo`, `token`, `token_Expire`, `role`) VALUES
(7, 'athem', 'turkish', 'asdasdas', 'asdasdasada', 'ss.jpg', NULL, '2020-04-06 17:46:23', 'user'),
(4, 'aytug', 'tombul', 'aytugtombul@gmail.com', 'aytug', 'cvphoto.jfif', '', '2020-03-26 23:11:00', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
