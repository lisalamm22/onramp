import {FunctionComponent, Fragment} from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '@material-ui/core/Button';

// function Login() {
const Login: FunctionComponent<Props> = ({setAuthProp}) => {
    return (
        <Fragment>
            <h1>Sign In</h1>
            <Button onClick={()=>setAuthProp(true)}>Login</Button>
        </Fragment>
    )
}

interface Props extends RouteComponentProps {
    setAuthProp: (bool:Boolean) => void
}

export default Login