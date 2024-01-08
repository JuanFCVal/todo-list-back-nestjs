import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import * as Fixtures from 'node-mongodb-fixtures'

export class MongooseHelper {
  public static createServer = async (): Promise<MongoMemoryServer> =>
    await MongoMemoryServer.create()

  public static setup = async (
    mongoServer: MongoMemoryServer,
  ): Promise<string> => {
    const uri = mongoServer.getUri()
    const fixtures = new Fixtures({
      dir: `${__dirname}/fixtures/`,
      filter: '.*',
      mute: true,
    })
    await fixtures
      .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => fixtures.unload())
      .then(() => fixtures.load())
      .catch()
      .finally(() => fixtures.disconnect())
    await mongoose.connect(uri)
    return uri
  }

  public static disconnect = async (mongoServer: MongoMemoryServer) => {
    await mongoose.disconnect()
    return mongoServer.stop()
  }
}
