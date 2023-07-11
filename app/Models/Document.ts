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
import Experience from './Experience'
import Education from './Education'
import Project from './Project'
import Skill from './Skill'
import Certification from './Certification'
import Award from './Award'

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
    foreignKey: 'docId',
    serializeAs: 'header',
  })
  public header: HasOne<typeof Header>

  @hasMany(() => Experience, {
    foreignKey: 'docId',
    serializeAs: 'experiences',
  })
  public experiences: HasMany<typeof Experience>

  @hasMany(() => Education, {
    foreignKey: 'docId',
    serializeAs: 'educations',
  })
  public educations: HasMany<typeof Education>

  @hasMany(() => Project, {
    foreignKey: 'docId',
    serializeAs: 'projects',
  })
  public projects: HasMany<typeof Project>

  @hasMany(() => Skill, {
    foreignKey: 'docId',
    serializeAs: 'skills',
  })
  public skills: HasMany<typeof Skill>

  @hasMany(() => Certification, {
    foreignKey: 'docId',
    serializeAs: 'certifications',
  })
  public certifications: HasMany<typeof Certification>

  @hasMany(() => Award, {
    foreignKey: 'docId',
    serializeAs: 'awards',
  })
  public awards: HasMany<typeof Award>
}
