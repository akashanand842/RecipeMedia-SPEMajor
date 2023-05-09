process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import { UserModel } from '../src/models/Users.js';
const expect = chai.expect;
const should = chai.should();
import chaiHttp from 'chai-http';
import app from '../src/index.js';

chai.use(chaiHttp);

before((done) => {
    // anything to be done before tests
    done();
});

after((done) => {
    // anything to be done after tests
    done();
});


describe('User API Tests', () => {

    it('Signin user', (done) => {
        chai.request(app)
        .post('/api/auth/register')
        .send({
            'username': "udd",
            'password': "123"
        })
        .end((err, res) => {
            res.should.have.status(200);
            if (err) console.log('Unable to login test user: ', err);
            done();
        });
    });

    it('should login user', (done) => {
        chai.request(app)
          .post('/api/auth/login')
          .send({
            username: 'sudd',
            password: '123'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            res.body.should.have.property('userID');
            done();
          });
      });
});