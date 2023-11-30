const request = require("supertest");
const app = require("../app");

let id;
let token;

//CREATE
test("POST/ users", async () => {
  const body = {
    firstName: "jose ",
    lastName: "guevara",
    email: "jose@gmail.com",
    password: "123456",
    phone: "9848769",
  };
  const res = await request(app).post("/users").send(body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
  expect(res.body.id).toBeDefined();
});

//LOGIN
test("POST/users/login ", async () => {
  const body = { email: "jose@gmail.com", password: "123456" };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
  expect(res.status).toBe(201);
  expect(res.body.token).toBeDefined();
});
//FIND ALL
test("GET / users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

//UPDATE
test("PUT/users/:id", async () => {
  const body = { firstName: "miguel actualizado" };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});
//TOKEN
test("POST/ users CREDENCIALES INCORRECTAS", async () => {
  const body = {
    email: "jose@gmail.com",
    password: "123455",
  };
  const res = await request(app).post("/users/login").send(body);
  expect(res.status).toBe(401);
});

//DELETE
test("DELETE/users/:id", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
