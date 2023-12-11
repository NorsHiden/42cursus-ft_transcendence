const getTimeDiff = (start: Date, end: Date): string => {
  const diffInMs = Math.abs(end.getTime() - start.getTime());
  const diffInSecs = Math.floor(diffInMs / 1000);
  const mins = Math.floor(diffInSecs / 60);
  const secs = diffInSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default getTimeDiff;
