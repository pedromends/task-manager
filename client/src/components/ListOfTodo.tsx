import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from "../config/firebase-config"

type todos = {
	title: string,
	desc: string
}

export default function ListOfTodo({ token }:{ token: string }) {

	const [todos, setTodos] = useState<todos[]>([]);
	const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
		
	useEffect(() => {
		if (token) {
			const res = async () => {
				axios.get('http://localhost:5000/api/todos', {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}).then((response) => {
					console.log(response.data);
					setTodos(response.data.todos)
				});
			}

			res()
		};
	}, [token]);

	const handleAdd = async (e:any) => {
		e.preventDefault()
		try{
			const res = await addDoc(collection(db, 'tasks'), {
				titulo: title,
				descricao: desc,
				timeStamp: serverTimestamp()
			})
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div>
			<h1>List of todo</h1>
			<form onSubmit={handleAdd}>
				<div>
					<label htmlFor="">Título</label>
					<input onChange={(e)=>setTitle(e.target.value)} type="text" />
				</div>
				<div>
					<label htmlFor="">Descrição</label>
					<input onChange={(e)=>setDesc(e.target.value)} type="text" />
				</div>				<button type="submit">Enviar</button>
			</form>
			{todos.map((todo:todos,i) => {
				return(
					<div key={i}>
						<p>{todo.title}</p>
						<p>{todo.desc}</p>
					</div>
				)
			})}
		</div>
	);
}