let markWeight = 78,
  markHeight = 1.69,
  johnWeight = 92,
  johnHeight = 1.95;

let markBMI = markWeight / markHeight ** 2;
let johnBMI = johnWeight / johnHeight ** 2;

let markHigherBMI = markBMI > johnBMI;

if (markBMI > johnBMI)
  console.log(`Marks BMI (${markBMI}) is higher than John's (${johnBMI})`);
else console.log(`John's BMI (${johnBMI}) is higher than Marks (${markBMI})`);

console.log(markBMI, johnBMI, markHigherBMI);
