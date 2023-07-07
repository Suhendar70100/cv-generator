import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Header from 'App/Models/Header'
import UpdateHeaderValidator from 'App/Validators/UpdateHeaderValidator'
import ShortUniqueId from 'short-unique-id'

export default class HeadersController {
  public async index({ params, view }: HttpContextContract) {
    const header = await Header.findBy('doc_id', params.docId)
    return view.render('header.index', { header, params })
  }

  public async update({ request, response }: HttpContextContract) {
    const uid = new ShortUniqueId({ length: 10 })()
    const body = await request.validate(UpdateHeaderValidator)
    body.id = body.id || uid
    const header = await Header.updateOrCreate({ docId: body.docId }, { ...body })
    header ? response.redirect().toRoute('header', [body.docId]) : response.redirect().back()
  }
}
