import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
        if(!localStorage.getItem("access_token") || 
            !localStorage.getItem("refresh_token")) {
            navigate("/login");
        }
        try {
            const response = await API.get("tasks/");
            setTasks(response.data);
        } catch (err) {
            setError("Error al cargar las tareas");
        }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container">
        <div className="card ">
            <div className="card-header">Listado de tareas</div>
            <div className="card-body p-0">
                {error && <p className="text-danger">{error}</p>}
                <table className="table table-striped w-100 m-0">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Completada</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id}>
                        <td>{index + 1} </td>
                        <td><a href={"?id=" + task.id}>{task.title}</a> </td>
                        <td>{(task.completed ? 'Si' : 'No')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default TaskList;
