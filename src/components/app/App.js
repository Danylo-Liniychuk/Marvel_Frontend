import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Main from "../pages/Main";
import FormComics from "../formComics/formComics";
import Comics from "../pages/Comics";
import Page404 from "../pages/404";
import SingleComic from "../singleComic/SingleComic";


const App = () => {
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                            <Route exact path='/'> 
                                <Main/>
                            </Route>

                            <Route exact path='/comics'>
                                <Comics/>
                            </Route>

                            <Route exact path='/:slug'>
                                <FormComics/>
                            </Route>
                    
                            <Route  exact path='/comics/:comicId'>
                                <SingleComic/>
                            </Route>

                            <Route path="*">
                                <Page404/>
                            </Route>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;