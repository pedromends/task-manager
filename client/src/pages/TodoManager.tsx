import CrudGrid from '../components/table/CrudGrid';
import './TodoManager.css'
import TaskStep from '../components/layout/TaskStep';
import DashboardTop from '../components/layout/DashboardTop';

export default function TodoManager() {
	
	return (
		<main className='list-page'>
			<div className='dash-parent'>
				<DashboardTop/>
			</div>
			<div className='crud-parent'>
				<div className="left-panel">
					<TaskStep/>
				</div>
				<div className="right-panel">
					<CrudGrid/>
				</div>
			</div>
		</main>
	);
}
