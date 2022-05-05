const getLength = (song) => {
  const mins = Math.floor(song.duration_ms / 60000);
  const secs = ((song.duration_ms % 60000) / 1000).toFixed(0);
  return `${mins}:${secs < 10 ? `0${secs}` : `${secs}`}`;
};

export const getTotalLength = (tracks) => {
  if (!tracks) return;
  console.log(tracks);
  const totalMs = tracks.items.reduce((a, b) => a + b.duration_ms, 0);
  const time = msToTime(totalMs);
  return time;
};

const msToTime = (s) => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;
  if (hrs === 0) return `${mins} min ${secs} sec`;
  return `${hrs} hr ${mins} min`
};

export default getLength;
