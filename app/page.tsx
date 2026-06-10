import { getInstagramPosts } from "@/lib/notion";
export const dynamic = "force-dynamic";
export default async function Home() {
  const posts = await getInstagramPosts();

 return (
  <div className="min-h-screen bg-white dark:bg-black">
    <div className="flex flex-col items-center justify-center py-4 px-2">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-2">
        PDF CHANNEL GRID PLANNER
      </h1>

      <div className="w-full flex justify-end mb-2">
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-gray-500">
            {new Date().toLocaleString()}
          </p>

          <a
            href="/"
            className="px-2 py-1 text-[10px] rounded bg-gray-800 hover:bg-gray-700 text-white"
          >
            Refresh
          </a>
        </div>
      </div>

      <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
        UPCOMING FEED
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
        {posts.length} posts in your feed
      </p>
   <div className="w-full px-2 pb-4">
  {posts.length === 0 ? (
    <div className="text-center py-16">
      <p className="text-gray-500 dark:text-gray-400">
        No posts yet.
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  {post.imageUrl && post.imageUrl.startsWith("http") ? (
  <>
    <img
      src={post.imageUrl}
      alt={post.title}
      className="block w-full h-full object-cover"
    />

    {post.publishDate && (
 <div className="absolute bottom-1 left-1 right-1">
  <div className="bg-black/70 text-white text-[18px] px-2 py-1 rounded text-center font-medium">
    {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : ""}
  </div>
</div>
    )}
  </>
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
