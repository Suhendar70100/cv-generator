import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEducationValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    institution: schema.string({ escape: true, trim: true }),
    field: schema.string.nullableAndOptional({ escape: true, trim: true }),
    type: schema.enum([
      'High School',
      'Associate Degree',
      'Bachelor Degree',
      'Master Degree',
      'Doctoral Degree',
    ] as const),
    gpa: schema.number.nullableAndOptional([rules.range(0, 100)]),
    startDate: schema.date({ format: 'yyyy-MM-dd' }),
    endDate: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    isActive: schema.boolean.nullableAndOptional(),
    description: schema.string.nullableAndOptional({ escape: true, trim: true }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    required: '{{ field }} is required',
    number: '{{ field }} must be a number',
    range: 'valid {{ field }} range is {{ options.start }} to {{ options.stop }}',
  }
}
