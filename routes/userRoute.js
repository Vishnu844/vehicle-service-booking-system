const { registerUser, loginUser } = require("../controllers/user");

const router = require("express").Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;