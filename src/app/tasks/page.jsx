'use client'

import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const CreateTask = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const { token } = useContext(AuthContext)
    const router = useRouter()

    const handleCreateTask = async (e) => {
        e.preventDefault()
        try {
            const projectId = new URLSearchParams(window.location.search).get('projectId')
            const response = await axios.post(`/api/Task`, {
                name,
                description,
                projectId: projectId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            router.push(`/TaskList/${projectId}`)
        } catch (error) {
            setError(error.response?.data?.message || 'Error al crear la tarea')
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
                    <CardTitle className="text-2xl font-bold">Crear Tarea</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Título de la tarea"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción de la tarea"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Crear Tarea</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateTask