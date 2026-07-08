// this is what one student looks like in our app
// basically the shape of the data we get from the backend
export interface Student {
  _id?: string; // mongo gives this id, only exists after its saved
  name: string;
  studentId: string;
  course: string;
  grade: number;
}
