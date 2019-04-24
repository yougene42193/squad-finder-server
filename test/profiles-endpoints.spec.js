'use strict';
const knex = require('knex');
const app = require('../src/app');
const { makeProfilesArray, makeUsersArray } = require('./test-helpers');

describe('Profiles Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw('TRUNCATE squad_finder_profiles, squad_finder_users RESTART IDENTITY CASCADE'));

  afterEach('cleanup', () => db.raw('TRUNCATE squad_finder_profiles, squad_finder_users RESTART IDENTITY CASCADE'));

  describe('GET /api/profiles', () => {
    context('Given no profiles', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/profiles')
          .expect(200, []);
      });
    });

    context('Given there are profiles in the database', () => {
      const testUsers = makeUsersArray();
      const testProfiles = makeProfilesArray();

      beforeEach('insert profiles', () => {
        return db
          .into('squad_finder_users')
          .insert(testUsers)
          .then(() => {
            return db
              .into('squad_finder_profiles')
              .insert(testProfiles);
          });
      });

      it('responds with 200 and all of the profiles', () => {
        return supertest(app)
          .get('/api/profiles')
          .expect(200, testProfiles);
      });
    });
  });
  describe('GET /api/profiles/:profile_id', () => {
    context('Given no profiles', () => {
      it('responds with 400', () => {
        const profileId = 123456;
        return supertest(app)
          .get(`/api/profiles/${profileId}`)
          .expect(400, { error: { message: 'Profile doesn\'t exist' } });
      });
    });

    context('Given there are profiles in the database', () => {
      const testUsers = makeUsersArray();
      const testProfiles = makeProfilesArray();

      beforeEach('insert profiles', () => {
        return db
          .into('squad_finder_users')
          .insert(testUsers)
          .then(() => {
            return db
              .into('squad_finder_profiles')
              .insert(testProfiles);
          });
      });
      it('responds with 200 and the specified profile', () => {
        const profileId = 2;
        const expectedProfile = testProfiles[profileId - 1];
        return supertest(app)
          .get(`/api/profiles/${profileId}`)
          .expect(200, expectedProfile);
      });
    });
  });
  describe('POST /api/profiles', () => {
    it('creates a profile, responding with a 201 and the new profile', function() {
      const newProfile = {
        profile_name: 'testprofile1',
        platform: 'Xbox One',
        game: 'Apex Legends',
        region: 'NA',
        playstyle: 'Casual'
      };
      return supertest(app)
        .post('/api/profiles')
        .send(newProfile)
        .expect(res => {
          expect(res.body.profile_name).to.eql(newProfile.profile_name);
          expect(res.body.platform).to.eql(newProfile.platform);
          expect(res.body.game).to.eql(newProfile.game);
          expect(res.body.region).to.eql(newProfile.region);
          expect(res.body.playstyle).to.eql(newProfile.playstyle);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(`/api/profiles/${res.body.id}`);
        })
        .then(res => 
          supertest(app)
            .get(`/api/profiles/${res.body.id}`)
            .expect(res.body)
        );
    });

    const requiredFields = ['profile_name', 'platform', 'game', 'region', 'playstyle'];

    requiredFields.forEach(field => {
      const newProfile = {
        profile_name: '',
        platform: '',
        game: '',
        region: '',
        playstyle: ''
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newProfile[field];

        return supertest(app)
          .post('/api/profiles')
          .send(newProfile)
          .expect(400, {
            error: { message: 'Missing item from profile in request body' }
          });
      });
    });
  });
});
