
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import './LoginPage.css'

import 'firebase/compat/auth';

function LoginPage() {
  return (
		<div className="login-page">
			<div className='forms'>
				<SignUp/>
				<div className='form-2'>
					<SignIn/>	
				</div>
			</div>
		</div>			
	);
}

export default LoginPage;
