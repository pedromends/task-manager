import './DashboardTop.css'

export default function DashboardTop(){
    return (
        <main>
            <h1 style={{color: '#006666', textAlign:'start', textDecoration: 'underline', textDecorationColor: 'rgba(168,204,204,1)', textDecorationThickness: '3px'}}>Dashboard</h1>
            <div className='dash-skeleton'>
                <div className='main-banner'>
                    <p>The Hourglass - Um lar <br/> para as suas ideias</p>
                    <img src="./assets/rocket.png" alt="" style={{width:'5rem'}}/>
                </div>
                <div className='time-cards'>
                    <h3 style={{color: '#006666', textAlign:'center'}}>Tempo de Execução do projeto</h3>
                    <div className='time-cards-children'>
                        <div className='time-card'>
                            <div style={{backgroundColor: '#006666', display: 'flex', justifyContent: 'center', borderStyle: 'dashed', borderColor: '#006666', borderRadius: '1rem'}}>
                                <img src="./assets/clock.svg" style={{width: '2rem', paddingLeft: '1rem', paddingRight: '1rem'}} alt=""/>
                            </div>
                            <div>
                                <p style={{color: '#006666'}}>Data de Início:</p>
                                <p style={{fontWeight: 'bold', color: '#006666'}}>27/05/2024</p>
                            </div>
                        </div>
                        <div className='time-card'>
                            <div style={{borderWidth: '3px', borderStyle: 'dashed', borderColor: '#006666', borderRadius: '1rem', display: 'flex', justifyContent: 'center'}}>
                                <img src="./assets/calendar.svg" style={{width: '2rem', paddingLeft: '1rem', paddingRight: '1rem'}} alt=""/>
                            </div>
                            <div>
                                <p style={{color: '#006666'}}>Data de Término:</p>
                                <p style={{fontWeight: 'bold', color: '#006666'}}>03/06/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}