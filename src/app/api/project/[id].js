import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;

export async function GET(request) {
    const {id} = request.query;
    try {
        const user = verifyToken(request);
        const project = await prisma.project.findFirst({
            where: {
                id: Number(id),
                userId: user.userId
            }, include:{
                tasks: true
            }
        });
        if(!project){
            return NextResponse.json({ message: 'Proyecto no encontrado'});
        }
        return NextResponse.json({project},{status:200});
    } catch (error) {
        return NextResponse.json({ message: ' No autorizado'});
    }
}
export async function PUT(request) {
    const { name } = request.body;
    try {
        const user = verifyToken(request);
        const updateProject = await prisma.project.update({
            where: {
                id: Number(request.query.id),
            },
            data: {
                name: name
            }
        });
        return NextResponse.json({message: 'Proyecto actualizado'}, {status:200});
    } catch (error) {
        return NextResponse.json({ message: 'No autorizado' });
    }
}
export async function DELETE(request) {
    try {
        const user = verifyToken(request);
        await prisma.project.delete({
            where: {
                id: Number(request.query.id),
            }
        });
        return NextResponse.json({message: 'Proyecto eliminado'}, {status:200});
    } catch (error) {
        return NextResponse.json({ message: 'No autorizado' });
    } 
}