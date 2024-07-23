export type BistrosStateType = {
  all: {
    [key: string]: object;
  };
  index: {
    items: string[];
  };
};

export type EmployeesStateType = {
  all: {
    [key: string]: object;
  };
  index: {
    items: string[];
  };
};

export const BISTROS = "bistros";
export const EMPLOYEES = "employees";
