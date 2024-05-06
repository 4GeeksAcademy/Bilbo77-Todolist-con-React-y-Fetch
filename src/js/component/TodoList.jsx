import React, { useState, useEffect } from "react";

export const TodoList = () => {

    const host = 'https://playground.4geeks.com/todo'
    const usuario = 'tareasBilbo'
    const [nuevoUsuario, setNuevoUsuario] = useState('')
    const [listadoTareas, setListadoTareas] = useState()
    const [nuevaTarea, setNuevaTarea] = useState('')

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

    const handleNuevaTarea = (event) => {
        event.preventDefault();
        // falta el .trim 
        crearTarea();
    }

    useEffect(() => {
        crearUsuario();
    }, [])


    return (
        <>
            <form onSubmit={handleNuevaTarea}>
                <div className="mb-3">
                    <label htmlFor="exampleInput" className="form-label">Agregar tarea</label>
                    <input type="text" className="form-control" id="exampleInput"
                        value={nuevaTarea} onChange={(event) => setNuevaTarea(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {!listadoTareas ? 'Aún no llegaron las tareas de la Api'
                :
                <ul className="list-group">
                    {listadoTareas.map((item) => <li className="list-group-item" key={item.id}>{item.label}</li>)}
                    <li className="list-group-item">{listadoTareas.length} tareas</li>
                </ul>
            }
        </>
    )
}

