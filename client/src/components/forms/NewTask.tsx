import {  useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../../config/firebase-config"
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import './NewTask.css'

export default function ListOfTodo() {

	const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
	const navigate = useNavigate();

	const handleAdd = async (e:any) => {
		e.preventDefault()
		try {
			await addDoc(collection(db, 'tasks'), {
				titulo: title,
				descricao: desc,
				timeStamp: serverTimestamp()
			}).catch( (err) => {
				console.log(err)
			}).finally(() => {
				navigate("/");
				window.location.reload()
			})
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<main>
            <form onSubmit={handleAdd} className='new-task'>
                <h1>Criar nova tarefa</h1>
                <div className="email-1">
                    <label style={{color: 'white', fontWeight: 'bold'}}>Título</label>
                    <TextField id="outlined-basic" variant="outlined" color='primary' sx={{backgroundColor: 'white', borderRadius: '1rem'}}
                            required value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="password-1">
                    <label style={{color: 'white', fontWeight: 'bold'}}>Password</label>
                    <TextField id="outlined-basic" variant="outlined" color='error' sx={{backgroundColor: 'white', borderRadius: '1rem'}}
                        value={desc} required onChange={(e) => setDesc(e.target.value)}/>
                </div>

                <div className="submit-task">
                    <Button type="submit" variant="contained" sx={{}}>Salvar alterações</Button>
                </div>
            </form>
		</main>
	);
}
