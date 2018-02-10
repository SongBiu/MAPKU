CREATE TABLE usr(
	usr_id VARCHAR(40),
	community_id VARCHAR(5) DEFAULT NULL,
	score INT DEFAULT 0,
	PKU BOOL DEFAULT FALSE,
	PRIMARY KEY (usr_id),
	FOREIGN KEY (community_id) REFERENCES community(community_id)
)DEFAULT CHARSET=utf8;

CREATE TABLE community (
	community_id VARCHAR(10),
	name VARCHAR(20),
	allBag INT DEFAULT 0,
	PRIMARY KEY (community_id)
)DEFAULT CHARSET=utf8;

CREATE TABLE invitate (
	invitation_code VARCHAR(15),
	inviter_id VARCHAR(40) NOT NULL,
	PRIMARY KEY(invitation_code),
	FOREIGN KEY (inviter_id) REFERENCES usr(usr_id)
)DEFAULT CHARSET=utf8;

CREATE TABLE invitated (
	invitation_code VARCHAR(15),
	newusr_id VARCHAR(40),
	PRIMARY KEY(invitation_code, newusr_id),
	FOREIGN KEY (newusr_id) REFERENCES usr(usr_id)
)DEFAULT CHARSET=utf8;

CREATE TABLE dyna (
	dynamic_id VARCHAR(15),
	usr_id VARCHAR(40),
	dynamic_date DATETIME,
	good INT DEFAULT 0,
	count_bag INT,
	say VARCHAR(140) DEFAULT NULL,
	image VARCHAR(20) DEFAULT NULL,
	PRIMARY KEY(dynamic_id, usr_id),
	FOREIGN KEY (usr_id) REFERENCES usr(usr_id)
)DEFAULT CHARSET=utf8;


SELECT MAX(countBag), name
FROM community
GROUP by name

INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('0', '5', '2018-1-1 12:12:12', 1, 'today I am happy', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('1', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('2', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('3', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('4', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('5', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('6', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('7', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
INSERT INTO dyna(dynamic_id, usr_id, dynamic_date, count_Bag, say, image) VALUES ('8', '5', '2017-1-1 12:12:12', 1, 'hi, I am lisong', 'x.png');
