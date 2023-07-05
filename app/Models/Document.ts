import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public coverUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    serializeAs: 'user'
  })
  public user: BelongsTo<typeof User>
}
