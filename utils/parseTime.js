const parseTime = (timeString) => {
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedString = `
  ${month}/${day}/${year} @ ${hour}:${minutes}:${seconds}
  `;

  return formattedString;
};

export default parseTime;
