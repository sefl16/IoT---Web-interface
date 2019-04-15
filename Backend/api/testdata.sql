
INSERT INTO user(username, P_hash, first_name, last_name, email, phoneNumber, address,op5_key)
VALUES("kalle", "passwurd", "Kalle","svenson", "kalle@fiktiv.se", "070-12344411", "KnAvagen3","qwertyuiopasdfghjkl"),
      ("lixsom", "wurdpass", "maj", "kullberg", "maj@fiktiv.se", "070-94112331", "KnAvagen4","lkjhgfdsaqwertyuiop"),
      ("sebastion", "testarpass", "sebbeboiii","efternamn", "sebastian@fiktiv.se", "12412211111", "KnAvagen5", "okmijnuhbyhgvtfcrdx");

INSERT INTO complex(address, city)
VALUES
("Testgatan", "Karlskrona"),
("Kungsgatan", "Karlstad"),
("Nyvagen", "Stockholm");



INSERT INTO userComplex (userId, complexId)
VALUES (1, 1),
	   (1, 2),
       (2, 2),
       (2, 3);


INSERT INTO apartments (address, appNumber) 
VALUES ("Testgatan", "1234"),
	   ("Testgatan", "1111"),
       ("Testgatan", "2222");
       
       
INSERT INTO sensors(appNumber, devEUI)
VALUES("1234", "WDJA12WDA2151CAWDMA"),
      ("1111", "AWDIDCMA1251ACC1241"),
      ("2222", "AFIA21AFMAA251AWMA5");
      
-- testing all the procedures
CALL addUser("Olle", 'thispassword', "Olle", "Olsson", "Olle@thisisamail.com", "070-15675678", "Ollesgata", "apejroigrgafq3w4etr9j39");
CALL addComplex("Ollesgata", "Karlskrona");
CALL connectUserToComplex("Olle", "Ollesgata", "Karlskrona");
CALL connectUserToComplex("Olle", "Nyvägen", "Stockholm");
CALL addApartment("Ollesgata", 1526);
CALL addSensor("1526", "WAERXAxwegewewtko1239");
CALL displayUsers();
CALL displaySpesificUser(1);
CALL displaySpesificUser(4);
CALL updateUser(1, 'nyttpass', "Kalle", "svenson", "kalle@fiktiv.se", "070-12344411", "knAvagen3"); 



-- SELECT * from user;
-- SELECT* from complex;
-- SELECT* from userComplex;
-- SELECT * from apartments;
-- SELECT * from sensors;
-- SELECT CONVERT(email USING utf8) from user;
-- SELECT CONVERT(aes_decrypt(email, 'something123')USING utf8) from user where first_name ="Kalle";
-- SELECT CONVERT(aes_decrypt(email, 'thisIsAnEncryptionKey123')USING utf8) FROM user WHERE first_name="Olle";

CALL removeSensor("WDJA12WDA2151CAWDMA");
CALL deleteUser (4);
CALL removeApartment(1526);
CALL removeApartment(1111);
CALL removeApartment(1234);
CALL removeApartment(2222);
SELECT* from complex;
SELECT* from userComplex;
SELECT * from apartments;
select* from sensors;
CALL removeComplex(4);
CALL removeComplex(1);