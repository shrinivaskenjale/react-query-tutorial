import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, getPosts } from "./utils/api";

function App() {
  // Access the client
  const queryClient = useQueryClient();

  // ===============
  // Queries - https://tanstack.com/query/latest/docs/react/guides/queries
  // ===============

  // To subscribe to a query in your components or custom hooks, call the useQuery hook with at least:
  // 1. A unique key for the query. Should be array.
  // 2. A function that returns a promise that either resolves the data or throws an error.
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // staleTime: 1000 * 60 * 5, // Sets stale time for individual query
    // refetchInterval: 1000, // Sets interval after which data is refetched.
    // enabled: true, // Sets query should execute or not. Useful if this query should run based on data in previous query.
  });
  // Important properties in result object: isLoading, isError, error, data, status, fetchStatus

  // ===============
  // Mutations - https://tanstack.com/query/latest/docs/react/guides/mutations
  // ===============

  // Call useMutation hook with at least:
  // 1. A function that returns a promise that either resolves the data or throws an error.
  const newPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // Invalidate and refetch the queries with key that starts with specified key.
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    // onSuccess: (data, variables, context) => null,
    // onError: (error, variables, context) => null,
    // onSettled: (data, error, variables, context) => null,
    // onMutate: (variables) => null, // This function runs before mutationFn and returned value is context.
    // retry: 3, // How many retries allowed if query fails. Not recommended to use.
  });
  // 'variables' refers to argument that we pass to mutate().
  // 'data' referes to data returned by query.
  // 'context' refers to data returned by onMutate()

  // mutate() method inside result object calls mutationFn with only first argument.
  // Other properties - data, isLoading, isError, error, status

  // ===============
  // Render logic
  // ===============

  // Handle loading state
  if (postsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }
  // Handle error state
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error.message)}</pre>;
  }
  // Handle success state

  function handleClick() {
    // Only first argument given to mutate method is passed as first argument to mutationFn you specified. So, if you want to pass multiple data, use array or objects.
    // Second argument is configuration object which is optional, where you can specify onError, onSuccess callbacks for this particular mutation.
    newPostMutation.mutate("My new post");
  }

  const renderedPosts = postsQuery.data.map((post) => {
    return (
      <article key={post.id}>
        <h2>{post.title}</h2>
      </article>
    );
  });

  return (
    <div>
      <div>
        <button
          disabled={newPostMutation.isLoading}
          onClick={handleClick}
          type="button"
        >
          Add Post
        </button>
      </div>
      <div>{renderedPosts}</div>
    </div>
  );
}

export default App;

// ===============
// Query Keys - https://tanstack.com/query/latest/docs/react/guides/query-keys
// ===============

// Every separate query should have unique key.
// Caching is based on this array.
// You have to provide exact same array in order to invalidate some query.

// Trick for generating unique keys
// /posts => ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1 => ["posts", {authorId: post.authorId}]
// /posts/2/comments => ["posts", post.id, "comments"]

// ===============
// Points
// ===============

//
//  =>
//

// https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientsetquerydata
//
//
//
//
