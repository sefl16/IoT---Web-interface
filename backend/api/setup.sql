DROP DATABASE IF EXISTS studentverken;
CREATE database studentverken;

-- GRANT ALL ON studentverken.* TO user@localhost IDENTIFIED BY 'pass';


-- visa vad en användare kan göra mot vilken databas
SHOW GRANTS FOR root@localhost;

-- Visa för nuvarande användare
SHOW GRANTS FOR CURRENT_USER;

USE studentverken;

DROP TABLE IF EXISTS user;
USE studentverken;
CREATE TABLE user
(
    id INT auto_increment PRIMARY KEY,
    username varchar(30) not null UNIQUE,
    P_hash varchar(300) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    email varchar(300) not null,
    phoneNumber varchar(30) not null,
    address varchar(30) not null,
    op5_key varchar(30)
);

DROP TABLE IF EXISTS complex;
CREATE TABLE complex
(
    id INT auto_increment PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userID) REFERENCES user(id),
    address varchar(30) not null,
    city varchar(30) not null,
    KEY (address)
);



DROP TABLE IF EXISTS apartments;
CREATE TABLE apartments
(
    address varchar(30) not null,
    appNumber INT not null,

	FOREIGN KEY (address) REFERENCES complex(address),
    PRIMARY KEY (address, appNumber),
    KEY (appNumber)
);

DROP TABLE IF EXISTS sensors;
CREATE TABLE sensors
(
    appNumber INT not null,
    devEUI varchar(50) not null PRIMARY KEY,

    FOREIGN KEY (appNumber) REFERENCES apartments(appNumber)
);

-- creates a view that is used for the procedure userApartmentsInfo
DROP VIEW IF EXISTS userApartmentsInfo;

CREATE VIEW userApartmentsInfo AS
	SELECT
		c.userID,
        c.ID AS complexID,
        c.city,
        a.address,
        a.appNumber,
		s.devEUI
	FROM complex AS c
		JOIN apartments AS a
			ON a.address = c.address
		JOIN sensors AS s
			ON s.appNumber = a.appNumber;

-- procedure to add a user this can be updated with encryption and hashing?
DROP PROCEDURE IF EXISTS addUser;

delimiter //

CREATE PROCEDURE addUser
(
	aUsername varchar(30),
    aPassword varchar(255),
    aFirst_name varchar(30),
    aLast_name varchar(30),
    aEmail varchar(30),
    aPhoneNumber varchar(30),
    aAddress varchar(30),
    aOp5_key varchar(30)

)
BEGIN

	INSERT INTO `user`
		(username, P_hash, first_name, last_name, email, phoneNumber, address, op5_key)
			VALUES
				(aUsername, aPassword, aFirst_name, aLast_name, aEmail, aPhoneNumber, aAddress, aOP5_key);

END
//
delimiter ;
-- procedure to add a complex
DROP PROCEDURE IF EXISTS addComplex;

delimiter //
CREATE PROCEDURE addComplex
(
    aAddress varchar(30),
    aCity varchar(30),
    uID INT
)
BEGIN

	INSERT INTO complex
		(address, city, userID)
			VALUES
				(aAddress, aCity, uID);
END
//
delimiter ;

-- adds a apartment into a complex (this assumes the complex already exists in the system)
DROP PROCEDURE IF EXISTS addApartment;

delimiter //

CREATE PROCEDURE addApartment
(
	aAddress varchar(30),
    aAppNumber INT
)

BEGIN
	INSERT INTO apartments (address, appNumber)
    VALUES
		(aAddress, aAppNumber);

END
//

delimiter ;

-- adds a sensor to an apartment (this assumes the apartment already exists in the system)
DROP PROCEDURE IF EXISTS addSensor;

delimiter //

CREATE PROCEDURE addSensor
(
	aAppNumber INT,
    aDevEUI VARCHAR(50)
)
BEGIN
	INSERT INTO sensors (appNumber, devEUI)
		VALUES
			( aAppNumber, aDevEUI);

END
//

delimiter ;
-- procedure to select all the users
DROP PROCEDURE IF EXISTS displayUsers;

delimiter //

CREATE PROCEDURE displayUsers
(
)
BEGIN
	SELECT * FROM user;
END
//

delimiter ;
-- procedure to select a spesific user based on their id
DROP PROCEDURE IF EXISTS displaySpesificUser;

delimiter //

CREATE PROCEDURE displaySpesificUser
(
	aID INT
)
BEGIN
	SELECT * FROM user WHERE id = aID;
END
//

delimiter ;

-- update existing users password first and lasdt name email phonenumber and address (this can also be updated with new encryption salt ect...)
DROP PROCEDURE IF EXISTS updateUser;

delimiter //

CREATE PROCEDURE updateUser
(
	aID INT,
    aPassword varchar(255),
    aFirst_name varchar(30),
    aLast_name varchar(30),
    aEmail varchar(30),
    aPhoneNumber varchar(30),
    aAddress varchar(30)

)
BEGIN
	UPDATE user SET P_hash = aPassword, first_name = aFirst_name, last_name = aLast_name, email = aEmail, phoneNumber = aPhoneNumber, address = aAddress WHERE aID = id;
END
//

delimiter ;

-- deletes a user from the database based on the id
DROP PROCEDURE IF EXISTS deleteUser;

delimiter //

CREATE PROCEDURE deleteUser
(
	aID INT
)
BEGIN
	DELETE FROM userComplex WHERE aID = userID;
	DELETE FROM user WHERE aID = id LIMIT 1;
END
//

delimiter ;
-- removes a sensor from based on its devEUI
DROP PROCEDURE IF EXISTS removeSensor;
delimiter //

CREATE PROCEDURE removeSensor
(
	aDevEUI VARCHAR(50)
)
BEGIN
	DELETE FROM sensors WHERE devEUI = aDevEUI LIMIT 1;
END
//

delimiter ;
-- removes an apartment from the database and any sensor connected to it
DROP PROCEDURE IF EXISTS removeApartment;

delimiter //

CREATE PROCEDURE removeApartment
(
	aAppNumber varchar(30)
)
BEGIN
	DELETE FROM sensors WHERE aAppNumber = appNumber;
	DELETE FROM apartments where aAppNumber = appNumber LIMIT 1;
END
//

delimiter ;

-- removes a whole complex from the database only works if there are no apartments connected to the complex
DROP PROCEDURE IF EXISTS removeComplex;

delimiter //

CREATE PROCEDURE removeComplex
(
	aID INT
)
BEGIN
	DELETE FROM userComplex WHERE complexID = aID;
	DELETE FROM complex WHERE id = aID LIMIT 1;
END
//

delimiter ;

-- procedure to display info about all apartments connected to them
DROP PROCEDURE IF EXISTS userApartmentsInfo;

delimiter //

CREATE PROCEDURE userApartmentsInfo
(
	aUserID INT

)
BEGIN
		SELECT * FROM userApartmentsInfo where userID = aUserID ORDER BY address;
END
//

delimiter ;

DROP PROCEDURE IF EXISTS displayComplexForUser;
delimiter //
CREATE PROCEDURE displayComplexForUser
(
	aID INT
)
BEGIN
	SELECT DISTINCT city, address, complexID, userID FROM userApartmentsInfo where aID = userID;
END
//
delimiter ;


DROP PROCEDURE IF EXISTS getComplexApps;
delimiter //
CREATE PROCEDURE getComplexApps
(
	aUserID INT,
    aComplexID INT
)
BEGIN
	SELECT appnumber FROM userApartmentsInfo WHERE aUserID = userID AND aComplexID = complexID;
END
//
delimiter ;
