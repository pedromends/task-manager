import './TaskStep.css'

export default function TaskStep(){
    return (
        <main>
            <h1 style={{color: '#006666', textAlign:'start'}}>Progresso</h1>
            <div className="progress-card">
                <div>
                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-1'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem'}}>Passo 1</p>
                    </div>

                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-2'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem'}}>Passo 2</p>
                    </div>

                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-3'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem'}}>Passo 3</p>
                    </div>

                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-4'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem'}}>Passo 4</p>
                    </div>

                    <div style={{display: 'flex', alignItems:'center', gap: '1rem'}}>
                        <div className='barr barr-5'></div>
                        <p style={{color: '#006666', fontSize: '1.2rem'}}>Passo 5</p>
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
                <h2 style={{color: '#006666', textAlign:'start'}}>Painel de Passos</h2>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1.2rem',fontWeight: 'bold'}}>Passo 1: Qual é a sua ideia ?</p>
                    <p>----------------</p>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1.2rem',fontWeight: 'bold'}}>Passo 2: Como você vai executar a sua tarefa ?</p>
                    <p>----------------</p>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1.2rem',fontWeight: 'bold'}}>Passo 3: Como você vai testar a sua ideia ?</p>
                    <p>----------------</p>
                </div>
                <div className="step-card">
                    <p style={{color: '#006666', fontSize: '1.2rem',fontWeight: 'bold'}}>Passo 4: Como você vai construir a sua ideia?</p>
                    <p>----------------</p>
                </div>
            </div>
        </main>
    )
}