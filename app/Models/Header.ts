import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'

export default class Header extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public docId: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public city: string

  @column()
  public zipCode: number

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public linkedIn: string | null

  @column()
  public description: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Document, {
    serializeAs: 'document'
  })
  public document: BelongsTo<typeof Document>
}
