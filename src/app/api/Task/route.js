import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const user = verifyToken(request);
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
                project: {
                    userId: user.userId
                }
            }
        });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({ message: 'Error de Servidor' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = verifyToken(request);
        const { name, description, projectId } = await request.json();
        const project = await prisma.project.findFirst({
            where: {
                id: Number(projectId),
                userId: user.userId
            }
        });
        if (!project) {
            return NextResponse.json({ message: 'Proyecto no encontrado' }, { status: 404 });
        }
        const task = await prisma.task.create({
            data: {
                name,
                description,
                projectId: Number(projectId),
            },
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ message: 'Error de Servidor' }, { status: 500 });
    }
}
