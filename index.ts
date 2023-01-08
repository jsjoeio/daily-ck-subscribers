import { getTotalSubscribers, sendMessage } from './deps.ts';

const typescriptCourseTotalSubscribers = await getTotalSubscribers();
await sendMessage(`TypeScript Course subscribers: ${typescriptCourseTotalSubscribers.toLocaleString('en-US')}`);

