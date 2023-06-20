const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {
    const {login, password} = req.body

    try {
        const user = await User.login(login, password)

        //create a token
        console.log(user)
        console.log(createToken(user._id))
        const token = createToken(user._id)

        res.status(200).json({login, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

//signup user
const signupUser = async (req, res) => {
    const {login, password} = req.body
    try {
        const user = await User.signup(login, password)

        //create a token
        const token = createToken(user._id)
        
        res.status(200).json({login, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {loginUser, signupUser}
