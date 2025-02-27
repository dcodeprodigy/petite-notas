import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
            <p>We could not find that page. <Link to="/login"> Navigate to Login </Link></p>
    )
}

export default NotFound;