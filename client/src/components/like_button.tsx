import React, {useState,useEffect,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const LikeButton: React.FC<Props> = ({image, likes, setLikes}) => {
    const [likeButton, setLikeButton] = useState<any>(
        <Button onClick={() => {handleLike(image.id, image.urls.regular)}}>
            <FavoriteBorder />{image.likes}
        </Button>)
    useEffect(() => {
        const likedImgs = likes.map((like:any) =>{
            return like.image
        })
        // console.log("likedimgs",likedImgs)
        if(likedImgs.includes(image.id)){
            setLikeButton(<Button>
                <Favorite/>{image.likes+1}
            </Button>)
        }
    }, [])

    async function postLike(image_id:string, imagelink:string) {
        try{
            const body = {
                image: image_id,
                imagelink: imagelink
            }
            await fetch('/user/likes', {
                method: 'POST',
                headers: { 
                    token: localStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
        } catch(error){
            console.error(error.message)
        }
    }

    const handleLike = (image_id:string, imagelink:string) => {
        console.log(likes)
        postLike(image_id, imagelink);
        setLikes(null);
        setLikeButton(<Button><Favorite/>{image.likes+1}</Button>)
    }

    return (
        <Fragment>
            {likeButton}
        </Fragment>
    )
}

interface Props{
    likes: any,
    setLikes: any,
    image: any,
}

export default LikeButton
