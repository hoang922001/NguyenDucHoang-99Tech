// The time and space complexity is O(n). This solution will throw error Maximum call stack size exceeded when "n" is bigger.
// Because  each function call is added onto the call stack which takes up memory,
const solution1 = (n) => {
  if (n < 1) return 0;
  return n + solution1(n-1);
}

//This solution uses a while loop, which makes it slightly more efficient than the recursive solution as it only has to do n iterations with constant extra space. 
// Therefore, it has a time complexity of O(n) but a space complexity of O(1).
const solution2 = n => {
  let sum = 0;
  while(n > 0)
    sum += n--
  return sum;
}

// This solution directly calculates the sum using the formula for the sum of an arithmetic series. The time complexity is O(1) and the space complexity is also O(1)
const solution3 = n => {
  return n / 2 * (2 * 1 + (n - 1))
}



const value = 1000

console.log(solution1(value))
console.log(solution2(value))
console.log(solution3(value))

