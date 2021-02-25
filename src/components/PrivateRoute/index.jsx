import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Loading from '../Loading';
import { Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const MyContext = useContext(Context);

    const token = localStorage.getItem('token');

    const [ isLoading, setIsLoading ] = useState(true)

    const { user } = MyContext;

    useEffect(() => {
        setIsLoading(false)
    });

    const ComponentToRender = (props) => {

        if(user === null && (token !== null && token !== "" ) && isLoading) {
            return <Loading/>
        }
        else if(!user) {
            return <Redirect to='/'/>
        }
        return <Component {...props} />

    }

    return <Route {...rest} render={(props) => (
            ComponentToRender(props)
        )} 
    />
}

export default PrivateRoute;