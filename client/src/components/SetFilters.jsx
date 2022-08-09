import { useDispatch, useSelector } from "react-redux";
import { getGames, getGenres, getPlatforms, changeGenresFilter, changeNameOrder, changePlatformsFilter, changeRatingOrder, changeTypeFilter, clearStateByName, changeSearchGame, resetPage } from "../redux/actions";

export const SetFilters = ({ games, setInput, button }) => {  

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    const allGames = useSelector(state => state.allGames);
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.genres);
    const gameByName = useSelector(state => state.gameByName);
    const searchGame = useSelector(state => state.searchGame);
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);

    const handleResetAll = () => {
        if(currentPage !== 1) dispatch(resetPage(1))
        if(!allGames.length) dispatch(getGames());
        if(!genres.length0) dispatch(getGenres());
        if(!platforms) dispatch(getPlatforms());
        if(gameByName.length !== 0) dispatch(clearStateByName([]));
        if(searchGame) dispatch(changeSearchGame(false));
        if(genresFilter !== '') dispatch(changeGenresFilter(''));
        if(platformsFilter !== '') dispatch(changePlatformsFilter(''));
        if(typeFilter !== '') dispatch(changeTypeFilter(''));
        if(nameOrder !== '') dispatch(changeNameOrder(''));
        if(ratingOrder !== '') dispatch(changeRatingOrder(''));
        setInput('');
    }

    const handleResetGenres = () => {
        if(genresFilter !== '') dispatch(changeGenresFilter(''));
    };

    const handleResetPlatforms = () => {
        if(platformsFilter !== '') dispatch(changePlatformsFilter(''));
    };

    const handleResetType = () => {
        if(typeFilter !== '') dispatch(changeTypeFilter(''));
    };

    const handleResetName = () => {
        if(nameOrder !== '') dispatch(changeNameOrder(''));
    };

    const handleResetRaiting = () => {
        if(ratingOrder !== '') dispatch(changeRatingOrder(''));
    };

    const handleResetSearchGame = () => {
        if(searchGame) dispatch(changeSearchGame(false));
        dispatch(clearStateByName([]));
        setInput('');
    };

    return (
        <>
            <br />
            <button onClick={handleResetAll}>Reset</button>
            <h5>your research</h5>
            { games.length > 99 ?  <h5>0 results</h5> : <h5>{games.length} results</h5> }            
            {
                gameByName.length !== 0
                ? <button onClick={handleResetSearchGame}>Video Game: "{button}" x</button>
                : ''
            }     
            {
                genresFilter.length !== 0 
                ? <button onClick= {handleResetGenres}>Genre: {genresFilter} x</button>
                : ''
            }
            {
                platformsFilter.length !== 0 
                ? <button onClick= {handleResetPlatforms}>Platforms: {platformsFilter} x</button>
                : ''
            }
            {           
                typeFilter.length !== 0  
                ? <button onClick={handleResetType}>Type: {typeFilter} x</button>
                : ''
            }
            {           
                nameOrder.length !== 0 
                ? <button onClick={handleResetName}>Name: {nameOrder} x</button>
                : ''
            }
            {           
                ratingOrder.length !== 0 
                ? <button onClick={handleResetRaiting}>Rating: {ratingOrder} x</button>
                : ''
            }
        </>
    )

};