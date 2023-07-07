import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateHeaderValidator {
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
    id: schema.string.nullable(),
    docId: schema.string(),
    firstName: schema.string([
      rules.alphaNum({ allow: ['space', 'dash'] }),
      rules.minLength(2),
      rules.maxLength(50),
      rules.trim(),
      rules.escape(),
    ]),
    lastName: schema.string([
      rules.alphaNum({ allow: ['space', 'dash'] }),
      rules.minLength(2),
      rules.maxLength(50),
      rules.trim(),
      rules.escape(),
    ]),
    city: schema.string([
      rules.alphaNum({ allow: ['space'] }),
      rules.minLength(3),
      rules.maxLength(50),
      rules.trim(),
      rules.escape(),
    ]),
    zipCode: schema.number([rules.trim(), rules.escape()]),
    phone: schema.string([rules.mobile({ locale: ['id-ID', 'en-US'] })]),
    email: schema.string([rules.email()]),
    linkedIn: schema.string.nullable([
      rules.url({
        allowedHosts: ['linkedin.com'],
      }),
    ]),
    description: schema.string.nullable([rules.escape(), rules.trim()]),
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
  public messages: CustomMessages = {}
}
