'use strict';
const path = require('path');
const express = require('express');
const xss = require('xss');
const FavoritesService = require('./favorites-service');
const { requireAuth } = require('../middleware/jwt-auth');

const favoritesRouter = express.Router();
const jsonParser = express.json();

const serializeProfile = (profile) => ({
  id: profile.id,
  profile_name: xss(profile.profile_name),
  platform: profile.platform,
  game: profile.game,
  region: profile.region,
  playstyle: profile.playstyle,
});

favoritesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance  = req.app.get('db');
    FavoritesService.getAllFavorites(knexInstance)
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

    FavoritesService.insertProfile(
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

favoritesRouter
  .route('/:user_name')
  .post((req, res, next) => {
    const { current_user } = req.body;
    const newFavorite = { current_user };
  })

favoritesRouter
  .route('/:profile_id')
  .all((req, res, next) => {
    const { profile_id } = req.params;
    FavoritesService.getById(
      req.app.get('db'),
      profile_id
    )
      .then(profile => {
        if (!profile) {
          return res.status(400).json({
            error: { message: 'Profile doesn\'t exist'}
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
    FavoritesService.deleteProfile(
      req.app.get('db'),
      req.params.profile_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = favoritesRouter;