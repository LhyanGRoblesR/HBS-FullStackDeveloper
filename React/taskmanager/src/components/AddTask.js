import React, { useState, useEffect, use } from "react";
import API from "../api";
import { useLocation } from 'react-router-dom';

const AddTask = ({ onTaskAdded }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    
    const [message, setMessage] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
          handleGetTask();
        }
      }, [id]);

      useEffect(() => {
        const storedMessage = sessionStorage.getItem('message');
        if (storedMessage) {
          setMessage(storedMessage);
        }
        return () => {
            sessionStorage.removeItem('message')
        };
      }, []);

    const handleGetTask = async () => {
        try {
            const task = await API.get("tasks/" + id + "/", { });
            console.log(task.data);
            setTaskName(task.data.title);
            setTaskCompleted(task.data.completed);
            setError(null);
        } catch (err) {
            setError("Error al cargar la tarea");
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) {
            setError("El nombre de la tarea no puede estar vacío");
            return;
        }
        try {
            const response = await API.post("tasks/", { title: taskName, completed: taskCompleted });
            setTaskName("");
            setError(null);
            console.log(response);
            sessionStorage.setItem('message', (response.data.id ? 'Tarea agregada con exito' : 'Ocurrio un problema'));
            onTaskAdded();
        } catch (err) {
            setError("Error al agregar la tarea");
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) {
            setError("El nombre de la tarea no puede estar vacío");
            return;
        }
        try {
            const response = await API.put("tasks/" + id + "/", { title: taskName, completed: taskCompleted });
            setTaskName("");
            setError(null);
            sessionStorage.setItem('message', (response.data.id ? 'Tarea actualizada con exito' : 'Ocurrio un problema'));
            window.location.href = '/';
        } catch (err) {
            setError("Error al actualizar la tarea");
        }
    };

    const handleDeleteTask = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) {
            setError("El id de la tarea no puede estar vacío");
            return;
        }
        try {
            const response = await API.delete("tasks/" + id + "/", { });
            setTaskName("");
            setError(null);
            sessionStorage.setItem('message', (response.status = 204 ? 'Tarea eliminada con exito' : 'Ocurrio un problema'));
            window.location.href = '/';
        } catch (err) {
            setError("Error al actualizar la tarea");
        }
    };

    const handleClearTasks = async (e) => {
        e.preventDefault();
        try {
            const response = await API.delete("clear/tasks/", { });
            setTaskName("");
            setError(null);
            sessionStorage.setItem('message', (response.status = 204 ? 'Tareas eliminadas con exito' : 'Ocurrio un problema'));
            window.location.href = '/';
        } catch (err) {
            setError("Error al limpiar las tareas");
        }
    };

    const handleChangeComplete = async () => {
        setTaskCompleted(!taskCompleted);
    };

    return (
        <div className="container mt-4 mb-3">
            
            {
            message ? 
            <div className="alert alert-primary" role="alert">
                {message}
            </div>
            : ''  
            }
              
            <div className="card ">
                <div className="card-header">{id ? 'Actualizar' : 'Agregar'} tarea</div>
                <div className="card-body">
                    <form onSubmit={id ? handleUpdateTask : handleAddTask}>
                        <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Escribe el nombre de la tarea"
                        />
                        </div> 
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={taskCompleted}
                                onChange={handleChangeComplete} 
                                id="completedCheckbox"
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Tarea completada
                            </label>
                        </div>
                        <div className="d-flex justify-content-between">
                           
                            {id ? 
                                 <div>
                                    <button type="submit" className="btn btn-dark">Actualizar</button> 
                                    <button type="button" className="btn btn-outline-dark ms-2" onClick={handleDeleteTask}>Borrar</button> 
                                </div>
                            : 
                                <button type="submit" className="btn btn-dark">Agregar</button>}
                            
                            <button type="button" className="btn btn-outline-dark" onClick={handleClearTasks}>Limpiar lista</button>
                        </div>
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
