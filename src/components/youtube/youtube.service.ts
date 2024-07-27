import { YoutubeTranscript } from "youtube-transcript";
import {
  CaptionObject,
  IYouTubeService,
  TransformedYouTubeSearchResponseItem,
  VideoDataFromYouTube,
} from "./youtube.interface";
import { z } from "zod";
import axios from "axios";
import { convertSpecialCharactersToNormal } from "./../../repositories/youTubeRepository/utils/youTubeRepositoryHelpers";
import {
  transformSearchResults,
  transformTranscriptToCaptionType,
} from "./youtube.helpers";

export class YouTubeService implements IYouTubeService {
  getCaptions = async ({
    videoId,
  }: {
    videoId: string;
  }): Promise<CaptionObject[]> => {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    const parsedTranscript = z.array(transcriptSchema).parse(transcript);
    const parsedDataWithNormalizedText = parsedTranscript.map((transcript) => {
      return {
        ...transcript,
        text: convertSpecialCharactersToNormal(transcript.text),
      };
    });
    const captionObjects = transformTranscriptToCaptionType(
      parsedDataWithNormalizedText
    );

    return captionObjects;
  };

  getVideoData = async ({
    videoId,
  }: {
    videoId: string;
  }): Promise<VideoDataFromYouTube> => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = videoMetaDataSchema.parse(response.data);
    const videoData: VideoDataFromYouTube = {
      videoId: data.items[0].id,
      title: data.items[0].snippet.title,
    };
    return videoData;
  };

  searchVideos = async ({
    searchQuery,
    startIndex,
  }: {
    searchQuery: string;
    startIndex: number;
  }): Promise<TransformedYouTubeSearchResponseItem[]> => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}&maxResults=7`
    );

    const parsedData = youTubeSearchResponseSchema.parse(response.data);
    const parsedDataWithNormalizedText = {
      ...parsedData,
      items: parsedData.items.map((item) => {
        return {
          ...item,
          snippet: {
            ...item.snippet,
            title: convertSpecialCharactersToNormal(item.snippet.title),
            description: convertSpecialCharactersToNormal(
              item.snippet.description
            ),
          },
        };
      }),
    };

    return transformSearchResults(parsedDataWithNormalizedText);
  };
}

const transcriptSchema = z.object({
  text: z.string(),
  duration: z.number(),
  offset: z.number(),
  lang: z.string().optional(),
});

const videoMetaDataSchema = z.object({
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

const thumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const snippetSchema = z.object({
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

const itemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.object({
    kind: z.string(),
    videoId: z.string(),
  }),
  snippet: snippetSchema,
});

const youTubeSearchResponseSchema = z.object({
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
