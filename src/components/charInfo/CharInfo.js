import './charInfo.scss';
import Skeleton from '../skeleton/Skeleton';
import {useState, useEffect} from 'react'
import useMarvelService from "../service/service";
import Spinner from '../spiner/Spinner';


const CharInfo = (props) =>{
    const [name, setName] = useState(null),
          [src, setSrc] = useState(null),
          [description, setDescription] = useState(null),
          [home, setHome] = useState(null),
          [wiki, setWiki] = useState(null),
          [comics, setComics] = useState(false),
          {loading, getOneCharacter } = useMarvelService();



    useEffect(() => {
        updateState();
    }, [props])

    const updateState = () => {
        getOneCharacter(props.id)
        .then(item => {
            setName(item.name);
            setSrc(item.src);
            setDescription(item.description ? ((item.description.length > 210) ? (item.description.slice(0,210) + '...') : item.description) : "Description not found");
            setHome(item.home);
            setWiki(item.wiki);
            setComics(item.comics);
        })
    }; 

    const {id} = props;
    const skeleton = !id ? <Skeleton/> : null,
            vue = (comics && !loading) ? <Vue property={{name, src, description, home, wiki, comics}}/> : null,
            newLoading = (loading  && id) ? <Spinner/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {newLoading}
            {vue}
        </div>
    )


}


const Vue = ({property}) => {
    const {name, src, description, home, wiki, comics} = property;
    const counter = 14,
          len = comics.length;
    return(
        <>
          <div className="char__basics">
                    <img src={src} style={(src === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? {objectFit: "contain"}  : {objectFit: "cover"}} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={home}className="button button__main">
                                <div className="inner">Home</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {(len !== 0) ? comics.map((item, i) => {
                        if(i < counter){
                        i++
                        return(                    
                        <li className="char__comics-item" key={i}>
                        {item}
                        </li>)
                        }
                    }) : 'Comics not found'}
                </ul>
        </>
    )
}


export default CharInfo;