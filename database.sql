CREATE TABLE usr(
	usrID VARCHAR(40),
	communityID VARCHAR(5) DEFAULT NULL,
	score INT DEFAULT 0,
	PKU BOOL DEFAULT FALSE,
	name VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	countBag INT DEFAULT 0,
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
	PRIMARY KEY(invitatieCode),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;

CREATE TABLE invitated (
	invitatieCode VARCHAR(15),
	usrID VARCHAR(40),
	PRIMARY KEY(usrID),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;

CREATE TABLE dyna (
	dynamicID VARCHAR(15),
	usrID VARCHAR(40),
	dynamicDate DATETIME,
	good INT DEFAULT 0,
	countBag INT,
	say VARCHAR(140) DEFAULT NULL,
	image VARCHAR(20) DEFAULT NULL,
	PRIMARY KEY(dynamicID, usrID),
	FOREIGN KEY (usrID) REFERENCES usr(usrID)
)DEFAULT CHARSET=utf8;


SELECT MAX(countBag), name
FROM community
GROUP by name



"名字或邮箱填写错误"
"邀请码不存在"
北大山鹰社