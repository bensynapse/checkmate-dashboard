-- Add validation tracking fields to task table
ALTER TABLE `task` 
ADD COLUMN `matchStatus` enum('match', 'mismatch', 'partial', 'pending') 
DEFAULT 'pending' AFTER `sheet`;

ALTER TABLE `task` 
ADD COLUMN `confidenceScore` float DEFAULT NULL AFTER `matchStatus`;

ALTER TABLE `task` 
ADD COLUMN `mismatchReasons` json DEFAULT NULL AFTER `confidenceScore`;

ALTER TABLE `task` 
ADD COLUMN `validationDurationSeconds` int DEFAULT NULL AFTER `mismatchReasons`;