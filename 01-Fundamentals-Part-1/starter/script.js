let firstname = "hasan",
  lastname = "ali";

const info = `Hello, 
my name is ${firstname} ${lastname}`;

// type coercion
let n = 1 + "1";
n -= 1;

let day = "monday";

switch (day) {
  case "monday":
    console.log("monday");
    break;

  case "friday":
    console.log("get ready to pray");
  default:
    console.log("what day is it?");
    break;
}
