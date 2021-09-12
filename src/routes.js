import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import PostController from './app/controllers/PostController'
import authMiddleware from './app/middlewares/authentication'

const routes = express.Router()

routes.post('/users', UserController.store)
routes.post('/auth', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.post('/posts', PostController.store)
routes.get('/posts', PostController.index) // get all posts
routes.get('/posts/:userId', PostController.indexAll) // get all posts of an user

export default routes
