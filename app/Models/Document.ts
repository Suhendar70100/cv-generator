import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Header from './Header'
import Experience from './Header'
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
    serializeAs: 'user',
  })
  public user: BelongsTo<typeof User>

  @hasOne(() => Header, {
    serializeAs: 'header',
  })
  public header: HasOne<typeof Header>

  @hasMany(() => Experience, {
    serializeAs: 'experiences',
  })
  public experiences: HasMany<typeof Experience>
}
