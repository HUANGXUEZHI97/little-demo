var isPalindrome = function (x) {
  if (x < 0) return false
  let result;
  let Sx = x.toString();
  while (Sx.length > 2) {
    if (Sx.substring(0, 1) !== Sx.substring(Sx.length - 1)) {
      return false
    }
    Sx = Sx.substring(1, Sx.length - 2)
  }
  return true
};

isPalindrome(121)