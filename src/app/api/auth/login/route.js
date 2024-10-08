import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password){
        return NextResponse.json({
            error: "Email y contraseña son requeridos"
        }, {status: 400});
    }
    const userFind = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(!userFind){
        return NextResponse.json({error: "Usuario no encontrado"}, {status: 404});
    }
    const isValidPassword = await bcrypt.compare(password, userFind.password);
    if(!isValidPassword){
        return NextResponse.json({error: "Contraseña incorrecta"}, {status: 401});
    }
    const token = generateToken(userFind.id);
    
    // Excluir la contraseña del objeto de usuario
    const { password: _, ...userWithoutPassword } = userFind;
    
    return NextResponse.json({
        token: token,
        user: userWithoutPassword,
        message: 'Inicio de sesión exitoso'
    },{
        status: 200
    });
}