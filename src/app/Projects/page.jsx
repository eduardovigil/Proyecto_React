'use client'

import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../AuthContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, ListTodo } from "lucide-react"

export default function Projects() {
  const { token, user } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/project', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProjects(Array.isArray(response.data.projects) ? response.data.projects : [])
      } catch (error) {
        setError(error.response?.data?.message || 'Error al cargar los proyectos')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [token, router])

  const handleCreateProject = () => {
    router.push('/CreateProject')
  }

  const handleTask = (projectId) => {
    router.push(`/TaskList/${projectId}`)
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
      <h1 className="text-3xl font-bold mb-6 text-primary">Proyectos</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!projects || projects.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay proyectos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-primary">{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Estado: {project.complete ? 'Completado' : 'En progreso'}
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleTask(project.id)} variant="outline" className="w-full">
                  <ListTodo className="mr-2 h-4 w-4" />
                  Lista de tareas
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <Button onClick={handleCreateProject} className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Crear Proyecto
        </Button>
      </div>
    </div>
  )
}