import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const user = verifyToken(request);
        const projects = await prisma.project.findMany({
            where: {
                userId: user.userId,
            }, 
            include: {
                tasks: true
            },
        });
        return NextResponse.json({projects});
    } catch (error) {
        return NextResponse.json({message: 'No Autorizado'}, { status: 401 });
    }   
}

export async function POST(request) {
    try {
        const user = verifyToken(request);
        const { name, description, complete } = await request.json();
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                complete,
                userId: user.userId,
            }
        });
        return NextResponse.json(newProject);
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, { status: 500 });
    }
}