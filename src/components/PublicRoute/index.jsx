import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route} from 'react-router-dom';
import Context from '../../Context/Context'
import Loading from '../Loading'

const PublicRoute = ({ component: Component, ...rest }) => {

    const [ isLoading, setIsLoading ] = useState(true)

    const token = localStorage.getItem('token');

    const user = null;

    useEffect(() => {
        // logic to check user
        setIsLoading(false)
    }, [])

    const ComponentToRender = (props) => {
        if(user === null && (token !== null && token !== "" ) && isLoading) {
            return <Loading />
        }
        // check if user is thre
        else if(user) {
            return <Redirect to='/feed'/>
        }
        
        return <Component {...props} />

    }

    return <Route {...rest} render={(props) => (
            ComponentToRender(props)
        )} 
    />
}

export default PublicRoute;