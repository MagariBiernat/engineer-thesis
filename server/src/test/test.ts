import chai from "chai"
import chaiHttp from "chai-http"
import server from "../server"

chai.should()

chai.use(chaiHttp)

describe("Register API", () => {
  describe("Register Wrong Data - Missing Fields", () => {
    const missingFieldsInRegisterBody = {
      fullName: "",
      email: "newEma2il1232323@gmail.com",
      password: "qwerty123",
    }

    it("Should return 406", (done) => {
      chai
        .request(server)
        .post("/auth/signup")
        .set("content-type", "application/json")
        .send(missingFieldsInRegisterBody)
        .end((err, response) => {
          response.should.have.status(406)
          done()
        })
    })
  })

  describe("Success while creating new account", () => {
    const registerBody = {
      fullName: "Jane Doe",
      email: "newEmail1ss232323@gmail.com",
      gender: "male",
      password: "qwerty123",
      password2: "qwerty123",
    }

    it("Should return 200", (done) => {
      chai
        .request(server)
        .post("/auth/signup")
        .set("content-type", "application/json")
        .send(registerBody)
        .end((err, response) => {
          response.should.have.status(200)
          done()
        })
    })
  })
})
