
INSERT INTO user(username, pHash, firstname, lastname, email, phonenumber, address, op5Key, admin)
VALUES("Kalle", "passwurd", "Kalle","svenson", "kalle@fiktiv.se", "070-12344411", "KnAvagen3","qwertyuiopasdfghjkl", true),
      ("lixsom", "wurdpass", "maj", "kullberg", "maj@fiktiv.se", "070-94112331", "KnAvagen4","lkjhgfdsaqwertyuiop", false),
      ("sebastion", "testarpass", "sebbeboiii","efternamn", "sebastian@fiktiv.se", "12412211111", "KnAvagen5", "okmijnuhbyhgvtfcrdx", false);

INSERT INTO complex(userID ,address, city)
VALUES
(1, "Testgatan", "Karlskrona"),
(1, "Kungsgatan", "Karlstad"),
(1, "Nyvagen", "Stockholm");


INSERT INTO apartments (complexID, appNumber)
VALUES (1, "1234"),
	   (1, "1111"),
       (1, "2222"),
	   (2, "12151"),
	   (3, "159012");

INSERT INTO sensors(appID, devEUI)
VALUES(1, "WDJA12WDA2151CAWDMA"),
      (2, "AFIA21AFMAA251AWMA5"),
	  (3, "AEONF#=A=#MFALS=!!="),
	  (4, "SGIA#)#NASNDAPW125");
