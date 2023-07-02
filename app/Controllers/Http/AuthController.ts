import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth.login')
  }

  public async ghRedirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  public async ghCallback({ ally, response, session }: HttpContextContract) {
    const github = ally.use('github')

    if (github.accessDenied() || github.stateMisMatch()) {
      session.flash({
        errors: {
          login: github.accessDenied() ? 'Access was denied' : 'URL expired',
        },
      })

      return response.redirect().toRoute('login')
    }

    const user = await github.user()

    return user
  }
}
