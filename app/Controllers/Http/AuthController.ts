import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth.login')
  }

  public async ghRedirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  public async ghCallback({ ally, auth, response, session }: HttpContextContract) {
    const github = ally.use('github')

    if (github.accessDenied() || github.stateMisMatch()) {
      session.flash({
        errors: {
          login: github.accessDenied() ? 'Access was denied' : 'URL expired',
        },
      })

      return response.redirect().toRoute('login')
    }

    const githubUser = await github.user()

    const user = await User.firstOrCreate(
      {
        email: githubUser.email,
      },
      {
        name: githubUser.name,
        avatarUrl: githubUser.avatarUrl,
        isVerified: githubUser.emailVerificationState === 'verified',
        provider: 'github',
        accessToken: githubUser.token.token,
      }
    )

    await auth.use('web').login(user)
    response.redirect('/')
  }

  public async goRedirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async goCallback({ ally, auth, response, session }: HttpContextContract) {
    const google = ally.use('google')

    if (google.accessDenied() || google.stateMisMatch()) {
      session.flash({
        errors: {
          login: google.accessDenied() ? 'Access was denied' : 'URL expired',
        },
      })

      return response.redirect().toRoute('login')
    }

    const googleUser = await google.user()

    const user = await User.firstOrCreate(
      {
        email: googleUser.email,
      },
      {
        name: googleUser.name,
        avatarUrl: googleUser.avatarUrl,
        isVerified: googleUser.emailVerificationState === 'verified',
        provider: 'google',
        accessToken: googleUser.token.token,
      }
    )

    await auth.use('web').login(user)
    response.redirect('/')
  }
}
