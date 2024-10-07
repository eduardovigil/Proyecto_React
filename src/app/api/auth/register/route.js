import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, username, rol } = body;
        if (!email || !password || !username || !rol){
            return NextResponse.json({
                message: "Falta un elemento requerido",
            },{
                status: 400
            });
        }
        const userFind = await prisma.user.findUnique({
            where: {
                email: email,
                username: username
            }
        });
        if (userFind) {
            return NextResponse.json({
                message: "El usuario ya existe",
                },{
                    status: 400
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                rol: rol
            }
        });
        const{password: _, ...user} = newuser;
        return NextResponse.json(newuser);
    } catch (error) {
        return NextResponse({
            message: 'Error en la creacion de usuario'
        },{
            status: 500
        });
    }
}
