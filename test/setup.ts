import { randomUUID } from "crypto";
import { beforeAll, afterAll } from "vitest";
import { execSync } from "node:child_process";
import { Client } from "pg";

const schemaDatabaseTest = randomUUID();
process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${schemaDatabaseTest}`;

beforeAll(async () => {
  console.log({ schemaDatabaseTest });

  await execSync("npx prisma migrate deploy");
});

afterAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`drop schema if exists "${schemaDatabaseTest}" cascade`);
  await client.end();
});
