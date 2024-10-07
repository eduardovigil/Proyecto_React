"use client";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const TaskList = ({ projectId}) => {
    const [tasks, setTasks] = useState([]);
    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/Task',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                        },
                });
                setTasks(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchTasks();
    }, [projectId,token]);
    return(
        <div>
        <h2>Tareas del Proyecto</h2>
        {error && <p>{error}</p>}
        <ul>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <li key={task.id}>
                        <p>{task.name}</p>
                        <p>{task.description}</p>
                    </li>
                ))
            ) : (
                <p>No hay tareas para este proyecto</p>
            )}
        </ul>
    </div>
    );
};

export default TaskList;