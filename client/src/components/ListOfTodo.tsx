import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase-config"
import { useNavigate } from "react-router-dom";
import ButtonUsage from './mui/ButtonUsage';

type todos = {
	id: string,
	titulo: string,
	descricao: string
}

export default function ListOfTodo({ token } : { token: string }) {

	const [ todos, setTodos ] = useState<todos[]>([]);
	const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
	const navigate = useNavigate();
		
	useEffect(() => {
		if (token) {
			getDocs(collection(db, 'tasks')).then((docs:any)=>{
				docs.forEach((doc:any) => {
					const aux = doc.data()
					let obj:todos =  {id: doc.id, titulo: aux.titulo, descricao: aux.descricao}
					setTodos(todos => [...todos, obj])
				})
			}).catch((e) => {
				console.log(e)
			}).finally(() => {
				console.log(todos)
			})
		};
	}, [token]);

	const handleAdd = async (e:any) => {
		e.preventDefault()
		try {
			await addDoc(collection(db, 'tasks'), {
				titulo: title,
				descricao: desc,
				timeStamp: serverTimestamp()
			}).catch((err)=>{
				console.log(err)
			}).finally(() => {
				navigate("/");
				window.location.reload()
			})
		} catch(err) {
			console.log(err)
		}
	}

	function handleEdit(id:string, title:string, desc:string) {
		navigate("/edit", {state: {id:id, title:title, desc:desc}})
	}

	function handleDelete(id:any) {
		try {
			deleteDoc(doc(db, 'tasks', id)).then(() => {
				alert('deletado com sucesso')
			}).catch((err)=>{
				console.log(err)
			}).finally(() => {
				navigate("/");
				window.location.reload()
			})
		} catch {
			console.log('deu ruim');
		}
	}

	return (
		<div>
			<h1>Listagem de Afazeres</h1>
			<form onSubmit={handleAdd}>
				<div>
					<label htmlFor="">Título</label>
					<input onChange={(e) => setTitle(e.target.value)} type="text" />
				</div>
				<div>
					<label htmlFor="">Descrição</label>
					<input onChange={(e) => setDesc(e.target.value)} type="text" />
				</div>
				<button type="submit">Enviar</button>
			</form>
			{ todos.map((todo:todos, i) => {
				return(
					<div style={{display: 'flex', justifyContent: 'center', gap: '3rem'}} key={i}>
						<div style={{ display: 'flex', gap: '3rem'}}>
							<p>{todo.id}</p>
							<p>{todo.titulo}</p>
							<p>{todo.descricao}</p>
							<button onClick={(e) => handleEdit(todo.id,todo.titulo, todo.descricao)}>Editar</button>
							<ButtonUsage/>
							<button onClick={(e) => handleDelete(todo.id)}>Excluir</button>
						</div>
					</div>
				)
			})}
		</div>
	);
}
