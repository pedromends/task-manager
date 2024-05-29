import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase-config"
import { useNavigate } from "react-router-dom";
import TodoTable from './table/TodoTable';

interface Data {
	id: string,
	title: string;
	description: string;
	operations: string;
}

function createData(
	id: string,
	title: string,
	description: string,
    operations: string
  ): Data {
	return { id, title, description, operations };
  }

export default function ListOfTodo({ token } : { token: string }) {

	const [rows, setRows] = useState<Data[]>([])
	const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
	const navigate = useNavigate();
		
	useEffect(() => {
		if (token) {
			getDocs(collection(db, 'tasks')).then((docs:any)=>{
				docs.forEach((doc:any) => {
					const aux = doc.data()
					setRows(rows => [...rows, createData(doc.id, aux.titulo, aux.descricao, '')])
				})
			}).catch((e) => {
				console.log(e)
			}).finally(() => {
				console.log(rows)
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
			<TodoTable rows={rows}/>
		</div>
	);
}
