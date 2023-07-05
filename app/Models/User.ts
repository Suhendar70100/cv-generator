import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string | null

  @column()
  public avatarUrl: string | null

  @column()
  public isVerified: boolean

  @column()
  public provider: string

  @column()
  public accessToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Document, {
    serializeAs: 'documents'
  })
  public documents: HasMany<typeof Document>
}
