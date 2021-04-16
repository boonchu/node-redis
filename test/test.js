// https://github.com/BretFisher/node-docker-good-defaults/blob/85520919f56ce82ea0086751327590b44d758b8e/test/sample.js
const app = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect

chai.use(chaiHttp);
chai.should();

// https://www.linkedin.com/pulse/how-make-tests-using-chai-mocha-sam-barros/
describe('API /', () => {
    it('it should return 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');

                done();
            });
    });
});
