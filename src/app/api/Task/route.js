import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    const user = verifyToken(request);
    try {
        const tasks = await prisma.task.findMany({
            where:{
                projectId: Number(request.query.projectId)
            }
        });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({message: ' Error de Servidor'});
    }
}
export async function POST(request) {
    const { name, description, projectId} = request.body;

    try {
        const user =verifyToken(request);
        const task = await prisma.task.create({
            data: {
                name,
                description,
                projectId: Number(projectId),
            },
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({message: ' Error de Servidor'});
    }
}
