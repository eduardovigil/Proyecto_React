"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthContext";

const Login = () => {
    const  router  = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            })
            const { token } = response.data;
            login(token);
            router.push('/Projects');
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
                setError(error.response.data.message || 'Error en el servidor');
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                setError('No se recibió respuesta del servidor');
            } else {
                console.error('Error al configurar la solicitud:', error.message);
                setError('Error en la configuración');
            }
        }
    };
    return(
        <div>
      <h1>Iniciar Sesión</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo de usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    );
};

export default Login;