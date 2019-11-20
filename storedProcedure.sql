CREATE DEFINER=`root`@`localhost` PROCEDURE `EmployeeAddOrEdit`(
IN _EmpID INT,
IN _Name varchar(45),
IN _EmpCode varchar(45),
IN _Salary int
)
BEGIN
	IF _EMPID = 0 THEN
		INSERT INTO Employee(Name, EmpCode, Salary)
		VALUES(_Name,_EmpCode,_Salary);
		
		SET _EmpID = LAST_INSERT_ID();
	ELSE 
		UPDATE Employee
        SET
        Name = _Name,
        EmpCode = _EmpCode,
        Salary = _Salary
        WHERE EmpID = _EmpID;
	END IF;
    
    SELECT _EmpID AS 'EmpID';
END
