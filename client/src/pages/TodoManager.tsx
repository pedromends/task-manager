import CrudGrid from '../components/table/CrudGrid';
import './TodoManager.css'
import TaskStep from '../components/layout/TaskStep';

export default function TodoManager() {
	
	return (
		<main className='list-page'>
			<div className='crud-parent'>
				<div className="left-panel">
					{/* <NewTask/> */}
					<TaskStep/>
				</div>
				<div className="right-panel">
					<CrudGrid/>
				</div>
			</div>
		</main>
	);
}
