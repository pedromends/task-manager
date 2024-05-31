import { useLocation } from "react-router-dom";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import '../components/style.css'
import { Button, TextField } from "@mui/material";

function EditTodo() {

    const { state } = useLocation();
    const [ title, setTitle ] = useState(state.title);
    const [ desc, setDesc ] = useState(state.desc);
    const navigate = useNavigate();
    const id = state.id

    const updateTodo = (e: any) => {

        e.preventDefault();
        setDoc(doc(db, 'tasks', id), {
            titulo:  title,
            descricao: desc,
            timeStamp: serverTimestamp()
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            navigate("/");
            window.location.reload()
        })
    }


    return (
        <main>
            <div className="bar">
                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '1rem'}}>
                    <img src="./assets/hourglass.svg" style={{width: '3rem'}} alt="" />
                    The Hourglass
                </div>
            </div>
            <div className="edit-page">
                <form onSubmit={updateTodo} className='edit-task'>
                    <div style={{backgroundColor: 'transparent', display: 'flex', alignItems:'center', color: 'white', gap: '1rem'}} onClick={()=>window.history.back()}>
                        <img src="./assets/left-arrow.svg" alt="" style={{height: '30px'}}/>
                        <p>Retornar</p>
                    </div>
                    <h1 style={{color: 'white', textAlign:'start', textDecoration: 'underline', textDecorationColor: 'rgba(168,204,204,1)', textDecorationThickness: '3px'}}>Editar Tarefa</h1>
                    <div className="email-1">
                        <label style={{color: 'white', fontWeight: 'bold'}}>Título</label>
                        <TextField id="outlined-basic" variant="outlined" color='primary' sx={{backgroundColor: 'white', borderRadius: '1rem'}}
                                required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="password-1">
                        <label style={{color: 'white', fontWeight: 'bold'}}>Descrição</label>
                        <TextField id="outlined-basic" variant="outlined" color='error' sx={{backgroundColor: 'white', borderRadius: '1rem'}}
                            value={desc} required onChange={(e) => setDesc(e.target.value)}/>
                    </div>

                    <div className="submit-task">
                        <Button type="submit" variant="contained" sx={{backgroundColor:'rgba(168,204,204,1)', color: '#006666', ":hover":{backgroundColor:' rgba(240,247,247,1)', color: '#006666'}}}>Salvar alterações</Button>
                    </div>
                </form>
            </div>
        </main>
        
    )
}

export default EditTodo;