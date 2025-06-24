export interface Employee {
  id: string
  name: string
  address: string
  designation: string
}

export type EmployeeData = {
  job: Omit<Employee, 'id'>;
};