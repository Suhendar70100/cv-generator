import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Experience from 'App/Models/Experience'

export default class ExperiencesController {
  public async index({ request, view }: HttpContextContract) {
    const document = request.document
    const experiences = await document.related('experiences').query().select('*')
    return view.render('experiences/index', { document, experiences })
  }

  public async create({ request, view }: HttpContextContract) {
    const document = request.document
    return view.render('experiences/create', { document })
  }

  public async show({ params, request, view }: HttpContextContract) {
    const document = request.document
    const experience = await Experience.query()
      .where('id', params.expId)
      .where('docId', document.id)
      .firstOrFail()

    return view.render('experiences/edit', { document, experience })
  }
}
