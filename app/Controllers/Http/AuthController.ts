import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth.login')
  }

  public async ghRedirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  public async ghCallback({ ally }: HttpContextContract) {
    const github = ally.use('github')

    /**
     * User has explicitly denied the login request
     */
    if (github.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (github.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (github.hasError()) {
      return github.getError()
    }

    /**
     * Finally, access the user
     */
    const user = await github.user()
  }
}
