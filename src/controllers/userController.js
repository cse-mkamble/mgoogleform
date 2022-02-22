const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const userController = {

    loginGet: async (req, res) => {

    },

    login: async (req, res) => {
        try {
            var result = await UserModel.findOne({ email: req.body.email }).lean()
            if (!result) {
                var gData = {
                    name: req.body.name,
                    email: req.body.email,
                    image: req.body.image
                }
                var newUser = new UserModel(gData)
                newUser.save().then((docs) => {
                    var user = {
                        id: docs._id,
                        name: docs.name,
                        email: docs.email,
                        image: docs.image
                    }

                    const access_token = createAccessToken({ id: result._id })
                    const refresh_token = createRefreshToken({ id: result._id })

                    res.cookie('refreshtoken', refresh_token, {
                        httpOnly: true,
                        path: '/api/refresh_token',
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
                    })
                    res.json({
                        access_token,
                        user: {
                            ...user
                        }
                    })

                })
            } else {
                var user = {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    image: result.image
                }

                const access_token = createAccessToken({ id: result._id })
                const refresh_token = createRefreshToken({ id: result._id })

                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/api/refresh_token',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
                })
                res.json({
                    access_token,
                    user: {
                        ...user
                    }
                })

            }

        } catch (error) {
            res.send(error)
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Please login now." })

                const user = await UserModel.findById(result.id)

                if (!user) return res.status(400).json({ msg: "This does not exist." })

                const access_token = createAccessToken({ id: result.id })

                res.json({
                    access_token,
                    user
                })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userController;