"use client";
import { useState, useContext } from "react/cjs/react.production.min";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const UpdateTask = ({projectId, TaskId}) => {
    const [task, setTask] = useState({name: '', description: ''});
    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/tasks/${TaskId}`,
                {name: task.name, description: task.description},
                {headers: {'Authorization': `Bearer ${token}`}
            });
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        }
    };
    if(!token){
        return <Redirect to="/login"/>
    }
    return(
        <div>
        <h1>Actualizar Tarea</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdateTask}>
          <input
            type="text"
            value={task.name}
            onChange={(e) => setTask.name(e.target.value)}
            placeholder="Nuevo título de la tarea"
          />
          <input
            type="text"
            value={task.description}
            onChange={(e) => setTask.description(e.target.value)}
            placeholder="Nuevo descripcion de la tarea"
          />
          <button type="submit">Actualizar Tarea</button>
        </form>
      </div> 
    );
}

export default UpdateTask;