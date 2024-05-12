import React, { useState, useEffect } from "react";

export const TodoList = () => {

    const host = 'https://playground.4geeks.com/todo'
    const usuario = 'tareasBilbo'
    const [nuevoUsuario, setNuevoUsuario] = useState('')
    const [listadoTareas, setListadoTareas] = useState([])
    const [nuevaTarea, setNuevaTarea] = useState('')
    const [editandoTarea, setEditandoTarea] = useState(null)

    async function crearUsuario() {
        const uri = `${host}/users/${usuario}`
        const options = {
            method: 'POST'
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            if (response.status == 400) {
                console.log('El usuario ya existe');
            } else {
                console.log('Error ', response.status, response.statusText);
                return;
            }
        }
        const data = await response.json()
        setNuevoUsuario(usuario);
        traerTareas();
    }

    async function traerTareas() {
        const uri = `${host}/users/${usuario}`
        const options = {
            method: 'GET'
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error ', response.status, response.statusText);
            return;
        }
        const data = await response.json()
        setListadoTareas(data.todos)
    }

    async function crearTarea() {

        if (!nuevaTarea.trim()) {
            return;
        }

        const dataToSend = {
            label: nuevaTarea,
            is_done: false
        }
        const uri = `${host}/todos/${usuario}`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error ', response.status, response.statusText);
            return;
        }
        const data = await response.json()
        setNuevaTarea('')
        traerTareas()
    }
    
    async function editarTarea() {

        if (!nuevaTarea.trim()) {
            return;
        }

        const uri = `${host}/todos/${editandoTarea.id}`

        const editarTarea = {...editandoTarea, label:nuevaTarea};

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editarTarea)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error ', response.status, response.statusText);
            return;
        }
        const data = await response.json()

        setNuevaTarea("");
        setEditandoTarea(null);
        traerTareas()
    }

    // Función para actualizar tarea
    async function actualizarTarea(item) {
        setEditandoTarea(item);
        setNuevaTarea(item.label)
    };

    async function eliminarTarea(item) {

        const uri = `${host}/todos/${item.id}`
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error ', response.status, response.statusText);
            return;
        }
        traerTareas();
    }

    const handleNuevaTarea = (event) => {
        event.preventDefault();

        if (editandoTarea) {
            editarTarea();
        } else {
            crearTarea();
        }
    }

    useEffect(() => {
        crearUsuario();
    }, [])


    return (
        <>
            <div className="container text-center">
                <h1 className="text-warning text-center border border-danger border-5 mt-3 p-3 d-inline-flex rounded-circle">Tareas pendientes</h1>
                <h2 className="text-success text-center border border-success border-2 mt-5 col-3 rounded">Nueva Tarea</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                        <input
                            type="text" className="form-control" id="exampleInput"
                            placeholder="¿Qué tienes pendiente...?"
                            value={nuevaTarea}
                            onChange={(event) => setNuevaTarea(event.target.value)}
                        />
                    </div>
                    
                    <button class="btn btn-primary btn-lg mb-5" onClick={handleNuevaTarea}>
                        {editandoTarea ? "Actualizar tarea" : "Crear tarea"}
                    </button>
                </form>
                
                <h2 className="col-1">Tareas</h2>

                {!listadoTareas ? 'Aún no llegaron las tareas de la Api'
                    :
                    <ul className="list-group">
                        {listadoTareas.map((item) =>
                            <li className="list-group-item text-start" key={item.id} >
                                {item.label}
                                <span className="float-end" onClick={() => eliminarTarea(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prueba bi bi-trash text-danger" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </span>
                                <span className="float-end me-3 rounded-circle" onClick={() => actualizarTarea(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </span>
                            </li>
                        )}
                        <li className="list-group-item text-end text-muted bg-light">{listadoTareas.length} tareas, a por ellas!!</li>
                    </ul>
                }
            </div>
        </>
    )
}
