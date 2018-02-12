CREATE TABLE community (
	communityID VARCHAR(10),
	name VARCHAR(20),
	allBag INT DEFAULT 0,
	PRIMARY KEY (communityID)
)DEFAULT CHARSET=utf8;

CREATE TABLE usr(
	usrID VARCHAR(40),
	communityID VARCHAR(5) DEFAULT NULL,
	score INT DEFAULT 0,
	PKU BOOL DEFAULT FALSE,
	name VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	PRIMARY KEY (usrID),
	FOREIGN KEY (communityID) REFERENCES community(communityID)
)DEFAULT CHARSET=utf8;

CREATE TABLE community (
	communityID VARCHAR(10),
	name VARCHAR(20),
	allBag INT DEFAULT 0,
	PRIMARY KEY (communityID)
)DEFAULT CHARSET=utf8;

CREATE TABLE invitate (
	invitateCode VARCHAR(15),
	usrID VARCHAR(40) NOT NULL,
	PRIMARY KEY(invitateCode),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;

CREATE TABLE invitated (
	invitateCode VARCHAR(15),
	usrID VARCHAR(40),
	PRIMARY KEY(invitateCode, usrID),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;

CREATE TABLE dyna (
	dynamicID VARCHAR(15),
	usrID VARCHAR(40),
	dynamicDate DATETIME,
	good INT DEFAULT 0,
	countBag INT,
	say VARCHAR(140) DEFAULT NULL,
	image VARCHAR(80) DEFAULT NULL,
	PRIMARY KEY(dynamicID),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;


SELECT MAX(countBag), name
FROM community
GROUP by name

INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('0', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2017-12-04 12:12:12', 2, 'this is lisong')
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('1', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2015-12-04 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('2', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2014-12-04 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('3', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2016-12-04 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('4', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2017-11-04 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('5', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2017-7-04 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('6', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2017-4-03 12:12:12', 2, 'this is lisong');
INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('7', 'o77EP5Zl7suJ4rHpnhViZOjDiEgY', '2017-12-04 12:12:12', 2, 'this is lisong');