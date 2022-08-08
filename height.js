/** height vh and lh css  */
module.exports = [...Array(101).keys()].reduce((prev, i) => {
  prev[`${i}-screen`] = `${i}vh`;
  return prev;
}, {});