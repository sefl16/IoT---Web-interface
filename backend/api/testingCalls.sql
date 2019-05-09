
select * from user;
select * from complex;
-- testing all the procedures
-- CALL addUser("Olle", 'thispassword', "Olle", "Olsson", "Olle@thisisamail.com", "070-15675678", "Ollesgata", "apejroigrgafq3w4etr9j39");
-- CALL addComplex("Ollesgata", "Karlskrona");
-- CALL addComplex("Kallesgata", "Karlskrona");
-- CALL addComplex("entillgata", "Karlskrona");
-- CALL connectUserToComplex("Olle", "Ollesgata", "Karlskrona");
-- CALL connectUserToComplex("Olle", "Nyvägen", "Stockholm");
-- CALL connectUserToComplex("Kalle", "entillgata", "Karlskrona");
-- -- CALL connectUserTOComplex("Kalle", "Ollesgata", "Karlskrona");
-- CALL connectUserToComplex("Kalle", "Kallesgata", "Karlskrona");
-- CALL addApartment("Ollesgata", 1526);
-- CALL addApartment("Kallesgata", 1112);
-- CALL addApartment("Kallesgata", 12345);
-- CALL addApartment("Kallesgata", 98765);
-- CALL addApartment("entillgata", 67854);
-- CALL addSensor(67854, "ejivosrjpaorfhuaoei");
-- CALL addSensor(1526, "WAERXAxwegewewtko1239");
-- CALL addSensor(1112, "WAESRDTHTRSEAESR");
-- CALL addSensor(12345, "WERTYGDETGFD");
-- CALL displayUsers();
-- CALL displaySpesificUser(1);
-- CALL displaySpesificUser(4);
-- CALL updateUser(1, 'nyttpass', "Kalle", "svenson", "kalle@fiktiv.se", "070-12344411", "knAvagen3");


-- SELECT * from user;
-- SELECT* from complex;
-- SELECT* from userComplex;
-- SELECT * from apartments;
-- SELECT * from sensors;
-- SELECT CONVERT(email USING utf8) from user;
-- SELECT CONVERT(aes_decrypt(email, 'something123')USING utf8) from user where first_name ="Kalle";
-- SELECT CONVERT(aes_decrypt(email, 'thisIsAnEncryptionKey123')USING utf8) FROM user WHERE first_name="Olle";

-- SELECT* from complex;
-- SELECT* from userComplex;
-- SELECT * from apartments;
-- select* from sensors;
-- -- CALL removeComplex(4);
-- -- CALL removeComplex(1);
-- CALL adduser('asd', '123', 'test', 'test', 'test', 'test', 'test', 'test', false);
-- call updateUser(1, '123', 'test', 'test', 'test', 'test', 'test', 'test', 'test', true);
-- select * from userapartmentsinfo;
-- CALL userApartmentsInfo(1);
-- CALL editApartment("1234", "Nyvagen");

-- CALL displayComplexForUser(1);
select * from sensors;
-- CALL editSensor("WDJA12WDA2151CAWDMA", "2222");
-- CALL getComplexApps(1,5);
select * from sensors;

CALL displayComplexes(1);
CALL displayComplexes(2);
CALL displayComplexApartments(1);

CALL login('kalle@fiktiv.se');