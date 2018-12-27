const redux = require('redux');

//create a store
const createStore = redux.createStore;

//initial state to be passed to the reducer
const initialState = {
    counter:0
};
//define a reducer which will be passed to the store as parameter
const rootReducer  = (state=initialState,action) => {
    if(action.type=='INC_COUNTER'){
        return {...state,counter:state.counter+1}
    }

    if(action.type=='ADD_COUNTER'){
        return {...state,counter:state.counter+action.value}
    }
}

//store
const store = createStore(rootReducer);
//Subscription
store.subscribe(()=>{
    console.log('[Subscription]=>',store.getState());
})

//dispatcher
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER',value:10});
console.log(store.getState());


