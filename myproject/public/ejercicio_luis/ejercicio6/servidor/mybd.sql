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

CREATE TABLE IF NOT EXISTS `provincias` (
  `id_provincias` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(250) COLLATE latin1_spanish_ci DEFAULT NULL,
  `nombre` text COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id_provincias`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=7 ;

INSERT INTO `provincias` (`codigo`, `nombre`) VALUES
('01', 'Alava'),
('02', 'Barcelona'),
('03', 'Murcia');

CREATE TABLE IF NOT EXISTS `municipios` (
  `id_municipios` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(250) COLLATE latin1_spanish_ci DEFAULT NULL,
  `nombre` text COLLATE latin1_spanish_ci NOT NULL,
  `provincia` int(10) NOT NULL,
  FOREIGN KEY (`provincia`) REFERENCES provincias(id_provincias),
  PRIMARY KEY (`id_municipios`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=7 ;

INSERT INTO `municipios` (`codigo`, `nombre`, `provincia`) VALUES
('0014', 'Alegria-Dulantzi', 7),
('0015', 'Tristeza-Dulantzi', 7),
('0016', 'Rencor-Dulantzi', 7),
('0019', 'Marquesina', 8),
('0020', 'Lampore', 8),
('0021', 'Lorca',9),
('0022', 'Santo Angel',9),
('0023', 'Garres',9),
('0024', 'Pacheco',9);