import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

export default class DocumentsController {
  public async index({ auth, view }: HttpContextContract) {
    await auth.use('web').authenticate()
    const documents = await Document.query().where('userId', auth.user!.id)
    return view.render('documents/index', { documents })
  }
}
