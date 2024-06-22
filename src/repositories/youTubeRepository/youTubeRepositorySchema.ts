import { z } from "zod";

export type Language = "en";

export const transcriptSchema = z.object({
  text: z.string(),
  duration: z.number(),
  offset: z.number(),
  lang: z.string().optional(),
});
export type TranscriptType = z.infer<typeof transcriptSchema>;

export const videoMetaDataSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      snippet: z.object({
        publishedAt: z.string(),
        channelId: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnails: z.object({
          default: z.object({
            url: z.string(),
            width: z.number().int(),
            height: z.number().int(),
          }),
          medium: z.object({
            url: z.string(),
            width: z.number().int(),
            height: z.number().int(),
          }),
          high: z.object({
            url: z.string(),
            width: z.number().int(),
            height: z.number().int(),
          }),
          standard: z.object({
            url: z.string(),
            width: z.number().int(),
            height: z.number().int(),
          }),
          maxres: z.object({
            url: z.string(),
            width: z.number().int(),
            height: z.number().int(),
          }),
        }),
        channelTitle: z.string(),
        tags: z.array(z.string()),
        categoryId: z.string(),
        liveBroadcastContent: z.string(),
        // defaultLanguage: z.string(),
        localized: z.object({
          title: z.string(),
          description: z.string(),
        }),
        // defaultAudioLanguage: z.string(),
      }),
    })
  ),
});

export type VideoDataFromYouTube = {
  videoId: string;
  title: string;
};

export const thumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});
export type Thumbnail = z.infer<typeof thumbnailSchema>;

export const snippetSchema = z.object({
  publishedAt: z.string().transform((value) => new Date(value)),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: z.object({
    default: thumbnailSchema,
    medium: thumbnailSchema,
    high: thumbnailSchema,
  }),
  channelTitle: z.string(),
  liveBroadcastContent: z.string(),
  publishTime: z.string().transform((value) => new Date(value)),
});
export type SnippetType = z.infer<typeof snippetSchema>;

export const itemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.object({
    kind: z.string(),
    videoId: z.string(),
  }),
  snippet: snippetSchema,
});
export type ItemType = z.infer<typeof itemSchema>;

export const youTubeSearchResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string(),
  regionCode: z.string(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z.array(itemSchema),
});
export type YouTubeSearchResponse = z.infer<typeof youTubeSearchResponseSchema>;
