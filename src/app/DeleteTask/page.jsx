'use client'

import { useContext } from "react"
import axios from "axios"
import { AuthContext } from "../AuthContext"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const DeleteTaskDialog = ({ taskId, isOpen, onClose, onDelete }) => {
    const { token } = useContext(AuthContext)

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`/api/Task/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            onDelete()
            onClose()
        } catch (error) {
            console.error("Error al eliminar la tarea:", error)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta tarea?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea y todos los datos asociados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteTask}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTaskDialog