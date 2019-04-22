ALTER TABLE squad_finder_users
    DROP COLUMN IF EXISTS favorite_id;

DROP TABLE IF EXISTS squad_finder_favorites;