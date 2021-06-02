import { Map } from 'immutable';

const defaultState = Map({
    currentSong: {}
});

function reducer(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}