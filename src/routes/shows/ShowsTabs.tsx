import { useGetShowsByDateQuery } from "../../api/showsApi";

function ShowsTabs() {
  const { isLoading, data } = useGetShowsByDateQuery({
    year: 1970,
    month: 1,
    day: 1,
  });

  if (isLoading) {
    return <div>loading...</div>
  }
  return <div>{data.title}</div>
}

export default ShowsTabs;
