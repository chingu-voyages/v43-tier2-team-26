export const convertDate = date => {
  return new Date(date).toLocaleDateString().split('/').reverse().join('/');
};
