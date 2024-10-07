"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const route = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register',{
                username,
                email,
                rol,
                password
            });
            console.log(response.data);
            route.push('/login');
        } catch (error) {
            console.error('Error en el servidor');
        }
    };
    return (
        <div>
        <h1>Registrarse</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo de usuario"
          />
          <input
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            placeholder="Rol de usuario"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Registrarse</button>
        </form>
      </div> 
    );
};

export default Register;