import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const user = verifyToken(request);
        const task = await prisma.task.findFirst({
            where: {
                id: Number(id),
                project: {
                    userId: user.userId
                }
            },
        });
        if (!task) {
            return NextResponse.json({ message: 'Tarea no Encontrada' }, { status: 404 });
        }
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ message: 'Error al encontrar la tarea' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const user = verifyToken(request);
        const { name, description } = await request.json();
        const updateTask = await prisma.task.updateMany({
            where: {
                id: Number(id),
                project: {
                    userId: user.userId
                }
            },
            data: {
                name,
                description
            },
        });
        if (updateTask.count === 0) {
            return NextResponse.json({ message: 'Tarea no encontrada o no autorizado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Tarea actualizada con éxito' });
    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar la tarea' }, { status: 500 });
    }   
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const user = verifyToken(request);
        const deleteTask = await prisma.task.deleteMany({
            where: {
                id: Number(id),
                project: {
                    userId: user.userId
                }
            },
        });
        if (deleteTask.count === 0) {
            return NextResponse.json({ message: 'Tarea no encontrada o no autorizado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        return NextResponse.json({ message: 'Error al eliminar la tarea' }, { status: 500 });
    }
}