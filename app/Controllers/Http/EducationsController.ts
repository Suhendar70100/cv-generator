import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Education from 'App/Models/Education'
import CreateEducationValidator from 'App/Validators/CreateEducationValidator'
import ShortUniqueId from 'short-unique-id'

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

  public async store({ request, response }) {
    const uid = new ShortUniqueId({ length: 10 })()
    const document = request.document
    const payload = await request.validate(CreateEducationValidator)
    await document.related('educations').create({
      ...payload,
      id: uid,
    })

    return response.redirect().toRoute('education', [document.id])
  }

  public async show({ params, request, view }: HttpContextContract) {
    const document = request.document
    const education = await Education.query()
      .where('id', params.eduId)
      .where('docId', document.id)
      .firstOrFail()

    return view.render('educations/edit', { document, education })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const document = request.document
    const payload = await request.validate(CreateEducationValidator)
    const education = await Education.query()
      .where('id', params.eduId)
      .where('docId', document.id)
      .firstOrFail()

    await education
      .merge({
        ...payload,
        isActive: request.input('isActive') ? true : false,
      })
      .save()

    return response.redirect().toRoute('education.show', [document.id, education.id])
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    const document = request.document
    const education = await Education.query()
      .where('id', params.eduId)
      .where('docId', document.id)
      .firstOrFail()

    await education.delete()
    return response.redirect().toRoute('education', [document.id])
  }
}
