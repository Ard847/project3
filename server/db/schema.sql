DROP DATABASE IF EXISTS project3;
CREATE DATABASE project3; 
 
 USE project3;
 
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment , 
    `firstName` VARCHAR(50), 
    `lastName` VARCHAR(50), 
    `email` VARCHAR(50) NOT NULL, 
    `username` VARCHAR(50) NOT NULL, 
    `userPassword` VARCHAR(255) NOT NULL, 
    `image` VARCHAR(255), 
    `color` VARCHAR(16), 
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `households` (
    `id` INTEGER NOT NULL auto_increment , 
    `houseName` VARCHAR(50),
    `image` VARCHAR(255), PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `tasks` (
    `id` INTEGER NOT NULL auto_increment , 
    `householdID` INTEGER, `userID` INTEGER, 
    `taskName` VARCHAR(50), 
    `completedDate` VARCHAR(50), 
    `nextDate` VARCHAR(50), 
    `duration` INTEGER, 
    `repeatEvery` VARCHAR(50), 
    `alertBefore` VARCHAR(50), 
    `completeBy` VARCHAR(50), 
    `status` VARCHAR(50), 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`householdID`) REFERENCES `households` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, 
    FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS `householdMembers` (
    `id` INTEGER NOT NULL auto_increment , 
    `householdID` INTEGER, 
    `userID` INTEGER, 
    UNIQUE `householdMembers_householdID_userID_unique` (`householdID`, `userID`), 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`householdID`) REFERENCES `households` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB;






  