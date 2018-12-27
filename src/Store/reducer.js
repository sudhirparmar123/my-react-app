import * as actionTypes from './actions';

const initialState = { 
    Employees:[],
    pageName:''
};
 
// reducer takes tow paramteres state and the action
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.GET_EMP:
            return {
                ...state,
                Employees:action.data
            }
        case actionTypes.ADD_EMP:
            return {
                ...state,
                Employees:action.data
            }
            
        case actionTypes.EDIT_EMP:
            return {
                ...state,
                Employees: state.Employees.map(employee => employee._id === action.data._id ? Employees : employee)
            }
        case actionTypes.CHANGE_HEADER_TITLE:
            return {
                ...state,
                pageName: action.data.pageName
            }
        case actionTypes.DELETE_EMP:
            var newstate = {...state}
            var Employees = newstate.Employees;
            var index = Employees.findIndex(function(o){
                return o._id === action.empID;
            })
            if (index !== -1){          
            //newstate.Employees.splice(index, 1)
            return {
                    Employees: [
                        ...state.Employees.slice(0, index),
                        ...state.Employees.slice(index+ 1)
                    ]
                }
            }
            break;
        default:
            return state;
    }   
}
export default reducer;