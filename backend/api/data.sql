
INSERT INTO user(username, P_hash, first_name, last_name, email, phoneNumber, address,op5_key, admin)
VALUES("Kalle", "passwurd", "Kalle","svenson", "kalle@fiktiv.se", "070-12344411", "KnAvagen3","qwertyuiopasdfghjkl", true),
      ("lixsom", "wurdpass", "maj", "kullberg", "maj@fiktiv.se", "070-94112331", "KnAvagen4","lkjhgfdsaqwertyuiop", false),
      ("sebastion", "testarpass", "sebbeboiii","efternamn", "sebastian@fiktiv.se", "12412211111", "KnAvagen5", "okmijnuhbyhgvtfcrdx", false);

INSERT INTO complex(userID ,address, city)
VALUES
(1, "Testgatan", "Karlskrona"),
(1, "Kungsgatan", "Karlstad"),
(1, "Nyvagen", "Stockholm");



-- INSERT INTO userComplex (userId, complexId)
-- VALUES (1, 1),
--  	   (1, 2),
--       (1, 3);


INSERT INTO apartments (address, appNumber)
VALUES ("Testgatan", "1234"),
	   ("Testgatan", "1111"),
       ("Testgatan", "2222"),
	   ("kungsgatan", "12151"),
	   ("Nyvagen", "159012");

CALL editApartment("1234", "Nyvagen");
INSERT INTO sensors(appNumber, devEUI)
VALUES("1234", "WDJA12WDA2151CAWDMA"),
      ("1111", "AWDIDCMA1251ACC1241"),
      ("2222", "AFIA21AFMAA251AWMA5"),
	  ("12151", "AEONF#=A=#MFALS=!!="),
	  ("159012", "SGIA#)#NASNDAPW125");
