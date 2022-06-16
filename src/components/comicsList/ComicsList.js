import './comicsList.scss';
import {Link} from "react-router-dom";
import Spinner from '../spiner/Spinner';
import {useState, useEffect} from 'react'
import useMarvelService from "../service/service";



const ComicsList = () => {
    const [array, setArray] = useState([]),
          [offset, setOffset] = useState(),
          [newLoading, setNewLoading] = useState(false);

    const {getComicsList, loading} = useMarvelService();
    
    useEffect(()=>{
        onGetcomics();
    }, [])

    const onGetcomics = (first=true) => {
        (first) ? setNewLoading(false) : setNewLoading(true) ;
        getComicsList(offset)
        .then(item => {
            setArray(array => [...array, ...item]);
            setOffset(offset => offset + 8);
            setNewLoading(false);
            console.log(offset);
        });  
    };

    const listArr = [];

    array.forEach((item, i) => {
        const sub = 
        <li className="comics__item" key={i}>
            <Link to={`/comics/${item[3]}`}>
                <img src={item[1]} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{item[0]}</div>
                <div className="comics__item-price">{(item[2] !== 0) ? `${item[2]}$` : 'NOT AVAILABLE'}</div>
            </Link>
        </li>;
        listArr.push(sub)
    });

    return (
        <div className="comics__list">
            <ul className="comics__grid">
            {(loading && !newLoading ) ? <Spinner/> : listArr}
            </ul>
            <button className="button button__main button__long"
                    disabled={newLoading}
                    onClick={() => onGetcomics(false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;