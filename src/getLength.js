const getLength = (song) => {
  const mins = Math.floor(song.duration_ms / 60000);
  const secs = ((song.duration_ms % 60000) / 1000).toFixed(0);
  return `${mins}:${secs < 10 ? `0${secs}` : `${secs}`}`;
};

export default getLength;
