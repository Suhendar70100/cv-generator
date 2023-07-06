import Env from '@ioc:Adonis/Core/Env'
import { createApi } from 'unsplash-js'
import { default as fetch } from 'node-fetch'

const unsplash = createApi({
  accessKey: Env.get('UNSPLASH_ACCESS_KEY'),
  fetch: fetch,
})

export default unsplash
