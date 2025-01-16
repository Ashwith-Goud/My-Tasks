# Office Management System

## Employees Table
```
CREATE TABlE Employees( EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT null,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(15),
    Designation VARCHAR(50),
    DepartmentID INT
);
```
## Department Table
```
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
);
ALter Table Employees ADD Foreign Key (DepartmentID) References Departments(DepartmentID);
```
## Projects Table
```
CREATE TABLE Projects (ProjectID INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(100) NOT NULL,    
    StartDate DATE,    
    EndDate DATE,    
    Budget DECIMAL(15, 2),    
    DepartmentID INT
);
```
## EmployeeProjects Table
```
Create Table EmployeeProjects( EmployeeProjectID INT Primary Key AUTO_Increment,
    EmployeeID INT Not null,
    ProjectID INT Not Null,
    Role VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERences Employees(EmployeeID)
);

Alter Table Projects ADD FOREIGN KEY (DepartmentID) References Departments(DepartmentID);
ALTER Table EmployeeProjects Add Foriegn Key (ProjectID) References Projects(ProjectID);
```
## Meetings Table
```
CREATE TABLE Meetings(
    MeetingID INT PRIMARY Key AUTO_Increment,
    Title VARCHAR(100) NOT NULL,
    Date DATE,
    Time TIME,
    OrganizerID INT FOREIGN KEY References Employees(),
    DepartmentID INT,
);
```

## Relations
* Many Employees belong to one department *(Many-to-One)*.
* Many Employees can work in many projects *(Many-to-Many)*.
* Many meetings belong to one department *(Many-to-One)*
* Each meeting is organized by one employee *(One-to-One)*.

## Basic Sql Queries
```
CREATE DATABASE OfficeManagementSystem;
USE OfficeManagementSystem;
CREATE TABLE Employees;
INSERT INTO Employees (Column 1,..) VALUES (value1,..);
```

## JOINS
#### Inner Join 
```
select p.Name as ProjectName,COUNT(ep.EmployeeID) as MemberCount from Projects p JOIN EmployeeProjects ep ON p.ProjectID=ep.ProjectID group by p.Name;
```
#### Left Join
```
select p.Name as ProjectName,COUNT(ep.EmployeeID) as MemberCount from Projects p LEFT JOIN EmployeeProjects ep ON p.ProjectID=ep.ProjectID group by p.Name;
```
#### Right Join
```
select p.Name as ProjectName,COUNT(ep.EmployeeID) as MemberCount from Projects p RIGHT JOIN EmployeeProjects ep ON p.ProjectID=ep.ProjectID group by p.Name;
```

## Aggregate Functions
```
SELECT COUNT(*) FROM Employees;
SELECT SUM(Budget) FROM Projects;
SELECT AVG(Budget) FROM Projects;
SELECT MAX(Budget), MIN(Budget) FROM Projects;
```
