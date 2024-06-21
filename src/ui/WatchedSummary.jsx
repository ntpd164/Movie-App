const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className=" rounded-xl bg-background-100 px-8 py-8 shadow-sm">
      <h2 className="mb-4 text-4xl">Movies you watched</h2>
      <div className="flex items-center gap-8 text-3xl font-medium">
        <p className="flex gap-4">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex gap-4">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="flex gap-4">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className="flex gap-4">
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
