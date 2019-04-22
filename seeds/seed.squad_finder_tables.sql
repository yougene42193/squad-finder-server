BEGIN;

TRUNCATE
    squad_finder_profiles,
    squad_finder_users
    RESTART IDENTITY CASCADE;

INSERT INTO squad_finder_users (user_name, password)
VALUES 
    ('demouser', 'demopassword'),
    ('demouser2', 'demopassword2'),
    ('demouser3', 'demopassword3'),
    ('demouser4', 'demopassword4'),
    ('demouser5', 'demopassword5'),
    ('demouser6', 'demopassword6'),
    ('demouser7', 'demopassword7'),
    ('demouser8', 'demopassword8');

INSERT INTO squad_finder_profiles (profile_name, platform, game, region, playstyle, user_id)
VALUES
    ('demoprofile', 'Xbox One', 'Apex Legends', 'NA', 'Casual', 1),
    ('demoprofile1', 'Xbox One', 'Fortnite', 'NA', 'Semi-Hardcore', 2),
    ('demoprofile2', 'Playstation 4', 'COD Blackout', 'NA', 'Hardcore', 3),
    ('demoprofile3', 'PC', 'PUBG', 'EU', 'Casual', 4),
    ('demoprofile4', 'PC', 'Fortnite', 'NA', 'Casual', 5),
    ('demoprofile5', 'Xbox One', 'PUBG', 'EU', 'Casual', 6),
    ('demoprofile6', 'PC', 'Apex Legends', 'EUW', 'Semi-Hardcore', 7),
    ('demoprofile7', 'Playstation 4', 'Apex Legends', 'NA', 'Hardcore', 8);
    /*('demoprofile8', 'Xbox One', 'Apex Legends', 'EU', 'Casual'),
    ('demoprofile9', 'PC', 'Fortnite', 'EUW', 'Casual'),
    ('demoprofile10', 'Playstation 4', 'COD Blackout', 'AS', 'Casual'),
    ('demoprofile11', 'PC', 'PUBG', 'BR', 'Semi-Hardcore'),
    ('demoprofile12', 'Xbox One', 'Apex Legends', 'EUW', 'Casual'),
    ('demoprofile13', 'Xbox One', 'Fortnite', 'AS', 'Casual'),
    ('demoprofile14', 'PC', 'COD Blackout', 'BR', 'Semi-Hardcore'),
    ('demoprofile15', 'Playstation 4', 'Fortnite', 'EU', 'Casual'),
    ('demoprofile16', 'Playstation 4', 'Apex Legends', 'NA', 'Hardcore'),
    ('demoprofile17', 'PC', 'Apex Legends', 'EU', 'Casual'),
    ('demoprofile18', 'Xbox One', 'Apex Legends', 'NA', 'Semi-Hardcore'),
    ('demoprofile19', 'Playstation 4', 'Apex Legends', 'NA', 'Semi-Hardcore');
    */

INSERT INTO squad_finder_favorites (profile_name, platform, game, region, playstyle)
VALUES
    ('demoprofile3'),
    ('demoprofile4'),
    ('demoprofile6');

COMMIT;