interface StudentType {
  name: string;
  prn: string;
  phone: string;
  email: string;
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  dob: string;
  address: string;
  branch: string;
  photo: string;
}
const students: StudentType[] = [
  {
    name: "Kajal Gujare",
    email: "kajalgujare@gmail.com",
    prn:" 1910121245001",
    year:1,
    semester:1,
    dob:"04-07-2001",
    address:"At Post Murtijapur",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
  {
    name: "Priyanka Malikar",
    email: "priyankamalikar.com",
    prn:" 1910121245002",
    year:1,
    semester:1,
    dob:"04-09-2001",
    address:"At Post Phandhrkwda",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
  {
    name: "Omprasd Deshmukh",
    email: "omprasddeshmukh@gmail.com",
    prn:" 1910121245003",
    year:1,
    semester:1,
    dob:"04-04-2001",
    address:"At Post Chikhali",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
  {
    name: "Sushant Nirphal",
    email: "susahtnirphal@gmail.com",
    prn:" 1910121245004",
    year:1,
    semester:1,
    dob:"04-07-2001",
    address:"At Post Dharashiv",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
  {
    name: "Sanket Gawande",
    email: "sanketgawande@gmail.com",
    prn:" 1910121245005",
    year:1,
    semester:1,
    dob:"04-07-2001",
    address:"At Post Pusad",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
  {
    name: "Pranv Date",
    email: "pranvdate8788@gmail.com",
    prn:" 1910121245006",
    year:1,
    semester:1,
    dob:"04-07-2001",
    address:"At Post Pune",
    branch:"Computer Engineering",
    photo:"https://avatars.githubusercontent.com/u/84498125?v=4",
    phone:"556555265897"
  },
];

export default students;
