import User from '../models/User'
import bcrypt from 'bcrypt'
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

  async update(request, response) {
    const { name, email, oldPassword, password, bio, avatar } = request.body

    const user = await User.findOne({ _id: request.userId })

    if (!user) {
      return response.status(404).json({ error: 'User not found.' })
    }

    if (oldPassword) {
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return response
          .status(404)
          .json({ error: 'Old password does not match.' })
      }

      user.password = password
    }

    user.name = name
    user.email = email
    user.bio = bio
    user.avatar = avatar

    user.save()

    const { id, createdAt, updatedAt } = user

    return response.status(201).json({
      id,
      name,
      email,
      bio,
      avatar,
      createdAt,
      updatedAt,
    })
  }
}

export default new UserController()
