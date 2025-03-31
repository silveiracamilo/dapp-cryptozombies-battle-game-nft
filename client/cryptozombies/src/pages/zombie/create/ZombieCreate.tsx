import { Input, Row } from 'antd';
import React, { useState } from 'react';
import { useZombieCreateContext } from './context/ZombieCreateContextProvider';

const ZombieCreate: React.FC = () => {
    const { create } = useZombieCreateContext();
    const [name, setName] = useState('');

    return (
        <Row>
            <h1>ZombieCreate</h1>
            <Input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => create(name)}>Create</button>
        </Row>
    )
}

export default ZombieCreate;