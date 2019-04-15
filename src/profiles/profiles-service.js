'use strict';
const ProfilesService = {
  getAllProfiles(knex) {
    return knex.select('*').from('squad_finder_profiles');
  },
  getById(knex, id) {
    return knex.from('squad_finder_profiles').select('*').where('id', id).first();
  },
  insertProfile(knex, newProfile) {
    return knex
      .insert(newProfile)
      .into('squad_finder_profiles')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteProfile(knex, id) {
    return knex('squad_finder_profiles')
      .where({ id })
      .delete();
  },
  updateProfile(knex, id, newProfilesFields) {
    return knex('squad_finder_profiles')
      .where({ id })
      .update(newProfilesFields);
  }
};
  
module.exports = ProfilesService;