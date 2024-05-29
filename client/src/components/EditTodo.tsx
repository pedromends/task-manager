import { useLocation } from "react-router-dom";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";

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
        <div>
            <form onSubmit={updateTodo}>
                <div>
                    <label htmlFor="">Título</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" value={title}/>
                </div>
                <div>
                    <label htmlFor="">Descrição</label>
                    <textarea onChange={(e) => setDesc(e.target.value)} value={desc}/>
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}

export default EditTodo;