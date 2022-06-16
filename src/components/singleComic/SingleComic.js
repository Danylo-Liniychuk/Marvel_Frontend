import './singleComic.scss';
import Spinner from '../spiner/Spinner';
import AppBanner from "../appBanner/AppBanner";
import {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import useMarvelService from '../service/service'

const SingleComic = () => {

    const {comicId} = useParams();
    const {getComic, loading} = useMarvelService();

    const [name, setName] = useState(null),
          [src, setSrc] = useState(null),
          [description, setDescription] = useState(null),
          [price, setPrice] = useState(null),
          [pages, setPages] = useState(null);

    
    useEffect(() => {
        updateState();
    }, [])
          
    const updateState = () => {
        getComic(comicId)
        .then(item => {
            setName(item.name);
            setSrc(item.src);
            setDescription(item.description);
            setPrice(item.price);
            setPages(item.pages);
        })
    }; 

    const watch = (name && !loading) ? <Vue property={{name, src, description, price, pages}}/> : null,
          newLoading = (loading) ? <Spinner/> : null;

    return (
        <>
        <AppBanner/>
        <div className="single-comic">
            {watch}
            {newLoading}
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
        </>

    )
}

const Vue = ({property}) => {
    const {name, src, description, price, pages} = property;

    return(

        <>
            <img src={src} alt="comic" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{(description) ? description : 'Description not found..'}</p>
                <p className="single-comic__descr">{`${pages} pages`}</p>
                <p className="single-comic__descr">Language: us-en</p>
                <div className="single-comic__price">{`${price}$`}</div>
            </div>
        </>
    )
    
}

export default SingleComic;