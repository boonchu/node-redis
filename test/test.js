// https://github.com/BretFisher/node-docker-good-defaults/blob/85520919f56ce82ea0086751327590b44d758b8e/test/sample.js
const app = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('API /', () => {
    it('it should return 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
