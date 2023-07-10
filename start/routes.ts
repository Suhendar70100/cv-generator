/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.get('/login', 'AuthController.login').middleware('guest').as('login')
  Route.get('/auth/:provider/redirect', 'AuthController.redirect').as('login.redirect')
  Route.get('/auth/:provider/callback', 'AuthController.callback').as('login.callback')
})

Route.group(() => {
  Route.get('/logout', 'AuthController.logout').as('logout')

  // Route App (Dashboard/Document)
  Route.get('/app', 'DocumentsController.index').as('document')
  Route.get('/app/:docId', 'DocumentsController.show').as('document.show')
  Route.post('/app', 'DocumentsController.store').as('document.store')
  Route.post('/app/:docId/update', 'DocumentsController.update').as('document.update')
  Route.post('/app/:docId/destroy', 'DocumentsController.destroy').as('document.destroy')

  // Route Header
  Route.group(() => {
    Route.get('/', 'HeadersController.index').as('header')
    Route.post('/', 'HeadersController.update').as('header.update')
  })
    .prefix('/app/:docId/header')
    .middleware('validDocId')

  // Route Experience
  Route.group(() => {
    Route.get('/', 'ExperiencesController.index').as('experience')
    Route.get('/new', 'ExperiencesController.create').as('experience.create')
    Route.get('/:expId', 'ExperiencesController.show').as('experience.show')
    Route.post('/store', 'ExperiencesController.store').as('experience.store')
    Route.post('/:expId/update', 'ExperiencesController.update').as('experience.update')
    Route.post('/:expId/destroy', 'ExperiencesController.destroy').as('experience.destroy')
  })
    .prefix('/app/:docId/experiences')
    .middleware('validDocId')
}).middleware('auth')
