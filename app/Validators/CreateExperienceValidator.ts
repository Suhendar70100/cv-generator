import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateExperienceValidator {
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
    title: schema.string({ escape: true, trim: true }),
    company: schema.string({ escape: true, trim: true }),
    type: schema.enum([
      'Full Time',
      'Part Time',
      'Freelance',
      'Contract',
      'Internship',
      'Volunteer',
    ] as const),
    startDate: schema.date({ format: 'yyyy-MM-dd' }),
    endDate: schema.date.nullable({ format: 'yyyy-MM-dd' }),
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
  }
}
