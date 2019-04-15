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
    ('demouser5', 'demopassword5');

INSERT INTO squad_finder_profiles (profile_name, platform, game, region, playstyle)
VALUES
    ('demoprofile', 'Xbox One', 'Apex Legends', 'NA', 'Casual'),
    ('demoprofile1', 'Xbox One', 'Fortnite', 'NA', 'Semi-Hardcore'),
    ('demoprofile2', 'Playstation 4', 'COD Blackout', 'NA', 'Hardcore'),
    ('demoprofile3', 'PC', 'PUBG', 'EU', 'Casual'),
    ('demoprofile4', 'PC', 'Fortnite', 'NA', 'Casual'),
    ('demoprofile5', 'Xbox One', 'PUBG', 'EU', 'Casual'),
    ('demoprofile6', 'PC', 'Apex Legends', 'EUW', 'Semi-Hardcore'),
    ('demoprofile7', 'Playstation 4', 'Apex Legends', 'NA', 'Hardcore'),
    ('demoprofile8', 'Xbox One', 'Apex Legends', 'EU', 'Casual'),
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

COMMIT;