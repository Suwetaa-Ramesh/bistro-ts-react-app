import bistrosReducer from "./bistroSlice";
import employeesReducer from "./employeeSlice";
import { BistrosStateType, EmployeesStateType } from "./types";

export type StateType = {
  // Reducers types here
  bistros: BistrosStateType;
  employees: EmployeesStateType;
};

const rootReducers = {
  // Reducers here
  bistros: bistrosReducer,
  employees: employeesReducer,
};

export default rootReducers;
