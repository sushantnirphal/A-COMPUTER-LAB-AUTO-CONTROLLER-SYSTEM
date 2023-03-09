const fs = require("fs");

fs.writeFileSync(
  "./sum.py",
  `total = 0
 
# creating a list
list1 = [11, 5, 17, 18, 23]
 
# Iterate each element in list
# and add them in variable total
for ele in range(0, len(list1)):
    total = total + list1[ele]
 
# printing total value
print("Sum of all elements in given list: ", total)')`
);

setTimeout(() => {
  fs.unlinkSync("./sum.py");
}, 2000);

console.log(fs.readdirSync('./images'))