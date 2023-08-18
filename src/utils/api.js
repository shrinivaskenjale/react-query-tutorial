import { wait } from "./wait";

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

export async function getPosts(queryData) {
  // You can access data related to query using single argument passed by RQ automatically to queryFn.
  // console.log(queryData.queryKey);
  await wait(1000);
  // throw new Error("Error encounterd at server.");
  return [...posts];
}

export async function addPost(title, other) {
  console.log(title, other);
  await wait(1000);
  posts.push({ id: crypto.randomUUID(), title });
  // return posts;
}
