export default function getDate() {
  // Get the current date
  const currentDate = new Date();

  // Extract the date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month starts from 0
  const day = currentDate.getDate();

  // Extract the time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Create a string representation of the date and time
  const dateTimeString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    dateTimeString
  ); // Output format: YYYY-MM-DD HH:MM:SS
}
