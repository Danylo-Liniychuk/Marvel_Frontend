import './form.scss';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import useMarvelService from "../service/service"

const MyForm = () => {
    const [heroId, setHeroId] = useState(false),
          [heroName, setHeroName] = useState(null),
          [status, setStatus] = useState(true);
    const {getHeroId} = useMarvelService();

    const schema = yup
    .object()
    .shape({
        name: yup.string().required()
    })
    .required();

    const {handleSubmit,register, formState: { errors }} = useForm(
        {
            resolver: yupResolver(schema),
          }
    );
    const onSubmit = (data) => {
        getHeroId(data.name)
        .then(item => {
            if(!item){
                setStatus(false);
            } else {
                setHeroId(item.id);
                setHeroName(data.name)
            }
        });
    }

   
    return(
        <div  className="char__search-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="char__search-label" htmlFor="charName">"Or find a character by name:"</label>
                <div className="char__search-wrapper">
                    <input type="text" {...register("name", { required: true, maxLength: 20 } )} className="form_input" placeholder={'Enter name'}/>
                    <button type="submit" disabled='' className="button button__main">
                        <div className="inner">find</div></button>
                </div>
                {(heroId) ? <div className="char__search-success">{`There is! Visit ${heroName} page?`}</div> : null}
                {(heroId) ? <Link to={{pathname : `/${heroId}`}}  className="button button__secondary"><div className="inner">to page</div></Link> : null}
                {!status ? <div className='char__search-error'>The character was not found. Check the name and try again</div> : null}
                {errors.name ? <div className='char__search-error'>This field is required</div> : null}
            </form>
        </div>
    );
}
export default MyForm 