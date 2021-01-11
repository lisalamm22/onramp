import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useParams } from 'react-router-dom';

const Photo: React.FC<Props> = () => {
    const params = useParams();
    const [photoURL, setPhotoURL] = useState<string>('')
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
    }
    return (
        <div>
            {/* Photo {photoId} */}
            <img src={photoURL}/>
        </div>
    )
}

interface Props extends RouteComponentProps{

}

export default Photo