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
                setProjects(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
            fetchProjects();   
    }, [token, router]);
   
    return(
        <div>
      <h1>Proyectos</h1>
      {error && <p>{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
    );
};

export default Projects;
