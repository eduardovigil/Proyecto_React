import { PrismaClient } from "@prisma/client";
import { verifyToken  } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    const {id} = request.query;
    try {
        const user = verifyToken(request);
        const task = await prisma.task.findUnique({
            where: {
                id: id
            },
        });
        if(!task){
            return NextResponse.json({message: 'Tarea no Encontrada'},{status: 404});
        }
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({message: 'Error encontrar la tarea'},{status:500});
    }
}
export async function PUT(request) {
    const {id} = request.query;
    const { name, description } = request.body;
    try {
        const user = verifyToken(request);
        const task = await prisma.task.findUnique({
            where: {
                id: Number(id),
                },
        });
        if(!task){
            return NextResponse.json({message: 'Tarea no Encontrada'},{status: 404});
        }
        const updateTask = await prisma.task.update({
            where: {
                id: Number(id),
                },
                data: {
                    name: name,
                    description: description
                },
        });
        return NextResponse.json(updateTask);
    } catch (error) {
        return NextResponse.json({message: 'Error actualizar la tarea'},{status:500});
    }   
}

export async function DELETE(request) {
    const user = verifyToken(request);
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: Number(request.query.id)
            },
        });
        if(!task){
            return NextResponse.json({message: 'Tarea no Encontrada'},{status:404});
        }
        await prisma.task.delete({
            where: {
                id: Number(request.query.id)
            },
        });
        return NextResponse.json({message: 'Tarea eliminada con exito'});
    } catch (error) {
        return NextResponse.json({message: 'Error eliminar la tarea'},{status:500});
    }
}