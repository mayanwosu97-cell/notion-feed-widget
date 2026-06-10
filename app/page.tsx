import { getInstagramPosts } from "@/lib/notion";

export default async function Home() {
  const posts = await getInstagramPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white mb-4">
          Instagram Feed Planner
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
          Plan your feed before it goes live
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
          {posts.length} posts in your feed
        </p>
      </div>

      <div className="flex-1 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">
                No posts yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  {post.imageUrl && post.imageUrl.startsWith("http") ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="block w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-center">
                      <p className="text-gray-600 dark:text-gray-400 font-medium line-clamp-3">
                        {post.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
