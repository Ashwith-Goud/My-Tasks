### Office Management System

## Employees Table
CREATE TABlE Employees( EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT null,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(15),
    Designation VARCHAR(50),
    DepartmentID INT
);

## Department Table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    ManagerID INT UNIQUE,
);

ALter Table Employees ADD Foreign Key (DepartmentID) References Departments(DepartmentID);

## Projects
CREATE TABLE Projects (ProjectID INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(100) NOT NULL,    
    StartDate DATE,    
    EndDate DATE,    
    Budget DECIMAL(15, 2),    
    DepartmentID INT
);

## EmployeeProjects
Create Table EmployeeProjects( EmployeeProjectID INT Primary Key AUTO_Increment,
    EmployeeID INT Not null,
    ProjectID INT Not Null,
    Role VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERences Employees(EmployeeID)
);

Alter Table Projects ADD FOREIGN KEY (DepartmentID) References Departments(DepartmentID);
ALTER Table EmployeeProjects Add Foriegn Key (ProjectID) References Projects(ProjectID);

