import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public docId: string

  @column()
  public institution: string

  @column()
  public field: string | null

  @column()
  public type: string

  @column()
  public gpa: string | number | null

  @column.date()
  public startDate: DateTime

  @column.date()
  public endDate: DateTime | null

  @column()
  public isActive: boolean | null

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
