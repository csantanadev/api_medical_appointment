import { createClient } from "redis";

export type RedisTypeClient = ReturnType<typeof createClient>;

export class CreateConnectionRedis {
  protected client: RedisTypeClient;

  constructor() {
    this.client = this.createClient();
  }

  async setValue(key: string, value: string) {
    await this.client.set(key, value);
  }

  async getValue(key: string) {
    await this.client.get(key);
  }

  private createClient() {
    try {
      const client = createClient();
      client.connect();
      return client;
    } catch (error) {
      throw new Error("redis client error " + error);
    }
  }
}
