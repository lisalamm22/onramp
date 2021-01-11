import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import '../stylesheets/photo.css';

const Photo: React.FC<Props> = () => {
    const params = useParams();
    const [photoURL, setPhotoURL] = useState<string>('')
    const [photoTitle, setPhotoTitle] = useState<string>('')
    const photoId = params['id'];
    // let photo:any;

    useEffect(() => {
        fetchImage();
    }, [])

    const unsplashAPI = "https://api.unsplash.com"

    const fetchImage = async () => {
        const photo = await axios
            .get(`${unsplashAPI}/photos/${photoId}?client_id=DvjCg2G2B7CpZqGGEO0BJbxr6YpaOeuFt09A32zLnEY`)
        console.log(photo)
        setPhotoURL(photo.data.urls.regular)
        setPhotoTitle(photo.data.description || photo.data.alt_description)
    }
    return (
        <Container maxWidth="lg" className ="photo-page">
            <h1>{photoTitle}</h1>
            <img className="photo-pg-img" src={photoURL}/>
            
        </Container>
    )
}

interface Props extends RouteComponentProps{

}

export default Photo