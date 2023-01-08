import { getTotalSubscribers, sendMessage } from "./deps.ts";

try {
  const typescriptCourseTotalSubscribers = await getTotalSubscribers();
  await sendMessage(
    `TypeScript Course subscribers: ${
      typescriptCourseTotalSubscribers.toLocaleString("en-US")
    }`,
  );
} catch (error) {
  console.log("something went wrong ", error);
}
