function Places({
  goPrev,
  goNext,
}: {
  goPrev: () => void;
  goNext: () => void;
}) {
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
