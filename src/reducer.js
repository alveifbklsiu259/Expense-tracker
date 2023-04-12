import transactionsReducer from "./features/transactions/transactionsSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    transactions: transactionsReducer
});

export default rootReducer