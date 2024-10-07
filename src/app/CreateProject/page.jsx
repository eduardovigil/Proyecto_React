"use client";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from 'axios';
import { useRouter } from "next/navigation";

const CreateProject = () => {
    const [name, setName ] = useState('');
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const router = useRouter();

    console.log(user, token);

    const handleCreateProject  = async (e) => {
        e.preventDefault();
        
        if(!token){
            router.push('/login');
            return;
        }
        if(!name || !description){
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = await axios.post('/api/project',
                {
                    name,
                    description,
                    complete,
                    user: user.id
                },
                {headers:
                    {
                        'Authorization': `Bearer ${token}`
                    }
                });
            if(response.status === 200){
                console.log(response.data);
                router.push('/Projects');
            } else {
                setError('Failed to create project');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const handleProject = () => {
        router.push('/Projects');
    };
    return(
        <div>
        <h1>Crear Proyecto</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleCreateProject}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del proyecto"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripcion del proyecto"
          />
           <label>
                <input
                    type="checkbox"
                    checked={complete}  // Maneja el valor booleano
                    onChange={(e) => setComplete(e.target.checked)}
                />
                Completado
            </label>
          <button type="submit">Crear Proyecto</button>
        </form>

        <button onClick={handleProject}>Proyectos</button>
      </div>
    );
  };
  
  export default CreateProject;