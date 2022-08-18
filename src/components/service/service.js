import {useHttp} from '../hooks/request'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    const baseOffset = 300  ;
    const url = 'https://gateway.marvel.com:443/v1/public/characters'
    const comicsUrl = 'https://gateway.marvel.com:443/v1/public/comics'
    const key = 'apikey=8870c5a6593ef2aba044c7c052fe3558';

    const getAllCharacters = (offset = baseOffset) => {
        const all = request(`${url}?limit=9&offset=${offset}&${key}`);
        return all.then(prom => {return getArrayHeroes(prom)});
    }

    const getComicsList = (offset = baseOffset) => {
        const all = request(`${comicsUrl}?limit=8&offset=${offset}&${key}`);
        return all.then(prom => {return getComicsInfo(prom)});
    }

    const getComic = (id) =>{
        const all = request(`${comicsUrl}/${id}?${key}`);
        return all.then(prom => {return getComicInfo(prom)});
    }

    const getOneCharacter =  (id) => {
        let one = request(`${url}/${id}?${key}`);
        return one.then(item => {return  getObject(item)});
    }


    const getCharacterForForm = (id) => {
        const char = request(`${url}/${id}?${key}`)
        return char.then(item => {return CharTransform(item)})
    }


    const getHeroId = (name) => {
        const char = request(`${url}?name=${name}&${key}`)
        return char.then(item => {
            if (item.data.total > 0) {
                return {id: item.data.results[0].id}
            } else {
                return false
            }
        })
    }

    const getArrayHeroes = (prom) => {
        const arr = [];
        prom.data.results.forEach(element => {
            const subArr = [element.name, `${element.thumbnail.path}.${element.thumbnail.extension}`, element.id];
            arr.push(subArr);
        });
        return arr;
    }

    const getObject = (item) => {
        return {
            name: item.data.results[0].name,
            src: `${item.data.results[0].thumbnail.path}.${item.data.results[0].thumbnail.extension}`,
            description: item.data.results[0].description,
            home: item.data.results[0].urls[0].url,
            wiki: item.data.results[0].urls[1].url,
            comics: item.data.results[0].comics.items.map(item => item.name)
        }
    }
    
    const getComicInfo = (item) => {
        return {
            name: item.data.results[0].title,
            src: `${item.data.results[0].thumbnail.path}.${item.data.results[0].thumbnail.extension}`,
            description: item.data.results[0].description,
            price: item.data.results[0].prices[0].price,
            pages: item.data.results[0].pageCount,
        }
    }

    const getComicsInfo = (item) => {
        const arr = [];
        item.data.results.forEach(comics => {
            const subArr = [comics.title, `${comics.thumbnail.path}.${comics.thumbnail.extension}`, comics.prices[0].price, comics.id ];
            arr.push(subArr);
        });
        return arr;
    }

    const  CharTransform = (item) =>{
        return({
            name: item.data.results[0].name,
            description: item.data.results[0].description,
            src:`${item.data.results[0].thumbnail.path}.${item.data.results[0].thumbnail.extension}`,
        })
    }

    return {loading, error, getOneCharacter, clearError, getAllCharacters, getComicsList, getComic, getCharacterForForm, getHeroId}
}

export default useMarvelService;