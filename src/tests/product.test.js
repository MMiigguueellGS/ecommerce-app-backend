const request = require("supertest");
const app = require("../app");
require('../models')
let id
let token

beforeAll(async()=>{
  const user = {
    email:'test@gmail.com',
    password: 'test1234'}
    const res = await request(app).post("/users/login").send(user);
    token=res.body.token
})
//FIND ALL
test("GET / products", async () => {
  const res = await request(app)
    .get("/products")
    // .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("GET / products", async () => {
  const product = {
    title: "test",
    description: "test description",
    brand: "test brand",
    price: "15.99",
     categoryId: 1
  }
const res = await request(app).post('/products').send(product).set("Authorization", `Bearer ${token}`)
id = res.body.id;
expect(res.status).toBe(201)
expect(res.body.title).toBe(product.title)
expect(res.body.id).toBeDefined();

});

test('UPDATE/products/:id',async()=>{
  const product = {
    title: "test title updated",
  }
  const res = await request(app).put(`/products/${id}`).send(product).set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.title).toBe(product.title)

})
test("DELETE/products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
