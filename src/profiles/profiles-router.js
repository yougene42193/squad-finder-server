'use strict';
const path = require('path');
const express = require('express');
const xss = require('xss');
const ProfilesService = require('./profiles-service');

const profilesRouter = express.Router();
const jsonParser = express.json();

const serializeProfile = (profile) => ({
  id: profile.id,
  profile_name: xss(profile.profile_name),
  platform: profile.platform,
  game: profile.game,
  region: profile.region,
  playstyle: profile.playstyle,
});

profilesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance  = req.app.get('db');
    ProfilesService.getAllProfiles(knexInstance)
      .then(profiles => {
        res.json(profiles.map(serializeProfile));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { profile_name, platform, game, region, playstyle } = req.body;
    const newProfile = { profile_name, platform, game, region, playstyle };
    if (!newProfile) {
      return res.status(400).json({
        error: { message: 'Missing item from profile in request body' }
      });
    }

    ProfilesService.insertProfile(
      req.app.get('db'),
      newProfile
    )
      .then(profile => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${profile.id}`))
          .json(serializeProfile(profile));
      })
      .catch(next);
  });

profilesRouter
  .route('/:profile_id')
  .all((req, res, next) => {
      const { profile_id } = req.params;
      ProfilesService.getById(
        req.app.get('db'),
        profile_id
      )
        .then(profile => {
            if (!profile) {
                return res.status(400).json({
                    error: { message: `Profile doesn't exist`}
                });
            }
            res.profile = profile;
            next();
        })
        .catch(next);
  })
  .get((req, res, next) => {
      res.json(serializeProfile(res.profile));
  })
  .delete((req, res, next) => {
      ProfilesService.deleteProfile(
          req.app.get('db'),
          req.params.profile_id
      )
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
      const { newProfile } = req.body;
      if(!newProfile) {
          return res.status(400).json({
              error: {
                  message: 'Request must contain profile name'
              }
          });
      }
      ProfilesService.updateProfile(
          req.app.get('db'),
          req.params.profile_id,

      )
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
  })

module.exports = profilesRouter;