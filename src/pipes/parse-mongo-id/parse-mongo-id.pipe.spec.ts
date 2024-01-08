import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ParseMongoIdPipe } from './parse-mongo-id.pipe'

describe('ParseMongoIdPipe', () => {
  let pipe: ParseMongoIdPipe

  it('should be defined', () => {
    expect(new ParseMongoIdPipe()).toBeDefined()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseMongoIdPipe],
    }).compile()

    pipe = module.get<ParseMongoIdPipe>(ParseMongoIdPipe)
  })

  it('should throw Bad Request if input is not a valid Mongo ID', async () => {
    await expect(pipe.transform('abcd')).rejects.toThrow(BadRequestException)
  })

  it('should return id if input is a valid Mongo id', async () => {
    const result = await pipe.transform('5c2d57e4a72e8f7843101f30')
    expect(result).toBe('5c2d57e4a72e8f7843101f30')
  })
})
