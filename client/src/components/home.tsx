import { FunctionComponent, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import Button from "@material-ui/core/Button"

const Home: FunctionComponent<Props> = ({setAuthProp}) => {
    return(
        <Fragment>
            <h1>Home</h1>
            <Button onClick={()=>setAuthProp(false)}>Logout</Button>
        </Fragment>
    )
}

interface Props extends RouteComponentProps{
    setAuthProp: (bool:Boolean) => void
}

export default Home