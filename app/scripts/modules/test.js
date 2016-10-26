const test = ({alpha = 'Alice', bravo = 'Bob'} = {}) =>
  `${alpha} tells ${bravo} the password`;

export default test;
