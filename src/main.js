function findSecondLargestNumber(arr) {
    let max = -Infinity;
    let secondMax = -Infinity;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        secondMax = max;
        max = arr[i];
      } else if (arr[i] > secondMax && arr[i] !== max) {
        secondMax = arr[i];
      }
    }
    
    return secondMax !== -Infinity ? secondMax : -1;
  }

  function sortNumberChecker(arr) {
    let n = arr.length
    let seen = new Array(n).fill(false)
    for (let i = 0; i < n; i++) {
        let num = arr[i];
        if (num < 1 || num > n || seen[num - 1]) {
          return false;
        }
        seen[num - 1] = true;
      }
      
      return true;
  }
console.log(sortNumberChecker([1,3,4,2,5,6,3]))
console.log(sortNumberChecker([2,3,1,4]))
console.log(sortNumberChecker([2,5,3,4]))


//   console.log(findSecondLargestNumber([2,6,12,7,3,4,19,21,5,6]))