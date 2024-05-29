
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import './style/HomePage.css'

import 'firebase/compat/auth';

function HomePage() {

  return (
		<div className="home-page">
			<div className='forms'>
				<SignUp/>
				<div className='form-2'>
					<SignIn/>	
				</div>
			</div>
		</div>			
	);
}

export default HomePage;
