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

INSERT INTO squad_finder_profiles (profile_name, platform, game, region, user_id)
VALUES
    ('demoprofile', 'Xbox One', 'Apex Legends', 'NA', 1),
    ('demoprofile1', 'Xbox One', 'Fortnite', 'NA', 2),
    ('demoprofile2', 'Playstation 4', 'COD Blackout', 'NA', 3),
    ('demoprofile3', 'PC', 'PUBG', 'EU', 4),
    ('demoprofile4', 'PC', 'Fortnite', 'NA', 5),
    ('demoprofile5', 'Xbox One', 'PUBG', 'EU', 6),
    ('demoprofile6', 'PC', 'Apex Legends', 'EUW', 7),
    ('demoprofile7', 'Playstation 4', 'Apex Legends', 'NA', 8);
    /*('demoprofile8', 'Xbox One', 'Apex Legends', 'EU'),
    ('demoprofile9', 'PC', 'Fortnite', 'EUW'),
    ('demoprofile10', 'Playstation 4', 'COD Blackout', 'AS'),
    ('demoprofile11', 'PC', 'PUBG', 'BR'),
    ('demoprofile12', 'Xbox One', 'Apex Legends', 'EUW'),
    ('demoprofile13', 'Xbox One', 'Fortnite', 'AS'),
    ('demoprofile14', 'PC', 'COD Blackout', 'BR'),
    ('demoprofile15', 'Playstation 4', 'Fortnite', 'EU'),
    ('demoprofile16', 'Playstation 4', 'Apex Legends', 'NA'),
    ('demoprofile17', 'PC', 'Apex Legends', 'EU'),
    ('demoprofile18', 'Xbox One', 'Apex Legends', 'NA'),
    ('demoprofile19', 'Playstation 4', 'Apex Legends', 'NA');
    */

INSERT INTO squad_finder_favorites (profile_name)
VALUES
    ('demoprofile3'),
    ('demoprofile4'),
    ('demoprofile6');

COMMIT;