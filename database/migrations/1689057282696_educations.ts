import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'educations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 10).primary().unique()
      table
        .string('doc_id')
        .references('documents.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('institution').notNullable()
      table.string('field').nullable()
      table
        .enum('type', [
          'High School',
          'Associate Degree',
          'Bachelor Degree',
          'Master Degree',
          'Doctoral Degree',
        ])
        .notNullable()
      table.string('gpa', 5).nullable()
      table.date('start_date').notNullable()
      table.date('end_date').nullable()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.text('description').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
