import {useState} from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import MyForm from '../form/form';


const Main = () => {
    const [detailId, setDetailId] = useState(null);

    const onGetId = (id) => {
        setDetailId(id);
    }

    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onGetId={onGetId}/>
                <div>
                    <CharInfo id={detailId}/>
                    <MyForm/>
                </div>

                
            </div>
            
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )

}

export default Main;