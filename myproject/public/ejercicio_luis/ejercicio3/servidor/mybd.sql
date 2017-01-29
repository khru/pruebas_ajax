-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-01-2016 a las 16:05:25
-- Versión del servidor: 5.5.46-0ubuntu0.14.04.2
-- Versión de PHP: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `mybd`
--
/* Se elimina la base de datos si la hubiese */
DROP DATABASE IF EXISTS mybd;
/* Creacion de la base de datos */
CREATE DATABASE mybd character set utf8 collate utf8_general_ci;
/* Uso de la base de datos */
USE mybd;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuarios` int(10) NOT NULL AUTO_INCREMENT,
  `nick` varchar(250) COLLATE latin1_spanish_ci DEFAULT NULL,
  `password` text COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id_usuarios`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nick`, `password`) VALUES
('luilli', 'admin123'),
('roberto', 'otrapass'),
('admin', 'admin');