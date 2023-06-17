import { useGetRoomByIdQuery } from "../../api/roomsApi";
import { Room } from "./types";

function Places({
  goPrev,
  goNext,
}: {
  goPrev: () => void;
  goNext: () => void;
}) {
  const { data } = useGetRoomByIdQuery(1) as {
    isFetching: boolean;
    data: Room;
  };

  console.log(data);

  return (
    <div>
      <button type="button" onClick={goPrev}>
        prev
      </button>
      places
      <button type="button" onClick={goNext}>
        next
      </button>
    </div>
  );
}

export default Places;
