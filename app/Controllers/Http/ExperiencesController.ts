import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExperiencesController {
  public async index({ request, view }: HttpContextContract) {
    const document = request.document
    const experiences = await document.related('experiences').query().select('*')
    return view.render('experiences/index', { document, experiences })
  }
}
