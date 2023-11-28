const Users = require ('../../api/v1/users/model')
const Organizers = require ('../../api/v1/organizers/model')
const { BadRequestError } = require ('../../erros')

const createOrganizers = async ( req ) => {
    const { organizer, role, email, password, confirmPassword, name } = req.body

    if (password !== confirmPassword) {
        throw new BadRequestError("Password tidak sama")
    }

    const result = await Organizers.create({ organizer })

    const users = await Users.create({ 
        email,
        name,
        password,
        organizer: result._id,
        role
     })

    delete users._doc.password

    return users
}

module.exports = { createOrganizers }