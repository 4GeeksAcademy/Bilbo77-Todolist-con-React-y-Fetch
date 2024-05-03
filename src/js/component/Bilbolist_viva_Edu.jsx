import React, { useState, useEffect } from "react";
// import {Spinner} from "./Spinner";

/*
export const TodolistRF = () => {
    const [task, setTask] = useState('')
    const [list, setList] = useState(
        ['Levantarse a las 5 de la mañana y hacer 300 burpees.',
            'Rezar al Dios Brendam Eich por su locura y salud mental, de rodillas y con el portátil en lo más alto.',
            'Programar, programar y programar hasta que aparezca Matrix en la pantalla.',
            'Cinco minutos de Tinder antes de acostarse.',
            'Emborrachar a Edu el sábado.',]);

    const handleTask = (event) => {
        setTask(event.target.value)
    }

    const deleteOneTask = (item) => {
        console.log(item)
        setList(list.filter((element) => element !== item))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim() !== '') {
            setList([...list, task]);
            setTask('');
        } else
            setTask('');
    }
    return (
        <>
            <div className="container text-center">
                <h1 className="text-warning text-center border border-danger border-5 mt-3 p-3 d-inline-flex rounded-circle">Pending Tasks</h1>
                <h2 className="text-success text-center border border-success border-2 mt-5 col-3 rounded">New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Write a new task, don't forget to make it!"
                            value={task} onChange={handleTask} />
                    </div>
                </form>
                <h2 className="text-primary mt-5">~Tasks list~</h2>
                <ul className="list-group ">
                    {list.map((item, id) => <li key={id} className="list-group-item text-start  hidden-icon">{item}
                        <span className="float-end" onClick={() => deleteOneTask(item)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg></span>
                    </li>)}
                    <li className="list-group-item text-end text-muted bg-light">
                        {list.length} tasks
                    </li>
                </ul>
            </div>
        </>
    );
};
 */


export const Bilbolist_viva_Edu = () => {
    const [task, setTask] = useState([])
    const host = 'https://playground.4geeks.com/todo'
    
    const getUsers = async () => {
        const uri = host + '/users/Bilbolist_viva_Edu';
        const options = {
            method: 'GET'
        };
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error: ', response.ok, response.status, response.statusText);
            return
        }
        console.log('It works :', response.ok, response.status, response.statusText);
        const data = await response.json();
        setTask(data.task);
        console.log(task);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <ul className="list-group">
            {task.map((item) => 
            <li className="list-group-item">{item.label}</li>)}
        </ul>
    );
};

