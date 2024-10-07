"use client";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const Projects = () => {
    const {token} = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [ error , setError] = useState(null);
    const router = useRouter();
    const {user} = useContext(AuthContext);

    console.log(token, user);

    useEffect(()=>{
        console.log("token", token);
        if(!token){
            router.push('/login');
            return;
        }
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/project', {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setProjects(Array.isArray(response.data.projects) ? response.data.projects : []);
            } catch (error) {
                setError(error.message);
            }
        };
            fetchProjects();   
    }, [token, router]);

    const handleCreateProject = () => {
        router.push('/CreateProject');
    };
    const handleTask = () => {
        router.push('/TaskList');
    };
    return(
        <div>
      <h1>Proyectos</h1>
    {error && <p>{error}</p>}
    {!projects || projects.length === 0 ? (
      <p>Cargando proyectos...</p>
    ) : (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <div>{project.name}</div>
            <div>{project.description}</div>
            <div>{project.complete}</div>
            <div><button onClick={handleTask}> Lista de tareas</button></div>
          </li>
        ))}
      </ul>
    )}
    <button onClick={handleCreateProject}>Crear Proyecto</button>
    </div>
    );
};

export default Projects;
