import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../../../db/index.js"
import { AppError } from '../../utils/appError.js'
import { sendEmail } from '../../utils/sendEmail.js'
// signup
export const signUp =async (req, res,next) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    // check user existance
    if (userExist) {
        return next(new AppError('user already exists'), 409)
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8)
    // prepare user
    const user = new User({
        name,
        email,
        password: hashedPassword
    })
    // save user in database
    const createdUser = await user.save()
    // remove password from the response
    createdUser.password = undefined
    const token = jwt.sign({ email }, 'yousefBondok')
    sendEmail(email, token)
    return res.status(201).json({ message: 'user created successfully', success: true, data: createdUser })
}

// signin
export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new AppError('user not found', 401))
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
        return next(new AppError('invalid email or password', 401))
    }
    const token = jwt.sign({ email }, 'yousefBondok')
    return res.status(200).json({ message: 'user logged in successfully', success: true, token })
}