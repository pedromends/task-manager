import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { collection, getDocs, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { db } from "../../config/firebase-config"
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowEditStopReasons, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import './CrudGrid.css'
import AddDialog from '../dialog/AddDialog';

interface Data {
	id: string,
	title: string;
	description: string;
}

function createData(
	id: string,
	title: string,
	description: string,
) : Data {
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

	function EditToolbar() {
	  
		return (
		  <GridToolbarContainer>
			<div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem'}}>
				<AddDialog/>
				<div style={{display: 'flex', gap: '1rem', borderStyle: 'solid', borderWidth: '2px', borderColor: '#006666', borderRadius: '1rem', paddingLeft: '1rem'}}>
					<img src="./assets/search.svg" alt="" style={{width: '20px'}}/>
					<input type="text" placeholder='Pesquisar tarefas' style={{borderStyle: 'none'}} onKeyDown={(e)=> {
						if(e.key === 'Enter'){
							searchData();
						}
					}}/>
				</div>
			</div>
		  </GridToolbarContainer>
		);
	}

	const searchData = () => {
		
	}

	const handleEdit = (id: GridRowId) => () => {
		let aux: Data = {
			id: '',
			title: '',
			description: ''
		};
		
		rows.forEach((row) => {
			if (row.id === id)
				aux = row;
		});
		
		if (aux !== null) 
			navigate("/edit", {state: {id: aux.id, title: aux.title, desc: aux.description}});
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
			headerClassName: 'std-header',
			editable: false,
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
			field: 'action',
			headerName: 'Ações',
			headerClassName: 'std-header',
			type: 'actions',
			headerAlign: 'center',
			align:'center',
			width:200,
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
				borderColor: '#006666',
				marginTop: '5rem'
			}}
		>
			<h1 style={{color: '#006666'}}>Tarefas</h1>
			<DataGrid
				sx={{
					color:'#006666',
					backgroundColor: 'white',
					textAlign:'center',
					borderRadius: '2rem',
				}}
				rows={rows}
				initialState={{
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				slots={{
					toolbar: EditToolbar as GridSlots['toolbar'],
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
