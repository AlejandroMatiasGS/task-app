const { Task } = require("../models");

const getTasks = async (req, res) => {
    try {
        console.log(Task)
        const tasks = await Task.findAll({ where: { userId: req.params.userId } });
        res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, content, date } = req.body;

        const newTask = new Task({
            title,
            description,
            content,
            date,
            userId: req.user.id,
        });

        await newTask.save();
        res.status(200).json({ 
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            content: newTask.content,
            date: newTask.date,
            userId: newTask.userId,
         });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const rows = await Task.destroy({ where: { id: req.params.id } });
        if (rows === 0) return res.status(404).json({ message: "Tarea no encontrada." });
        return res.status(200).json({ message: "Tarea eliminada con éxito." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const task = await Task.findByPk(req.params.id);

        if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

        await task.update({ title, description, content });
        
        return res.status(200).json({ message: "Tarea actualizada con éxito." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    getTask
}