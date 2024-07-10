import React from 'react';
import CardGradient from '../components/CardGradient';

const Home = () => {
    return <div>
        <div style={{ marginTop: '25px' }}>
            <CardGradient />
            <div className='flex-column'>
                <img style={{ width: '500px', alignItems: 'center' }} src="src\assets\home.png" />
                <h1>HOŞGELDİNİZ</h1>
            </div>

        </div>

    </div>;
};

export default Home;
