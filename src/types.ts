export interface Employee {
  id: number
  name: string
  address: string
  designation: string
}

export type EmployeeData = {
  job: Omit<Employee, 'id'>;
};