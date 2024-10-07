"use client";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const DeleteTask = ({ taskId}) => {
    const { token } = useContext(AuthContext);
    const [error , setError] = useState(null);

    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(`/api/tasks/${taskId}`, {
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
        return <p>No tienes autorizacion</p>
    }
    return (
        <div>
          <button onClick={handleDeleteTask}>Eliminar Tarea</button>
          {error && <p>{error}</p>}
        </div>
      );
};

export default DeleteTask;