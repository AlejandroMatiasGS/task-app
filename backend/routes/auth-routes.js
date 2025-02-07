const { Router } = require("express");
const { login, register, verifyToken, logout} = require("../controllers/auth-controller");

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyToken);
router.get('/logout', logout);

module.exports = router;