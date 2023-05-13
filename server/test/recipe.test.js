process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import { RecipesModel } from '../src/models/Recipes.js';
const expect = chai.expect;
const should = chai.should();
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

let invalidToken = "asd";


before((done) => {
    // anything to be done before tests
    done();
});

after((done) => {
    // anything to be done after tests
    done();
});


describe('Recipes API', () => {
    it('returns a list of all recipes when a valid token is provided', (done) => {
        chai.request(app)
          .get('/api/recipes/testrecipe')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
          });
      });
  
      it('returns a 401 error when no token is provided', (done) => {
        chai.request(app)
          .get('/api/recipes/')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
  
      it('returns a 403 error when an invalid token is provided', (done) => {
        chai.request(app)
          .get('/api/recipes/')
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
  });