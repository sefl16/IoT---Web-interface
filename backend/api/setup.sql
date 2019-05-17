DROP DATABASE IF EXISTS studentverken;
CREATE database studentverken;

USE studentverken;

DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    id INT auto_increment PRIMARY KEY,
    username varchar(30) not null UNIQUE,
    pHash varchar(300) not null,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    email varchar(300) not null,
    phonenumber varchar(30) not null,
    address varchar(30) not null,
    op5Key varchar(30),
    admin boolean
);

DROP TABLE IF EXISTS complex;
CREATE TABLE complex
(
    id INT auto_increment PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userID) REFERENCES user(id) ON DELETE CASCADE,
    address varchar(30) not null,
    city varchar(30) not null,
    KEY (address)
);



DROP TABLE IF EXISTS apartments;
CREATE TABLE apartments
(
	id INT auto_increment PRIMARY KEY,
	complexID INT,
	appNumber INT not null,

	FOREIGN KEY (complexID) REFERENCES complex(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS sensors;
CREATE TABLE sensors
(
  appID INT not null,
  devEUI varchar(50) not null PRIMARY KEY,

  FOREIGN KEY (appID) REFERENCES apartments(id) ON DELETE CASCADE
);

-- creates a view that is used for the procedure userApartmentsInfo
DROP VIEW IF EXISTS userApartmentsInfo;

CREATE VIEW userApartmentsInfo AS
	SELECT
		c.userID,
        c.id,
        c.address,
        c.city,
        a.appNumber,
		s.devEUI,
        a.complexID
	FROM complex AS c
		JOIN apartments AS a
			ON a.complexID = c.id
		JOIN sensors AS s
			ON s.appID = a.id;

-- procedure to add a user this can be updated with encryption and hashing?
DROP PROCEDURE IF EXISTS addUser;

delimiter //

CREATE PROCEDURE addUser
(
	aUsername varchar(30),
    aPassword varchar(255),
    aFirstname varchar(30),
    aLastname varchar(30),
    aEmail varchar(30),
    aPhonenumber varchar(30),
    aAddress varchar(30),
    aop5Key varchar(30),
    aAdmin boolean

)
BEGIN

	INSERT INTO `user`
		(username, pHash, firstname, lastname, email, phonenumber, address, op5Key, admin)
			VALUES
				(aUsername, aPassword, aFirstname, aLastname, aEmail, aPhonenumber, aAddress, aOp5Key, aAdmin);

END
//
delimiter ;
-- procedure to add a complex
DROP PROCEDURE IF EXISTS addComplex;

delimiter //
CREATE PROCEDURE addComplex
(
	aUserID INT,
    aAddress varchar(30),
    aCity varchar(30)
)
BEGIN

	INSERT INTO complex
		(userID, address, city)
			VALUES
				(aUserID, aAddress, aCity);
END
//
delimiter ;

-- adds a apartment into a complex (this assumes the complex already exists in the system)
DROP PROCEDURE IF EXISTS addApartment;

delimiter //

CREATE PROCEDURE addApartment
(
	aComplexID INT,
    aAppNumber INT
)

BEGIN
	INSERT INTO apartments (complexID, appNumber)
    VALUES
		(aComplexID, aAppNumber);

END
//

delimiter ;

-- adds a sensor to an apartment (this assumes the apartment already exists in the system)
DROP PROCEDURE IF EXISTS addSensor;

delimiter //

CREATE PROCEDURE addSensor
(
	aAppID INT,
    aDevEUI VARCHAR(50)
)
BEGIN
	INSERT INTO sensors (appID, devEUI)
		VALUES
			( aAppID, aDevEUI);

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
-- procedure for the admin page to display complexes attached to the user
DROP PROCEDURE IF EXISTS displayComplexes;
delimiter //
CREATE PROCEDURE displayComplexes
(
	aID INT
)
BEGIN
	SELECT * FROM complex WHERE aID = userID;
END
//
delimiter ;

-- procedure for the admin page to display complexes attached to the user
DROP PROCEDURE IF EXISTS displaySensors;
delimiter //
CREATE PROCEDURE displaySensors
(
	aID INT
)
BEGIN
	SELECT * FROM sensors WHERE aID = appID;
END
//
delimiter ;

-- procedure for the admin page to display apartments in complexes attached to the user
DROP PROCEDURE IF EXISTS displayComplexApartments;
delimiter //
CREATE PROCEDURE displayComplexApartments
(
    aComplexID INT
)
BEGIN
	SELECT a.appNumber, a.id , c.address, c.id as complexID
		FROM complex AS c
			JOIN apartments AS a
            ON c.id = a.complexID
            WHERE c.id = a.complexID AND c.id = aComplexID;
END
//
delimiter ;

-- update existing users password first and lasdt name email phonenumber and address (this can also be updated with new encryption salt ect...)
DROP PROCEDURE IF EXISTS updateUser;

delimiter //

CREATE PROCEDURE updateUser
(
	aID INT,
    aUsername varchar(30),
    aPassword varchar(255),
    aFirstname varchar(30),
    aLastname varchar(30),
    aEmail varchar(30),
    aPhonenumber varchar(30),
    aAddress varchar(30),
	aOp5Key varchar(30),
    aAdmin boolean

)
BEGIN
	UPDATE user SET username = aUsername, pHash = aPassword, firstname = aFirstname, lastname = aLastname, email = aEmail, phonenumber = aPhonenumber, address = aAddress, op5Key = aOp5Key, admin = aAdmin WHERE aID = id;
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
	aAppID INT
)
BEGIN
	DELETE FROM apartments where aAppID = id LIMIT 1;
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


DROP PROCEDURE IF EXISTS editApartment;
delimiter //
CREATE PROCEDURE editApartment
(
	aAppNumber varchar(30)
)
BEGIN
	UPDATE apartments SET appNumber = aAppNumber WHERE aAppNumber = appNumber;
END
//
delimiter ;


DROP PROCEDURE IF EXISTS editSensor;
delimiter //
CREATE PROCEDURE editSensor
(
	aDevEUI varchar(50)
)
BEGIN

	UPDATE sensors SET devEUI = aDevEUI WHERE aDevEUI = devEUI;

END
//
delimiter ;


DROP PROCEDURE IF EXISTS login;
delimiter //
CREATE PROCEDURE login
(
	aEmail varchar(30)
)
BEGIN

	SELECT id, username, firstname, lastname, pHash, email, op5Key, address, phonenumber, admin FROM user WHERE email = aEmail LIMIT 0,1;

END
//
delimiter ;
