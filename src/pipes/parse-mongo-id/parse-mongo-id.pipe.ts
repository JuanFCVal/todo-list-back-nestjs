import { Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'
import { BadRequestException } from '@nestjs/common/exceptions'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    return new Promise((resolve, reject) => {
      if (isValidObjectId(value)) {
        resolve(value)
      } else {
        reject(new BadRequestException(`${value} is not a valid Mongo ID `))
      }
    })
  }
}
