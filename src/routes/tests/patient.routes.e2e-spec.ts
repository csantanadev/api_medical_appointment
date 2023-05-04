import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../app";

describe("Patient", () => {
  it("Should be able to create a new patient", async () => {
    const result = await request(app).post("/patient").send({
      name: "user_supertest",
      username: "user_supertest",
      password: "user_password",
      email: "user@supertest.com.br",
      document: "user_document",
    });

    expect(result.body).toHaveProperty("id");
    expect(result.statusCode).eq(201);
  });
});
