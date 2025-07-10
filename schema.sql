-- MySQL dump 10.13  Distrib 8.4.4, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ape
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `allocation`
--

DROP TABLE IF EXISTS `allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `allocatedAt` datetime NOT NULL,
  `task_id` int DEFAULT NULL,
  `agentId` int NOT NULL,
  `completedAt` datetime DEFAULT NULL,
  `session_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79c27ded1e9666735c893f15627` (`task_id`),
  KEY `FK_cacf7d9a259973f9e18c6665ebc` (`session_id`),
  CONSTRAINT `FK_79c27ded1e9666735c893f15627` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cacf7d9a259973f9e18c6665ebc` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46596 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `type` enum('error','info') NOT NULL DEFAULT 'info',
  `source` varchar(255) NOT NULL,
  `agent` int NOT NULL,
  `task` int DEFAULT NULL,
  `allocation` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=349017 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agentId` int NOT NULL,
  `startedAt` datetime NOT NULL,
  `endedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urls` text,
  `status` enum('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
  `data` json DEFAULT NULL,
  `sourceData` json DEFAULT NULL,
  `rowNumber` int NOT NULL DEFAULT '0',
  `sheet` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166460 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-08 20:10:37
