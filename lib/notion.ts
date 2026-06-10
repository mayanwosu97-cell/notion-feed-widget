import { Client } from "@notionhq/client";

const apiKey = process.env.NOTION_API_KEY;
const dataSourceId = process.env.NOTION_DATABASE_ID || "";

// Type for a post from Notion
export interface InstagramPost {
  id: string;
  title: string;
  caption?: string;
  imageUrl?: string;
}

// Fetch all posts from the Notion database using dataSources API
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    console.log("Data Source ID:", dataSourceId);
    
    const notion = new Client({
      auth: apiKey,
    });

    // Use dataSources.query() for the new Notion API
  const response = await notion.dataSources.query({

  data_source_id: dataSourceId,

  filter: {
  or: [
    {
      property: "Content Type",
      multi_select: { contains: "Feed Post" },
    },
    {
      property: "Content Type",
      multi_select: { contains: "Feed Graphic" },
    },
    {
      property: "Content Type",
      multi_select: { contains: "Carousel" },
    },
    {
      property: "Content Type",
      multi_select: { contains: "Reel" },
    },
  ],
},

sorts: [
  {
    property: "Publish Date",
    direction: "descending",
  },
],
});
    console.log("Notion response:", response);

    // Transform Notion data source results into our InstagramPost format
    const posts: InstagramPost[] = response.results.map((item: any, idx: number) => {
      // Handle different response formats
      let title = "Untitled";
      let caption = undefined;
      let imageUrl = undefined;

      // If the item has properties (traditional database format)
      if (item.properties) {
        const properties = item.properties;
        
        // Log first item to see structure
        if (idx === 0) {
          console.log("First item properties:", JSON.stringify(properties, null, 2).slice(0, 500));
        }

        // Try to extract title from common column names
        for (const [key, value] of Object.entries(properties)) {
          const propValue = value as any;
          
          // Check if this property contains a title
          if (propValue?.title?.[0]?.plain_text) {
            title = propValue.title[0].plain_text;
            break;
          }
        }

        // If still untitled, try to get it from the URL (backup)
        if (title === "Untitled" && item.url) {
          const urlParts = item.url.split('/').pop()?.split('-');
          if (urlParts && urlParts.length > 0) {
            title = urlParts.slice(0, -1).join(' ');
          }
        }

        // Extract caption from Caption column if it exists
        if (properties.Caption?.rich_text?.[0]?.plain_text) {
          caption = properties.Caption.rich_text[0].plain_text;
        }
        if (properties["Publish Date"]?.date?.start) {
  publishDate = properties["Publish Date"].date.start;
}
console.log("THUMBNAIL PROPERTY:", JSON.stringify(properties.Thumbnail, null, 2));
        // Extract image URL from Thumbnail URL property
if (
  properties.Thumbnail?.url &&
  properties.Thumbnail.url.startsWith("http")
) {
  imageUrl = properties.Thumbnail.url;
}
      
}
      let publishDate = undefined;
      return {
  id: item.id || Math.random().toString(),
  title,
  caption,
  imageUrl,
  publishDate,
};
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}
