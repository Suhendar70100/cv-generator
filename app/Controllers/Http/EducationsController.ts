import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EducationsController {
  public async index({ request, view }: HttpContextContract) {
    const document = request.document
    const educations = await document.related('educations').query().select('*')
    return view.render('educations/index', { document, educations })
  }

  public async create({ request, view }: HttpContextContract) {
    const document = request.document
    return view.render('educations/create', { document })
  }
}
