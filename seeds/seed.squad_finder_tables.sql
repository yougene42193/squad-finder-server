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


COMMIT;