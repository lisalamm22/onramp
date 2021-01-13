import React, {Fragment} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const EditsPage: React.FC<Props> = ({edits, setEdits}) => {
    return (
        <Fragment>
            <GridList cellHeight={250} cols={3} spacing={15}>
                {edits.map( (editImg:any, idx:number) => {
                    return (
                        <GridListTile
                            key={idx}
                            style={{ flexGrow : 1 }}
                            cols={ Math.random() + .5 }
                        >
                            <img srcSet={`${editImg.imagelink}?w=161&fit=crop&auto=format 1x, 
                                ${editImg.imagelink}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                style={JSON.parse(editImg.options)}
                                alt={editImg.description || ''}
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
        </Fragment>
    )
}

interface Props {
    edits: any,
    setEdits: any,
}

export default EditsPage
