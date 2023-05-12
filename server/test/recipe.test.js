// process.env.NODE_ENV = 'test';

// import mongoose from 'mongoose';
// import chai from 'chai';
// import { RecipesModel } from '../src/models/Recipes.js';
// const expect = chai.expect;
// const should = chai.should();
// import chaiHttp from 'chai-http';
// import app from '../src/index.js';

// chai.use(chaiHttp);

// let validToken;
// let invalidToken;


// before((done) => {
//     // anything to be done before tests
//     chai
//     .request(app)
//     .post("/api/auth/login")
//     .send({
//       username: "sudd",
//       password: "123",
//     })
//     .end((err, res) => {
//       if (err) console.log("Error while generating token: ", err);
//       validToken = res.body.token;
//       console.log(validToken);
//       invalidToken = validToken.substring(0, validToken.length - 1) + "a";
//       done();
//     });
// });

// after((done) => {
//     // anything to be done after tests
//     done();
// });


// describe('Recipes API', () => {
//     describe('GET /', () => {
//       it('returns a list of all recipes when a valid token is provided', (done) => {
//         chai.request(app)
//           .get('/api/recipes/', {
//             headers: { authorization: validToken }
//           })
//           // .set('Authorization', `Bearer ${validToken}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.an('array');
//             done();
//           });
//       });
  
//       it('returns a 401 error when no token is provided', (done) => {
//         chai.request(app)
//           .get('/api/recipes/')
//           .end((err, res) => {
//             res.should.have.status(401);
//             done();
//           });
//       });
  
//       it('returns a 403 error when an invalid token is provided', (done) => {
//         chai.request(app)
//           .get('/api/recipes/')
//           .set('Authorization', `Bearer ${invalidToken}`)
//           .end((err, res) => {
//             res.should.have.status(403);
//             done();
//           });
//       });
//     });
//   });