import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'

export default class Experience extends BaseModel {
  @column({ isPrimary: true })
  public id: string | null

  @column()
  public docId: string

  @column()
  public title: string

  @column()
  public company: string

  @column()
  public type: string

  @column.date()
  public startDate: DateTime

  @column.date()
  public endDate: DateTime | null

  @column()
  public isActive: boolean

  @column()
  public description: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Document, {
    serializeAs: 'document',
  })
  public document: BelongsTo<typeof Document>
}
