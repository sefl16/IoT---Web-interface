
DROP DATABASE IF EXISTS studentverken;
CREATE database studentverken;

#GRANT ALL ON studentverken.* TO user@localhost IDENTIFIED BY 'pass';


-- visa vad en användare kan göra mot vilken databas
SHOW GRANTS FOR root@localhost;

-- Visa för nuvarande användare
SHOW GRANTS FOR CURRENT_USER;

USE studentverken;

DROP database IF EXISTS studentverken;
CREATE database studentverken;

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
    address varchar(30) not null,
    city varchar(30) not null,
    KEY (address)
);

DROP TABLE IF EXISTS userComplex;
CREATE TABLE userComplex
(
    userID INT not null,
    complexID INT not null,
    FOREIGN KEY (userID) REFERENCES user(id),
    FOREIGN KEY (complexID) REFERENCES complex(id),
    PRIMARY KEY (complexID, userID)
);

DROP TABLE IF EXISTS apartments;
CREATE TABLE apartments
(
    address varchar(30) not null,
    appNumber INT not null UNIQUE,
    
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


-- procedure to add a user this can be updated with encryption and hashing?
DROP PROCEDURE IF EXISTS addUser;

DELIMITER ;;

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
;;
DELIMITER ;
-- procedure to add a complex
DROP PROCEDURE IF EXISTS addComplex;

DELIMITER ;; 
CREATE PROCEDURE addComplex
(
    aAddress varchar(30),
    aCity varchar(30)
)
BEGIN

	INSERT INTO complex
		(address, city)
			VALUES
				(aAddress, aCity);
END 
;;
DELIMITER ;

-- connects a user to a complex
DROP PROCEDURE IF EXISTS connectUserToComplex;

DELIMITER ;;

CREATE PROCEDURE connectUserToComplex
(	
	aUsername varchar(30),
    aAddress varchar(30),
    aCity varchar(30)
	
)
BEGIN
	INSERT INTO usercomplex (userID, complexID)
    SELECT
    u.id,
    c.id
	FROM user AS u
    JOIN complex AS c
    WHERE u.username = aUsername AND c.address = aAddress AND c.city = aCity;
    
END
;;
DELIMITER ;

-- adds a apartment into a complex (this assumes the complex already exists in the system)
DROP PROCEDURE IF EXISTS addApartment;

DELIMITER ;;

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
;;
DELIMITER ;

-- adds a sensor to an apartment (this assumes the apartment already exists in the system)
DROP PROCEDURE IF EXISTS addSensor;
DELIMITER ;;
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
;;
DELIMITER ;
-- procedure to select all the users
DROP PROCEDURE IF EXISTS displayUsers;
DELIMITER ;; 
CREATE PROCEDURE displayUsers
(
)
BEGIN 
	SELECT * FROM user;
END
;;
DELIMITER ;
-- procedure to select a spesific user based on their id
DROP PROCEDURE IF EXISTS displaySpesificUser;
DELIMITER ;;
CREATE PROCEDURE displaySpesificUser
(
	aID INT
)
BEGIN
	SELECT * FROM user WHERE id = aID;
END 
;; 
DELIMITER ;

-- update existing users password first and lasdt name email phonenumber and address (this can also be updated with new encryption salt ect...)
DROP PROCEDURE IF EXISTS updateUser;
DELIMITER ;;
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
;;
DELIMITER ;

-- deletes a user from the database based on the id
DROP PROCEDURE IF EXISTS deleteUser
DELIMITER ;;
CREATE PROCEDURE deleteUser
(
	aID INT
)
BEGIN
	DELETE FROM usercomplex WHERE aID = userID;
	DELETE FROM user WHERE aID = id LIMIT 1;
END
;;
DELIMITER ;
-- removes a sensor from based on its devEUI
DROP PROCEDURE IF EXISTS removeSensor;
DELIMITER ;;
CREATE PROCEDURE removeSensor
(
	aDevEUI VARCHAR(50)
)
BEGIN
	DELETE FROM sensors WHERE devEUI = aDevEUI LIMIT 1;
END
;;
DELIMITER ; 
-- removes an apartment from the database and any sensor connected to it
DROP PROCEDURE IF EXISTS removeApartment;
DELIMITER ;;
CREATE PROCEDURE removeApartment
(
	aAppNumber varchar(30)
)
BEGIN
	DELETE FROM sensors WHERE aAppNumber = appNumber;
	DELETE FROM apartments where aAppNumber = appNumber LIMIT 1;
END
;;
DELIMITER ;

-- removes a whole complex from the database only works if there are no apartments connected to the complex
DROP PROCEDURE IF EXISTS removeComplex
DELIMITER ;;
CREATE PROCEDURE removeComplex
(
	aID INT
)
BEGIN
	DELETE FROM usercomplex WHERE aID = complexID;
	DELETE FROM complex WHERE aID = id LIMIT 1;
END
;;
DELIMITER ;