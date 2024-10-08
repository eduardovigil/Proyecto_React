'use client'

import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([])
  const { token } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const router = useRouter()

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/Task?projectId=${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      setTasks(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Error al cargar las tareas')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token && projectId) {
      fetchTasks()
    }
  }, [projectId, token])

  const handleCreateTask = () => {
    router.push(`/tasks/create?projectId=${projectId}`)
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleUpdateTask = async (taskId) => {
    router.push(`/tasks/update/${taskId}`)
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/Task/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      showNotification("La tarea se ha eliminado correctamente.")
      fetchTasks()
    } catch (error) {
      showNotification("No se pudo eliminar la tarea.", "error")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Alert variant={notification.type === 'error' ? "destructive" : "default"} className="mb-4">
          <AlertTitle>{notification.type === 'error' ? "Error" : "Éxito"}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Tareas del Proyecto</CardTitle>
          <Button onClick={handleCreateTask}>
            <Plus className="mr-2 h-4 w-4" /> Crear Tarea
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id}>
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300 mr-2" />
                        )}
                        <div>
                          <h3 className="font-semibold">{task.name}</h3>
                          <p className="text-sm text-gray-500">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleUpdateTask(task.id)}>
                          <Pencil className="h-4 w-4 mr-1" /> Actualizar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No hay tareas para este proyecto</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskList