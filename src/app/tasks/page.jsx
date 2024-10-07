"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useRouter } from "next/navigation";

const CreateTask = ({ projectId }) => {
    const [name, setName ] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const {token} = useContext(AuthContext);
    const router = useRouter();

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/tasks`,{
                name,
                description,
                projectId: projectId,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        }
    };
    if(!token){
      router.push('/login');
        return ;
    }
    return(
        <div>
        <h1>Crear Tarea</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Título de la tarea"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripcion de la tarea"
          />
          <button type="submit">Crear Tarea</button>
        </form>

      </div>
    );
};

export default CreateTask;