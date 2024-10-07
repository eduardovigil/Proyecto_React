"use client";
import { useEffect, useState, useContext } from "react/cjs/react.production.min";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CreateTask = ({ projectId }) => {
    const [name, setName ] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const {authToken} = useContext(AuthContext);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/projects/${projectId}/tasks`,{
                name,
                description
                },
                {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        }
    };
    if(!authToken){
        return <Redirect to="/login"/>
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