import { Input, Row } from 'antd';
import React, { useState } from 'react';
import { useZombieCreateContext } from './context/ZombieCreateContextProvider';

const ZombieCreate: React.FC = () => {
    const { create } = useZombieCreateContext();
    const [name, setName] = useState('');

    return (
        <Row>
            <h1>ZombieCreate</h1>
            <Input 
                value={name} 
                placeholder="Zombie name" 
                onChange={e => {
                    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                    setName(filteredValue);
                }} 
            />

            <button onClick={() => create(name)}>Create</button>
        </Row>
    )
}

export default ZombieCreate;
