const bcrypt = require("bcrypt");
const { createAccessToken } = require("../libs/jwt");
const User = require("../models").User;
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const register = async (req, res) => {
    try {
        const {email, name, password } = req.body;

        const userFound = await User.findOne({ where: { email: email} });

        if (userFound) return res.status(400).json({ success: false, message: "El email ya está en uso." })

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved.id,
            username: userSaved.username
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ 
            id: userSaved.id,
            name: userSaved.name,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ where: { email: email} });

        if (!userFound) return res.status(400).json({ success: false, message: "Usuario no encontrado." });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ success: false, message: "Contraseña incorrecta." });

        const token = await createAccessToken({
            id: userFound.id,
            name: userFound.name
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ 
            id: userFound.id,
            name: userFound.name,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.sendStatus(200);
    });
}

const logout = async (req, res) => {
    res.clearCookie('token')
    return res.sendStatus(200);
}

module.exports = {
    register,
    login,
    verifyToken,
    logout
}