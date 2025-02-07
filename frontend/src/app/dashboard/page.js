'use client'

import Task from "@/components/task";
import { useUser } from "@/hooks/user-hook";
import { AddCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask, getTasks, updateTask, deleteTask } from "@/controllers/task-controller";

export default function DashboardPage() {
    const user = useUser()
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({
        title: "",
        description: "",
        content: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (!user?.id) return
        const _getTasks = async () => {
            const _tasks = await getTasks(user.id)
            setTasks(_tasks)
        }
        _getTasks()
    }, [user])

    const openTask = (e) => {
        setTask(tasks.find(task => task.id == e.currentTarget.id))
        const modal = document.getElementById("modal");
        modal.classList.toggle("hidden");
        modal.classList.add("flex");
        
    }

    const handleOnChange = (e) => {
        const { id, value } = e.target
        setTask((prev) => ({ ...prev, [id]: value }))
    }

    const handleEdit = async (e) => {
        if (await updateTask(task)) {
            alert("Tarea actualizada")
            setTasks(tasks.map(t => t.id === task.id ? { ...t, ...task } : t))
        } else {
            alert("Error al actualizar la tarea")
        }

        const modal = document.getElementById("modal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }

    const openCreateModal = (e) => {
        const modal = document.getElementById("createModal");
        modal.classList.toggle("hidden");
        modal.classList.add("flex");
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        const title = document.getElementById("cTittle").value
        const description = document.getElementById("cDescription").value
        const content = document.getElementById("cContent").value
        const _date = new Date()
        const annio = _date.getFullYear()
        const mes = String(_date.getMonth() + 1).padStart(2, '0')
        const dia = String(_date.getDate()).padStart(2, '0')
        const date = `${annio}-${mes}-${dia}`
        const task = { title, description, content, date }
        const createdTask = await createTask(task)



        if (createdTask) {
            setTasks([...tasks, createdTask])
            alert("Tarea creada")
            document.getElementById("cTittle").value = ""
            document.getElementById("cDescription").value = ""
            document.getElementById("cContent").value = ""
            const modal = document.getElementById("createModal");
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        } else {
            alert("Error al crear la tarea")
        }
    }

    const handleDelete = async (e) => {
        e.stopPropagation()
        const id = parseInt(e.currentTarget.closest('button').id)
        
        if (confirm("¿Estás seguro de eliminar la tarea?")) {
            if (await deleteTask(id)) {
                setTasks(tasks.filter(task => task.id !== id))  
                alert("Tarea eliminada")
            } else {
                alert("Error al eliminar la tarea")
            }
        }
    }

    const closeModal = (e) => {
        const modal = e.currentTarget
        if (e.target === modal) {
            modal.classList.add('hidden')
            modal.classList.remove('flex')
        }
    }

    return (
        <main className="flex justify-center mt-20">
            <div className="flex flex-col w-10/12">

                <p className="text-4xl text-center pt-8 text-black dark:text-white">Tareas</p>

                <div className="flex justify-start w-max">
                    <button className="flex items-center" onClick={openCreateModal}>
                        <AddCircle sx={{ fontSize: 40 }} className="text-black dark:text-white" />
                        <span className="flex items-center ps-2 text-black dark:text-white">Nueva Tarea</span>
                    </button>
                </div>

                <hr className="border border-black dark:border-white mt-4 mb-8" />

                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3 place-items-center">
                    {tasks.map((task, i) => <Task key={i} id={task.id} title={task.title} handleClick={openTask} handleDelete={handleDelete} />)}
                </div>

            </div>

            <div id="modal" onClick={closeModal} className="fixed z-50 inset-0 bg-opacity-90 items-center justify-center w-screen h-screen hidden bg-gray-900">
                <div id="createUser" className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[50%] h-[70%] flex flex-col items-center rounded-lg px-6 py-8 shadow-lg border bg-white dark:bg-gray-900 dark:border-gray-600">
                    <span className="my-2 w-full text-start text-black dark:text-white">Título</span>
                    <input id="title" type="text" className="w-full h-12 border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" value={task.title} onChange={handleOnChange} />
                    <span className="my-2 w-full text-start text-black dark:text-white">Descripción</span>
                    <input id="description" type="text" className="w-full h-12 border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" value={task.description} onChange={handleOnChange} />
                    <span className="my-2 w-full text-start text-black dark:text-white">Contenido</span>
                    <textarea id="content" className="w-full h-96 resize-none border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" value={task.content} onChange={handleOnChange} />
                    <button type="button" onClick={handleEdit}
                        className="w-full mt-4 h-12 bg-transparent font-semibold border hover:border-transparent rounded active:scale-[99%]
                                hover:bg-blue-700 text-blue-700 hover:text-white  border-blue-700 dark:text-white">
                        Guardar
                    </button>
                </div>
            </div>

            <div id="createModal" onClick={closeModal} className="fixed z-50 inset-0 bg-opacity-90 items-center justify-center w-screen h-screen hidden bg-gray-900">
                <form onSubmit={handleCreate} className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[50%] h-[70%] flex flex-col items-center rounded-lg px-6 py-8 shadow-lg border bg-white dark:bg-gray-900 dark:border-gray-600">
                    <span className="my-2 w-full text-start text-black dark:text-white">Título</span>
                    <input id="cTittle" type="text" className="w-full h-12 border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" required/>
                    <span className="my-2 w-full text-start text-black dark:text-white">Descripción</span>
                    <input id="cDescription" type="text" className="w-full h-12 border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" required/>
                    <span className="my-2 w-full text-start text-black dark:text-white">Contenido</span>
                    <textarea id="cContent" className="w-full h-96 resize-none border p-2 my-2 text-black dark:text-white bg-transparent border-black dark:border-gray-400" required/>
                    <button type="submit"
                        className="w-full mt-4 h-12 bg-transparent font-semibold border hover:border-transparent rounded active:scale-[99%]
                                hover:bg-blue-700 text-blue-700 hover:text-white  border-blue-700 dark:text-white">
                        Crear
                    </button>
                </form>
            </div>
        </main>
    );
}
