DROP DATABASE IF EXISTS project3;
CREATE DATABASE project3;

USE project3;

create table Users(
  id integer not null unique auto_increment,
  Email varchar(50),
  userName varchar(50),
  userRealName varchar(50),
  userPassword  varchar(255)
);

create table houseHold(
  id integer not null auto_increment,
  usersId integer,
  houseName varchar(50),
  membersName varchar(50)
);

create table householdTasks(
  id integer not null unique auto_increment,
  householdID integer,
  usersId integer,
  userName varchar(50),
  taskDescription varchar(200),
  startDate varchar(50),
  endDate varchar(50),
  inPrgressBy varchar(50),
  completedBy varchar(50)
);

create table userTasks(
  id integer not null unique auto_increment,
  householdTaskID integer,
  usersId integer,
  userName varchar(50),
  allTasks varchar(50),
  completed varchar(50),
  inProgress varchar(50),
  taskDescription varchar(200),
  startDate varchar(50),
  endDate varchar(50)
);