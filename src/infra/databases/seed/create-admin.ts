import { PasswordBcrypt } from "./../../shared/crypto/password.bcrypt.impl";
import { prismaClient } from "../prisma.config";

async function main() {
  const password = await new PasswordBcrypt().hash("admin");

  await prismaClient.user.create({
    data: {
      name: "admin",
      password,
      isAdmin: true,
      username: "admin",
    },
  });
}

main();
