import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Experience from 'App/Models/Experience'
import ShortUniqueId from 'short-unique-id'

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

  public async store({ request, response }: HttpContextContract) {
    const uid = new ShortUniqueId({ length: 10 })()
    const document = request.document
    await document.related('experiences').create({
      ...request.body(),
      id: uid,
    })

    return response.redirect().toRoute('experience', [document.id])
  }

  public async show({ params, request, view }: HttpContextContract) {
    const document = request.document
    const experience = await Experience.query()
      .where('id', params.expId)
      .where('docId', document.id)
      .firstOrFail()

    return view.render('experiences/edit', { document, experience })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const document = request.document
    const experience = await Experience.query()
      .where('id', params.expId)
      .where('docId', document.id)
      .firstOrFail()

    await experience
      .merge({
        ...request.body(),
        isActive: request.input('isActive') ? request.input('isActive') : 0,
      })
      .save()

    return response.redirect().toRoute('experience.show', [document.id, experience.id])
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    const document = request.document
    const experience = await Experience.query()
      .where('id', params.expId)
      .where('docId', document.id)
      .firstOrFail()

    await experience.delete()
    return response.redirect().toRoute('experience', [document.id])
  }
}
