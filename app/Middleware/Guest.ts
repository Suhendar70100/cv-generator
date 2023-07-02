import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.use('web').isGuest) {
      return response.redirect('./app')
    }

    await next()
  }
}
