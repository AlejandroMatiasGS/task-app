import axiosIns from "@/config/axios"

export async function getTasks(id) {
    try {
        const res = await axiosIns.get(`/tasks/${id}`)
        return res.data
    } catch (e) {
        console.error(e)
        return []
    }
}

export async function updateTask(task) {
    try {
        const res = await axiosIns.put(`/tasks/${task.id}`, task)
        return true
    } catch (e) {
        console.error(e.response?.data.message)
        return false
    }
}

export async function createTask(task) {
    try {
        const res = await axiosIns.post(`/tasks`, task)
        return res.data
    } catch (e) {
        console.error(e.response?.data.message)
        return null
    }
}

export async function deleteTask(id) {
    try {
        const res = await axiosIns.delete(`/tasks/${id}`)
        return true
    } catch (e) {
        console.error(e.response?.data.message)
        return false
    }
}