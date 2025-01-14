import { GET_GAMES, GET_GENRES, GENRE_FILTER, TYPE_FILTER, CURRENT_PAGE, RESET_PAGE, NAME_ORDER, RATING_ORDER, GET_PLATFORMS, PLATFORMS_FILTER, GET_GAME_DETAIL, GET_GAME_BY_NAME, SEARCH_GAME, USE_FILTER, CLEAN_ALL_FILTERS, CLEAN_DETAIL, GAME_UPDATE, RELEASED } from '../actions/actions_types'
import { nameASC } from '../../helpers/sort';

const initialState = {  
    currentPage: 1,
    allGames: [],
    genres: [],
    platforms: [],
    gameByName: [],
    searchGame: false,
    useFilter: false,
    gameDetail: {},
    gameUpdate: {},
    genresFilter: '',
    platformsFilter: '',
    typeFilter: '',
    nameOrder:'',
    ratingOrder: '',
    released: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CURRENT_PAGE:
            return {
            ...state,
            currentPage: action.payload
            }
        case GET_GAMES:
            return {
                ...state,
                allGames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload.sort(nameASC)
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload.sort(nameASC)
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                gameByName: action.payload
            }
        case SEARCH_GAME:
            return {
                ...state,
                searchGame: action.payload
            }
        case USE_FILTER:
            return {
                ...state,
                useFilter: action.payload
            }
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }
        case GENRE_FILTER:
            return {
            ...state,
            genresFilter: action.payload
            }
        case PLATFORMS_FILTER:
            return {
            ...state,
            platformsFilter: action.payload
            }    
        case TYPE_FILTER:
            return {
            ...state,
            typeFilter: action.payload
            }
        case NAME_ORDER:
            return {
            ...state,
            nameOrder: action.payload
            }
        case RATING_ORDER:
            return {
            ...state,
            ratingOrder: action.payload
            }
        ///////////////////////////////    
        case CLEAN_ALL_FILTERS:
            return {
                ...state,
                currentPage: 1,
                gameByName: [],
                searchGame: false,
                useFilter: false,
                genresFilter: '',
                platformsFilter: '',
                typeFilter: '',
                nameOrder:'',
                ratingOrder: '',
                released: ''
            }
        case RESET_PAGE:
            return {
            ...state,
            currentPage: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
            gameDetail: action.payload
            }
        case GAME_UPDATE:
            return {
                ...state,
                gameUpdate: action.payload
            }
        case RELEASED:
            return {
                ...state,
                released: action.payload
            }
        default: return state;                 
    }
};



