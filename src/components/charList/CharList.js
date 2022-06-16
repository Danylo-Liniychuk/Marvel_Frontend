import './charList.scss';
import {useState, useEffect} from 'react'
import useMarvelService from "../service/service";
import Spinner from '../spiner/Spinner';


const CharList = (props) => {

    const [array, setArray] = useState([]),
          [offset, setOffset] = useState(300),
        //   [loading, setLoading] = useState(true),
          [newLoading, setNewLoading] = useState(false);
    const {loading, getAllCharacters} = useMarvelService();
    
    let characterArray = [];

    useEffect(() => {
        onGetHeroes();
    }, []);


    const onGetHeroes =  (offset, first=true) => {
        (first) ? setNewLoading(false) : setNewLoading(true) ;
        getAllCharacters(offset)
        .then(item => {
            setArray(array => [...array, ...item]);
            setOffset(offset => offset + 9);
            setNewLoading(false);
        })
    }



    const createArrayElements = (element) => {
        characterArray.push(element);
    }

    const getElementId = (id) => {
        characterArray.forEach(item => item.classList.remove("char__item_selected"));
        characterArray[id].classList.add('char__item_selected');
    }

    const listArr = [];
    array.forEach((item, i) => {
        const sub = 
        <li className="char__item" 
        key={item[2]}
        onClick={() => {props.onGetId(item[2]); getElementId(i)}}
        ref={createArrayElements}>
            <img src={item[1]} alt="abyss"/>
            <div className="char__name">{item[0]}</div>
        </li>;
        listArr.push(sub)
    });

    return(
        <div className="char__list">
        <ul className="char__grid">
            {(loading && !newLoading ) ? <Spinner/> : listArr}
        </ul>
        <button className="button button__main button__long"
            disabled={newLoading}
            onClick={() => onGetHeroes(offset, false)}>
            <div className="inner">load more</div>
        </button>
    </div>
    )
}


export default CharList;