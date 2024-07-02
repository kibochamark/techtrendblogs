import { format , formatDistanceToNow } from 'date-fns';

export function timeSince(date: Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}




export function formatDate(timestamp:string) {
  const date = new Date(timestamp);
  const formattedDate = format(date, 'MMMM d, yyyy');
  const timeSince = formatDistanceToNow(date, { addSuffix: false });

  return `${formattedDate} - ${timeSince} read`;
}
