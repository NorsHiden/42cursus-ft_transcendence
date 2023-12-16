export const getFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-CA', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};
