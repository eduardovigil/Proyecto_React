"use client";
import { useState, useContext } from "react/cjs/react.production.min";
import { AuthContext } from "../AuthContext";
import axios from 'axios';

const CreateProject = () => {
    const [name, setName ] = useState('');
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(null);
    const [error, setError] = useState(null);
    const { authToken } = useContext(AuthContext);

    const handleCreateProject  = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/project',
                {
                    name,
                    description,
                    complete
                },
                {headers:
                    {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
            const data = await response.json();
            if(response.ok){
                console.log(data);
            }else{
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    if(!authToken){
        return <p>No estas Autenticado</p>
    }
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
          <button type="submit">Crear Proyecto</button>
        </form>
      </div>
    );
  };
  
  export default CreateProject;