import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

export let respawnPlayer = false;

const ContextProvider = (props) => {

    const [ user, setUser ] = useState(null);

    const store = {}

    useEffect(() => initSockets({ store }), [initSockets]);
    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;