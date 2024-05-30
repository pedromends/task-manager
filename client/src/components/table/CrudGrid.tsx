import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../config/firebase-config"
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import './CrudGrid.css'

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

export default function CrudGrid() {

	const [rows, setRows] = useState<Data[]>([]);
	const navigate = useNavigate();
	
	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEdit = (id: GridRowId) => () => {
		console.log(id);
		let aux:Data = {
			id: '',
			title: '',
			description: ''
		};
		
		rows.forEach((row) => {
			if (row.id === id) {
				aux = row;  // Atualiza 'aux' se encontrar o id correspondente
			}
		});
		
		if (aux !== null) {  // Verifica se 'aux' foi atualizado
			navigate("/edit", {state: {id: aux.id, title: aux.title, desc: aux.description}});
		}
		
	}

	const handleDelete = (id: GridRowId) => () => {
		console.log(id)
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
		{
			field: 'title',
			headerName: 'Título',
			editable: false,
			headerClassName: 'std-header',
			width:200,
			headerAlign: 'center',
			align:'center'
		},
		{
			field: 'description',
			headerName: 'Descrição',
			headerClassName: 'std-header',
			width:200,
			headerAlign: 'center',
			editable: false,
			align:'center'
		},
		{
			field: 'actions',
			type: 'actions',
			headerClassName: 'std-header',
			headerAlign: 'center',
			align:'center',
			width:200,
			headerName: 'Actions',
			cellClassName: 'actions',
			getActions: ({ id }) => {
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
				'& .actions': {
					color: 'red',
				},
				'& .textPrimary': {
					color: 'green',
				},
				backgroundColor: 'white',
				color:'white',
				borderStyle: 'solid',
				borderWidth: '2px',
				borderRadius: '2rem',
				borderColor: '#006666'
			}}
		>
			<h1 style={{color: '#006666'}}>Tarefas</h1>
			<DataGrid
				sx={{
					color:'#006666',
					backgroundColor: 'white',
					textAlign:'center',
					borderRadius: '2rem'
				}}
				rows={rows}
				initialState={{
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				columns={columns}
				pagination
				rowSelection
				pageSizeOptions={[5,10,25]}
				editMode="row"
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</Box>
	);
}
