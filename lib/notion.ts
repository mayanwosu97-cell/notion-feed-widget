import { Client } from "@notionhq/client";

const apiKey = process.env.NOTION_API_KEY;
const dataSourceId = process.env.NOTION_DATABASE_ID || "";

export interface InstagramPost {
  id: string;
  title: string;
  caption?: string;
  imageUrl?: string;
  publishDate?: string;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const notion = new Client({
      auth: apiKey,
    });

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

    const posts: InstagramPost[] = response.results.map((item: any) => {
      const properties = item.properties;

      let title = "Untitled";
      let caption: string | undefined = undefined;
      let imageUrl: string | undefined = undefined;
      let publishDate: string | undefined = undefined;

      for (const value of Object.values(properties)) {
        const propValue = value as any;

        if (propValue?.title?.[0]?.plain_text) {
          title = propValue.title[0].plain_text;
          break;
        }
      }

      if (properties.Caption?.rich_text?.[0]?.plain_text) {
        caption = properties.Caption.rich_text[0].plain_text;
      }

      if (properties["Publish Date"]?.date?.start) {
        publishDate = properties["Publish Date"].date.start;
      }

      if (
        properties.Thumbnail?.url &&
        properties.Thumbnail.url.startsWith("http")
      ) {
        imageUrl = properties.Thumbnail.url;
      }

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
