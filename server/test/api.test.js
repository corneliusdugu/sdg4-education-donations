const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const connectDB = require("../config/db");

// Give Atlas enough time (network + initial connection)
jest.setTimeout(30000);

describe("SDG4 API tests", () => {
  const random = Math.floor(Math.random() * 1000000);
  const testUser = {
    name: "Test Runner",
    email: `testrunner${random}@example.com`,
    password: "password123",
  };

  let token = "";

  beforeAll(async () => {
    // Ensures DB connection exists for auth + donation routes during tests
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Register returns token + user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user).toBeTruthy();
    expect(res.body.user.email).toBe(testUser.email.toLowerCase());

    token = res.body.token;
  });

  test("Login returns token + user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user).toBeTruthy();
  });

  test("Create donation requires auth", async () => {
    const res = await request(app).post("/api/donations").send({
      amount: 10,
      message: "Should fail without token",
    });

    expect(res.statusCode).toBe(401);
  });

  test("Create donation works with token", async () => {
    const res = await request(app)
      .post("/api/donations")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 25, message: "Automated test donation" });

    expect(res.statusCode).toBe(201);
    expect(res.body.donation).toBeTruthy();
    expect(res.body.donation.amount).toBe(25);
    expect(res.body.donation.purpose).toBe("SDG4_QUALITY_EDUCATION");
  });

  test("List my donations works with token", async () => {
    const res = await request(app)
      .get("/api/donations/mine")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.donations)).toBe(true);
    expect(res.body.donations.length).toBeGreaterThan(0);
  });
});
