import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { difficultyReducer } from '../reducers/difficultyReducer';
import { pageReducer } from '../reducers/pageReducer';
import { selectGameReducer } from '../reducers/selectGameReducer';
import { gameLinkReducer } from '../reducers/gameLinkReducer';
import { changeSeriaReducer } from '../reducers/seriaReducer';

const rootReducer = combineReducers({
  gameDifficulty: difficultyReducer,
  gameWordPage: pageReducer,
  selectedGame: selectGameReducer,
  from: gameLinkReducer,
  seria: changeSeriaReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
