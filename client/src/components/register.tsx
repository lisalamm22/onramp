import {FunctionComponent,Fragment} from 'react';
import {RouteComponentProps} from 'react-router';
import Textfield from '@material-ui/core/TextField';

const Register: FunctionComponent<RouteComponentProps> = () => {
    return(
        <Fragment>
            <h1>Sign Up</h1>
            <form>
                <Textfield type="email" label="EMAIL" placeholder="email"/>
                <Textfield type="password" label="PASSWORD" placeholder="password"/>
                <Textfield type="text" label="USERNAME" placeholder="username"/>
            </form>
        </Fragment>
    )
}

export default Register;