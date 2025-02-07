const { Router } = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task-controller.js");
const { auth } = require("../middlewares/auth-middleware.js");

const router = Router();

router.get("/tasks/:userId",auth, getTasks);
router.post("/tasks", auth, createTask);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;    
//router.post("/getTasks", auth, getTasks)
//router.post("/create", auth, createTask);
// router.post("/getTask")
