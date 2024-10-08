'use client'

import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../../../AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const UpdateTask = ({ params }) => {
    const [task, setTask] = useState({ name: '', description: '' })
    const { token } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const router = useRouter()
    const taskId = params.id

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/Task/${taskId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setTask(response.data)
            } catch (error) {
                setError('Error al cargar la tarea')
            }
        }
        if (token && taskId) {
            fetchTask()
        }
    }, [token, taskId])

    const handleUpdateTask = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`/api/Task/${taskId}`,
                { name: task.name, description: task.description },
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            console.log(response.data)
            router.back()
        } catch (error) {
            setError(error.response?.data?.message || 'Error al actualizar la tarea')
        }
    }

    if (!token) {
        router.push('/login')
        return null
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Actualizar Tarea</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleUpdateTask} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                value={task.name}
                                onChange={(e) => setTask({ ...task, name: e.target.value })}
                                placeholder="Nuevo título de la tarea"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                placeholder="Nueva descripción de la tarea"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Actualizar Tarea</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateTask