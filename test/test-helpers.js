'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
    },
    {
      id: 5,
      user_name: 'test-user-5',
      password: 'password',
    },
  ];
}

function makeProfilesArray(users) {
  return [
    {
      id: 1,
      profile_name: 'testprofile1',
      platform: 'Xbox One',
      game: 'Apex Legends',
      region: 'NA',
      playstyle: 'Casual',
    },
    {
      id: 2,
      profile_name: 'testprofile2',
      platform: 'Playstation 4',
      game: 'Fortnite',
      region: 'EU',
      playstyle: 'Semi-Hardcore',
    },
    {
      id: 3,
      profile_name: 'testprofile3',
      platform: 'PC',
      game: 'COD Blackout',
      region: 'EUW',
      playstyle: 'Hardcore',
    },
    {
      id: 4,
      profile_name: 'testprofile4',
      platform: 'Xbox One',
      game: 'PUBG',
      region: 'AS',
      playstyle: 'Casual',
    },
    {
      id: 5,
      profile_name: 'testprofile5',
      platform: 'Xbox One',
      game: 'Apex Legends',
      region: 'BR',
      playstyle: 'Casual',
    },
  ];
}

function makeProfilesFixtures() {
  const testUsers = makeUsersArray();
  const testProfiles = makeProfilesArray(testUsers);
  return { testUsers, testProfiles };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
                squad_finder_profiles,
                squad_finder_users
            `
    )
      .then(() => 
        Promise.all([
          trx.raw('ALTER SEQUENCE squad_finder_profiles_id_seq minvalue 0 START WITH 1'),
          trx.raw('ALTER SEQUENCE squad_finder_users_id_seq minvalue 0 START WITH 1'),
          trx.raw('SELECT setval(\'squad_finder_profiles_id_seq\', 0)'),
          trx.raw('SELECT setval(\'squad_finder_users_id_seq\', 0)'),
        ])
      )
  );
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('squad_finder_users').insert(preppedUsers)
      .then(() =>
        db.raw(
          `SELECT setval('squad_finder_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
    )
}

function seedProfilesTables(db, users, profiles) {
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('squad_finder_profiles').insert(profiles)
      await trx.raw(
        `SELECT setval('squad_finder_profiles_id_seq', ?)`,
        [articles[articles.length - 1].id],
      )
    })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeProfilesArray,

  makeProfilesFixtures,
  cleanTables,
  seedUsers,
  seedProfilesTables,
  makeAuthHeader,
};