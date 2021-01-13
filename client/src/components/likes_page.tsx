import React, {Fragment} from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const LikesPage: React.FC<Props> = ({likes,setLikes}) => {

    return (
        <Fragment>
            <Container maxWidth="lg">
                <GridList cellHeight={250} cols={3} spacing={15}>
                    {likes.map( (likeImg:any, idx:number) => {
                        return (
                            <GridListTile
                                key={idx}
                                style={{ flexGrow : 1 }}
                                cols={ Math.random()/2 + .5 }
                                // cols = {( likeImg.imgData.width/5000 )}
                            >
                                <img srcSet={`${likeImg.imagelink}?w=161&fit=crop&auto=format 1x, 
                                    ${likeImg.imagelink}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                    // alt={likeImg.description || likeImg.alt_description}
                                />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </Container>
        </Fragment>
    )
}

interface Props{
    likes: any,
    setLikes: any,
}

export default LikesPage;