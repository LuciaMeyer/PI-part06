import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getPlatforms } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { NotFound } from '../NotFound/NotFound'
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from '../Loading/Loading'
import { nameASC, nameDES, ratingWORST, ratingBEST, newest, oldest } from '../../helpers/sort';
import { Filters } from '../Filters/Filters';
import { Nav } from '../Nav/Nav';
import { SetFilters } from "../SetFilters/SetFilters";
import { CreatedBy } from '../CreatedBy/CreatedBy'
import './Home.css'
import { TopBar } from '../TopBar/TopBar';

export const Home = () => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    const allGames = useSelector(state => state.allGames);
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const gameByName = useSelector(state => state.gameByName);
    const searchGame = useSelector(state => state.searchGame);
    const useFilter = useSelector(state => state.useFilter)
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);
    const released = useSelector(state => state.released)
    const [menuOpen, setMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // defino qué renderizar según los filtros
    let games = []  
    searchGame && !gameByName.msg ? games = [...gameByName] : games = [...allGames];

    // filtrados
    if(genresFilter.length !== 0 && genresFilter !== 'All Genres') games = games.filter(g => g.genres.includes(genresFilter));
    if(platformsFilter.length !== 0 && platformsFilter !== 'All Platforms') games = games.filter(g => g.platforms.includes(platformsFilter));
    if(typeFilter === 'Created') games = games.filter(g => typeof g.id === 'string');
    if(typeFilter === 'API') games = games.filter(g => typeof g.id === 'number');       
    if(nameOrder === 'A - Z' ) games.sort(nameASC);
    if(nameOrder === 'Z - A') games.sort(nameDES);
    if(ratingOrder === 'Worst Rating') games.sort(ratingWORST);          
    if(ratingOrder === 'Best Rating') games.sort(ratingBEST);
    if(released === 'The newest') newest(games)
    if(released === 'The oldest') oldest(games)

    // paginado
    const gamesPerPage = 16;
    const indexLastGame = currentPage * gamesPerPage;
    const indexFirstGame = indexLastGame - gamesPerPage;
    const currentGames = games.slice(indexFirstGame, indexLastGame);

    // defino loading
    let loading = false  
    if ( !games.length && !useFilter && !searchGame) loading = true;
    if ( searchGame && !gameByName.msg && !gameByName.length ) loading = true;

    // defino notFound
    let notFound = false;
    if(searchGame && gameByName.msg) notFound = true;
    if(!games.length && useFilter) notFound = true;

    // menú desplegable 
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        window.scrollTo(0, 0);
    };

    // info del back   
    useEffect(() => {
        if(!games.length ) dispatch(getGames())
        if(!genres.length) dispatch(getGenres())         
        if(!platforms.length) dispatch(getPlatforms())
        window.scrollTo(0, 0);
        if(windowWidth <= 900 && !menuOpen) toggleMenu()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // escucho tamaño de pantalla 
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // se ejecuta la fn solo al al cambiar la búsqueda
    useEffect(()=> { 
        if(!!gameByName.length &&  windowWidth <= 900 && !menuOpen) toggleMenu()
    },[gameByName.length]) // eslint-disable-line react-hooks/exhaustive-deps
   
    // se ejecuta la fn solo al cambiar el notFound
    useEffect(()=> { 
        if(!!notFound &&  windowWidth <= 900 && !menuOpen) toggleMenu()
    },[notFound]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            {/* SIDEBAR */}
            <div className={`sidebar ${!menuOpen ? 'open' : 'closed'}`}>
                <div className='marginNav'>
                    <Nav windowWidth={windowWidth}/>
                </div>      
                <SearchBar games={games} loading={loading} notFound= {notFound}/>
                <SetFilters toggleMenu={toggleMenu}/>  
                {!loading && <Filters notFound={notFound}/>}
                <div className={loading ? 'creatLoad' : 'creat' }>
                    <CreatedBy/>
                </div>
            </div>

            {/* TOPBAR */}
            <div className={`topbar ${!menuOpen ? '' : 'closed'}`}>
                <TopBar/>
            </div>

            {/* PAGINATION-TOP   */}
            <div className={`pagTop ${!menuOpen ? '' : 'closed'}`}>
                <Pagination
                    games={games.length}
                    gamesPerPage={gamesPerPage}
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    windowWidth={windowWidth}
                />
            </div>
            
            {/* LOADING */}
            {loading &&
                <div className={`load-notF${
                    !menuOpen && windowWidth > 900 ? '' :
                    menuOpen && windowWidth > 900 ? ' closed' :
                    !menuOpen && windowWidth <= 900 ? 'none' : 
                    menuOpen && windowWidth <= 900 && ' closed'               
                }`}>
                   <Loading/>
                </div>
            }

            {/* NOTFOUND */}
            {notFound &&
                <div className={`load-notF${
                    !menuOpen && windowWidth > 900 ? '' :
                    menuOpen && windowWidth > 900 ? ' closed' :
                    !menuOpen && windowWidth <= 900 ? 'none' : 
                    menuOpen && windowWidth <= 900 && ' closed'               
                }`}>
                   <NotFound/>
                </div>
            }
            
            {/* CARDS */}
            {!loading && !!currentGames.length && !notFound &&        
                <div className={`maincontainer${
                    games.length === 1 ? ' one' :
                    !menuOpen && windowWidth <= 900 ? ' none' : ''
                }`}>
                    <div className={`cardsContain${
                        menuOpen && games.length === 1 ? ' closedOne' :
                        !menuOpen ? '' : ' closed'
                    }`}>                           
                        {currentGames?.map(e => (
                            <div key={e.id} className={`card ${!menuOpen ? '' : 'closed'}`}>
                                <Link to={'/game/' + e.id }>
                                    <Card
                                        key= {e.id}
                                        name={e.name}
                                        img={e.img}
                                        rating={e.rating}
                                        genres={e.genres}
                                        platforms={e.platforms}
                                        released= {e.released}
                                    />
                                </Link>
                            </div>                           
                        ))}
                    </div>
                </div>
            }
            <div className={`up ${!menuOpen ? '' : 'closed'}`}>
                <button className='butUp' onClick={()=> window.scrollTo(0, 0)}>GO UP</button>
            </div>
            {/* FOOTER */}
            <div className={`footer
                ${menuOpen && windowWidth <= 900 ? ' closedResp' : ''}
                `}>
                <CreatedBy/>
            </div>
        </>
    )
};
