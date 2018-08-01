USE Balti_db;

DESCRIBE Buckets;

SELECT * FROM Buckets;

DESCRIBE Cos;

SELECT * FROM Cos;

DESCRIBE Users;

SELECT * FROM Users;

INSERT INTO Users ( first_name, last_name, profile_img, total_completed, email, createdAt, updatedAt )
VALUES
("Isabella", "Isabella", "default.jpg", 2, "test@test.com", NOW(), NOW()),
("Brett", "Wagner", "default.jpg", 3, "test@test.com", NOW(), NOW()),
("Mitchell", "Dean", "default.jpg", 8, "test@test.com", NOW(), NOW()),
("Everett", "Steward", "default.jpg", 1, "test@test.com", NOW(), NOW()),
("Clarence", "Clarence", "default.jpg", 3, "test@test.com", NOW(), NOW());

INSERT INTO Buckets ( bucket_items, list_type, public, completed, createdAt, updatedAt, UserId )
VALUES
("Japan", "wish", 0, 0, NOW(), NOW(), 10),
("Sky Diving", "bucket", 1, 0, NOW(), NOW(), 8),
("Bungee Jumping", "wish", 0, 0, NOW(), NOW(), 5),
("Scuba Diving", "bucket", 1, 0, NOW(), NOW(), 7),
("Wing Suit Jumping", "bucket", 0, 0, NOW(), NOW(), 3),
("See the Northern Lights", "wish", 0, 0, NOW(), NOW(), 9),
("Alaska Glaciers", "bucket", 1, 0, NOW(), NOW(), 10),
("Cruise around the world", "wish", 0, 0, NOW(), NOW(), 10),
("Europe", "bucket", 1, 0, NOW(), NOW(), 8),
("India", "bucket", 1, 0, NOW(), NOW(), 6),
("Motorized Hang Gliding", "wish", 0, 0, NOW(), NOW(), 4);

