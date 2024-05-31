import './TaskStep.css'

export default function TaskStep(){
    return (
        <main>
            <h1 style={{color: '#006666', textAlign:'start', textDecoration: 'underline', textDecorationColor: 'rgba(168,204,204,1)', textDecorationThickness: '3px'}}>Progresso</h1>
            <div className="progress-card">
                <div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-1'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem', fontWeight: 'bold'}}>Passo 1</p>
                    </div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-2'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem', fontWeight: 'bold'}}>Passo 2</p>
                    </div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-3'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem', fontWeight: 'bold'}}>Passo 3</p>
                    </div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-4'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem', fontWeight: 'bold'}}>Passo 4</p>
                    </div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-5'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem', fontWeight: 'bold'}}>Passo 5</p>
                    </div>
                </div>
                <div>
                    <div className='circle-1'>
                        <div className='circle-2'>
                            <div className='circle-3'>
                                <div className='circle-4'>
                                    <div className='circle-5'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cards-panel'>
                <h1 style={{color: '#006666', textAlign:'start', textDecoration: 'underline', textDecorationColor: 'rgba(168,204,204,1)', textDecorationThickness: '3px'}}>Painel de Passos</h1>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1rem'}}>Passo 1: Qual é a sua ideia ?</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '20rem', height: '5px', backgroundColor: 'black'}}></div>
                        <img src="./assets/right-arrow.svg" style={{height: '30px'}} alt="" />
                    </div>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1rem'}}>Passo 2: Como você vai executar a sua tarefa ?</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '20rem', height: '5px', backgroundColor: 'black'}}></div>
                        <img src="./assets/right-arrow.svg" style={{height: '30px'}} alt="" />
                    </div>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1rem'}}>Passo 3: Como você vai testar a sua ideia ?</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '20rem', height: '5px', backgroundColor: 'black'}}></div>
                        <img src="./assets/right-arrow.svg" style={{height: '30px'}} alt="" />
                    </div>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1rem'}}>Passo 4: Como você vai construir a sua ideia?</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '20rem', height: '5px', backgroundColor: 'black'}}></div>
                        <img src="./assets/right-arrow.svg" style={{height: '30px'}} alt="" />
                    </div>
                </div>
            </div>
        </main>
    )
}