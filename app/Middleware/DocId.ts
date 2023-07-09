import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    document: object
  }
}

export default class DocId {
  public async handle({ params, request }: HttpContextContract, next: () => Promise<void>) {
    const { docId } = params
    const document = await Document.findOrFail(docId)
    request.document = document
    await next()
  }
}
