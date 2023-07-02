import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth.login')
  }

  public async redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, auth, params, response, session }: HttpContextContract) {
    const provider = ally.use(params.provider)

    if (provider.accessDenied() || provider.stateMisMatch()) {
      session.flash({
        errors: {
          login: provider.accessDenied() ? 'Access was denied' : 'URL expired',
        },
      })

      return response.redirect().toRoute('login')
    }

    const providerUser = await provider.user()

    const user = await User.firstOrCreate(
      {
        email: providerUser.email,
      },
      {
        name: providerUser.name,
        avatarUrl: providerUser.avatarUrl,
        isVerified: providerUser.emailVerificationState === 'verified',
        provider: params.provider,
        accessToken: providerUser.token.token,
      }
    )

    await auth.use('web').login(user)
    response.redirect('/')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect().toRoute('login')
  }
}
