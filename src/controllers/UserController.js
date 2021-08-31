import User from '../models/User'

class UserController {
  async store(request, response) {
    try {
      const { name, email, password, bio, avatar } = request.body

      const isUserRegistered = await User.findOne({ email })

      if (isUserRegistered) {
        return response
          .status(409)
          .json({ error: 'User is already registered' })
      }

      const user = await User.create({
        name,
        email,
        password,
        bio,
        avatar,
      })

      let userResult = user.toObject()

      delete userResult['password']

      return response.status(201).json(userResult)
    } catch (error) {
      console.log(error)
      return response.status(400)
    }
  }
}

export default new UserController()
