import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useState, useEffect} from "react"
import useMarvelService from "../service/service";
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../error/error';

const RandomChar = () => {
    
    const [name, setName] = useState(null),
          [src, setSrc] = useState(null),
          [description, setDescription] = useState(null),
          [home, setHome] = useState(null),
          [wiki, setWiki] = useState(null);
    const {loading, error, getOneCharacter, clearError} = useMarvelService();
        //   [loading, setLoading] = useState(true);

    
    useEffect(() => {
        updateState();
    }, []);


    const updateState = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getOneCharacter(id)
        .then(item => {
            setName(item.name);
            setSrc(item.src);
            setDescription(item.description ? ((item.description.length > 210) ? (item.description.slice(0,210) + '...') : item.description) : "Description not found");
            setHome(item.home);
            setWiki(item.wiki);
        });

    } 

    const newError = error ? <ErrorMessage/> : null,
            newLoading = loading ? <Spinner/> : null,
            vue = !(error || loading) ? <Vue hueta={{name, src, description, home, wiki}}/> : null;
    return (
        <div className="randomchar">
            {newError}
            {newLoading}
            {vue}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateState}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const Vue = ({hueta}) =>{
    const {name, src, description, home, wiki}  = hueta
        
    return (
        <div className="randomchar__block">
        <img src={src} style={(src === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? {objectFit: "contain"}  : {objectFit: "cover"}} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={home} className="button button__main">
                    <div className="inner">Home</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;