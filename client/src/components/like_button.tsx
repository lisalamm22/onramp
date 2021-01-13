import React, {useState,useEffect,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const LikeButton: React.FC<Props> = ({image, likes, setLikes}) => {
    const [likeButton, setLikeButton] = useState<any>(
        <Button 
            onClick={() => {handleLike(image.id, image.urls.regular)}}
        >
            <FavoriteBorder />{image.likes}
        </Button>)

    useEffect(() => {
        const likedImgs = likes.map((like:any) =>{
            return like.image
        })
        // console.log("likedimgs",likedImgs)
        if(likedImgs.includes(image.id)){
            setLikeButton(<Button
                onClick={() => {
                    handleUnlike()
                }}
            >
                <Favorite/>{image.likes+1}
            </Button>)
        }
    }, [])

    async function postLike(image_id:string, imagelink:string) {
        try{
            const imageDesc = image.description || image.alt_description || ''
            const body = {
                image: image_id,
                imagelink: imagelink,
                imageDesc: imageDesc
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

    async function deleteLike(image_id:string){
        try{
            const body={
                image: image_id,
            }
            await fetch('user/likes',{
                method: 'DELETE',
                headers: {
                    token: localStorage.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
        } catch(error) {
            console.error(error.message)
        }
    }

    const handleLike = (image_id:string, imagelink:string) => {
        postLike(image_id, imagelink);
        setLikes(null);
        setLikeButton(<Button
            onClick = {() => {
                handleUnlike()
            }}
        ><Favorite/>{image.likes+1}</Button>)
    }

    const handleUnlike = () => {
        deleteLike(image.id);
        setLikes(null);
        setLikeButton(<Button 
            onClick = {() => {
                handleLike(image.id, image.urls.regular)
            }}
        ><FavoriteBorder/>{image.likes}</Button>)
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
