import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Header from 'App/Models/Header'

export default class HeadersController {
  public async index({ params, view }: HttpContextContract) {
    const header = await Header.findBy('doc_id', params.docId)
    return view.render('header.index', { header, params })
  }
}
