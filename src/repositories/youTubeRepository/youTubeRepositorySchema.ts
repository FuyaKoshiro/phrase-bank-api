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
        defaultLanguage: z.string(),
        localized: z.object({
          title: z.string(),
          description: z.string(),
        }),
        defaultAudioLanguage: z.string(),
      }),
    })
  ),
});

export type VideoDataFromYouTube = {
  videoId: string;
  title: string;
}
