import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    document: object | any
  }
}

export default class DocId {
  public async handle({ auth, params, request }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    const { docId } = params
    const document = await Document.query()
      .where('id', docId)
      .where('userId', auth.user!.id)
      .firstOrFail()
    request.document = document
    await next()
  }
}
