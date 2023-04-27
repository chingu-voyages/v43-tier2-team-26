import { format, parse } from 'date-fns';

export const convertTime = time => {
  return format(
    parse(time.split(':', 2).join(':'), 'HH:mm', new Date()),
    'hh:mm a',
  );
};
