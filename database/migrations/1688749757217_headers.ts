import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'headers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 10).primary().unique()
      table.string('doc_id').references('documents.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('city').notNullable()
      table.integer('zip_code', 10).notNullable()
      table.string('phone').notNullable()
      table.string('email').notNullable()
      table.text('linked_in').nullable()
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
