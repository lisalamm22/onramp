import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import '../stylesheets/navbar.css'

const Navbar: React.FC<Props> = ({username, setAuthProp}) => {
    
    const logout = (e:any) => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuthProp(false)
    }

    return (
        <Container className="nav-container">
            <nav className="main-nav">
                <h3>WELCOME BACK, {username.toUpperCase()}</h3>
                <Button onClick={e => logout(e)}>Logout</Button>
            </nav>
        </Container>
    )
}

interface Props{
    username: string,
    setAuthProp: any,
}

export default Navbar;
