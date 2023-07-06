import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShortUniqueId from 'short-unique-id'
import axios from 'axios'
import Document from 'App/Models/Document'
import CreateDocumentValidator from 'App/Validators/CreateDocumentValidator'
import UpdateDocumentValidator from 'App/Validators/UpdateDocumentValidator'

export default class DocumentsController {
  public async index({ auth, view }: HttpContextContract) {
    await auth.use('web').authenticate()
    const documents = await Document.query().where('userId', auth.user!.id)
    return view.render('documents/index', { documents })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    /**
     * Generate Cover URL using Unsplash SDK
     * ----------------------------------------------------------------
     * import unsplash from 'Config/unsplash'
     *
     * const { response: res }: any = await unsplash.photos.getRandom({})
     * const coverUrl: string = res.urls.thumb
     */

    await auth.use('web').authenticate()
    const uid = new ShortUniqueId({ length: 10 })()
    const { name } = await request.validate(CreateDocumentValidator)

    // Generate Cover URL using axios
    const { request: res } = await axios.get(
      'https://source.unsplash.com/random/400x600?panorama,architecture-interior,arts-culture',
      { responseType: 'arraybuffer' }
    )
    const resProtocol = res.protocol
    const resServer = res.host
    const resUrl = res._header.split(' ')[1]
    const coverUrl = `${resProtocol}//${resServer}${resUrl}`

    const payload = { id: uid, userId: auth.user!.id, name, coverUrl }
    const query = await Document.create(payload)

    query ? response.redirect().toRoute('document') : response.redirect().back()
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = params.docId
    const { editName } = await request.validate(UpdateDocumentValidator)
    const document = await Document.find(id)
    const query = await document?.merge({ name: editName }).save()

    query ? response.redirect().toRoute('document') : response.redirect().back()
  }
}
