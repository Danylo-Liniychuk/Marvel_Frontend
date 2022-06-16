import './formComics.scss';
import AppBanner from "../appBanner/AppBanner";
import { useParams } from 'react-router-dom';
import useMarvelService from '../service/service';
import { useEffect, useState } from 'react';

const FormComics = () => {
    const {slug} = useParams();
    const {getCharacterForForm} = useMarvelService();
    const [heroName, setHeroName] = useState(null),
          [descr, setDescr] = useState(null),
          [src, setSrc] = useState(null);
    
    useEffect(()=>{
        onGetHero();
    }, [slug])


    const onGetHero = () => {
        getCharacterForForm(slug)
        .then(item => {
            setHeroName(item.name);
            setDescr(item.description);
            setSrc(item.src);
        })
    }
    return(
        <>
        <AppBanner/>
        <Vue props={{heroName, descr, src}}/>
        </>
    )
}

const Vue = ({props}) => {
    const {heroName, descr, src} = props;
    return(
        <>
            <img src={src} alt="comic" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{heroName}</h2>
                <p className="single-comic__descr">{(descr) ? descr : 'Description not found..'}</p>
            </div>
        </>
    )
}

export default FormComics