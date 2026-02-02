import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public type: 'IN' | 'OUT'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
