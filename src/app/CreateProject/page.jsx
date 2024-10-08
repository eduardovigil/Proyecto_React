'use client'

import { useState, useContext } from "react"
import { AuthContext } from "../AuthContext"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CreateProject = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(null)
    const { token } = useContext(AuthContext)
    const router = useRouter()

    const handleCreateProject = async (e) => {
        e.preventDefault()
        
        if (!token) {
            router.push('/login')
            return
        }
        if (!name || !description) {
            setError('Por favor, rellena todos los campos')
            return
        }
        try {
            const response = await axios.post('/api/project',
                { name, description, complete },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            if (response.status === 200) {
                console.log("Proyecto creado:", response.data)
                router.push('/Projects')
            } else {
                setError('Error al crear el proyecto')
            }
        } catch (error) {
            console.error("Error al crear el proyecto:", error)
            setError(error.response?.data?.message || error.message || 'Error desconocido al crear el proyecto')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Crear Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleCreateProject} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del proyecto</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción del proyecto</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="complete"
                                checked={complete}
                                onCheckedChange={setComplete}
                            />
                            <Label htmlFor="complete">Completado</Label>
                        </div>
                        <Button type="submit" className="w-full">
                            Crear Proyecto
                        </Button>
                    </form>
                    <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => router.push('/Projects')}
                    >
                        Ver Proyectos
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProject