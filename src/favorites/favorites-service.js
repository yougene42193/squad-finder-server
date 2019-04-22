'use strict';
const FavoritesService = {
  getAllFavorites(knex) {
    return knex.select('*').from('squad_finder_favorites');
  },
  getById(knex, id) {
    return knex.from('squad_finder_favorites').select('*').where('id', id).first();
  },
  insertProfile(knex, newProfile) {
    return knex
      .insert(newProfile)
      .into('squad_finder_favorites')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteProfile(knex, id) {
    return knex('squad_finder_favorites')
      .where({ id })
      .delete();
  },
  updateProfile(knex, id, newProfilesFields) {
    return knex('squad_finder_favorites')
      .where({ id })
      .update(newProfilesFields);
  }
};
  
module.exports = FavoritesService;