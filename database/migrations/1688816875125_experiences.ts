import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'experiences'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 10).primary().unique()
      table
        .string('doc_id')
        .references('documents.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('title').notNullable()
      table.string('company').notNullable()
      table
        .enum('type', [
          'Full Time',
          'Part Time',
          'Freelance',
          'Contract',
          'Internship',
          'Volunteer',
        ])
        .notNullable()
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
