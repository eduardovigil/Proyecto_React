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
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Registrarse
          </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <span className="block sm:inline">{error}</span>
                  </div>
              )}
              <form className="space-y-6" onSubmit={handleRegister}>
                  <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Nombre de usuario
                      </label>
                      <div className="mt-1">
                          <input
                              id="username"
                              name="username"
                              type="text"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                          />
                      </div>
                  </div>

                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Correo electrónico
                      </label>
                      <div className="mt-1">
                          <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                  </div>

                  <div>
                      <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                          Rol de usuario
                      </label>
                      <div className="mt-1">
                          <select
                              id="rol"
                              name="rol"
                              required
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={rol}
                              onChange={(e) => setRol(e.target.value)}
                          >
                              <option value="">Selecciona un rol</option>
                              <option value="Administrador">Administrador</option>
                              <option value="Gerente">Gerente</option>
                              <option value="Programador">Programador</option>
                          </select>
                      </div>
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Contraseña
                      </label>
                      <div className="mt-1">
                          <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                  </div>

                  <div>
                      <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                          Registrarse
                      </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
    );
};

export default Register;