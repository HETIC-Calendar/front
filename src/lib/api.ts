const apiUrl = import.meta.env.VITE_API_URL;

const fetchApi = async (route: string) => {
  const response = await fetch(`${apiUrl}/${route}`);
  const data = await response.json();
  return data;
};

export const fetchRooms = async () => {
  const result = await fetchApi("rooms");
  return result.rooms;
};
