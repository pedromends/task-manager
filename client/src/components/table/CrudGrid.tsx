import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../config/firebase-config"
import { useNavigate } from "react-router-dom";
import {
	GridRowModesModel, GridRowModes, DataGrid, GridColDef, GridToolbarContainer,
	GridActionsCellItem, GridEventListener, GridRowId, GridRowEditStopReasons, GridSlots
} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

interface Data {
	id: string,
	title: string;
	description: string;
}

function createData(
	id: string,
	title: string,
	description: string,
): Data {
	return { id, title, description };
}

interface EditToolbarProps {
	setRows: (newRows: (oldRows: Data) => Data) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
	) => void;
}

function EditToolbar(props: EditToolbarProps) {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const handleAdd = async (e: any) => {
		e.preventDefault()
		try {
			await addDoc(collection(db, 'tasks'), {
				titulo: title,
				descricao: desc,
				timeStamp: serverTimestamp()
			}).catch((err) => {
				console.log(err)
			}).finally(() => {
				navigate("/");
				window.location.reload()
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

export default function CrudGrid() {

	const [rows, setRows] = useState<Data[]>([]);
	const navigate = useNavigate();
	
	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEdit = (id: GridRowId) => () => {
		let aux = rows.map((row) => {
			if(row.id == id){
				return row
			}
		})
		navigate("/edit", {state: {id:aux[0]?.id,title: aux[0]?.title, desc: aux[0]?.description}})
		console.log(aux)
	}

	const handleDelete = (id: GridRowId) => () => {
		try {
			deleteDoc(doc(db, 'tasks', id.toString())).then(() => {
				alert('deletado com sucesso')
			}).catch((err) => {
				console.log(err)
			}).finally(() => {
				navigate("/");
				window.location.reload()
			})
		} catch {
			console.log('deu ruim');
		}
	}

	const processRowUpdate = (newRow: Data) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const columns: GridColDef[] = [
		{ field: 'title', headerName: 'Título', width: 180, editable: true },
		{
			field: 'description',
			headerName: 'Descrição',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {

				console.log(id)

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEdit(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDelete(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	useEffect(() => {
		if (rows) {
			getDocs(collection(db, 'tasks')).then((docs: any) => {
				console.log(docs)
				docs.forEach((doc: any) => {
					const aux = doc.data()
					setRows(rows => [...rows, createData(doc.id, aux.titulo, aux.descricao)])
				})
				console.log(rows)
			}).catch((e) => {
				console.log(e)
			})
		};
	}, []);

	return (
		<Box
			sx={{
				height: 500,
				width: '40%',
				'& .actions': {
					color: 'text.secondary',
				},
				'& .textPrimary': {
					color: 'text.primary',
				},
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar as GridSlots['toolbar'],
				}}
			/>
		</Box>
	);
}
