const BASE_URL = "http://localhost:8000";

export const CALL_API = async ({
  url,
  body,
  method = "GET",
}: {
  url: string;
  body?: object;
  method?: string;
}) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch(BASE_URL + url, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getTime = (timeStamp: Date | string) => {
  const date =  new Date(timeStamp)
  const currentDate = new Date();
  const _time = date.getTime();
  const _currentTime = currentDate.getTime();
  const minutes = Math.floor((_currentTime - _time) / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 365);
  return years
    ? `${years} year ago`
    : months
    ? `${months} month ago`
    : days
    ? `${days} day ago`
    : hours
    ? `${hours} hours ago`
    : minutes
    ? `${minutes} min ago`
    : "Just now";
};
