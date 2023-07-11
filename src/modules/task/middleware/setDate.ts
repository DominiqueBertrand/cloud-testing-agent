export function setDate(): Date {
  const ts = Date.now();

  const date_time = new Date(ts);
  // const date = date_time.getDate();
  // const month = date_time.getMonth() + 1;
  // const year = date_time.getFullYear();
  // const hours = date_time.getHours();
  // const minutes = date_time.getMinutes();
  // const seconds = date_time.getSeconds();

  return date_time;
}
