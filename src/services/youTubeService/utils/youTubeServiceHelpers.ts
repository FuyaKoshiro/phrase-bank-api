import { YouTubeSearchResponse } from "@repositories/youTubeRepository/youTubeRepositorySchema";
import { TransformedYouTubeSearchResponseItem } from "@services/interfaces/IYouTubeService";
import { TranscriptResponse } from "youtube-transcript";
import { z } from "zod";

const VideoIdSchema = z.string().regex(/^\S+$/);

export function validateVideoId(videoId: any) {
  try {
    return VideoIdSchema.parse(videoId);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function transformTranscriptToCaptionType(
  transcripts: TranscriptResponse[]
) {
  return transcripts.map((transcript, index) => {
    const start = Number(transcript.offset.toFixed(1));
    const end = Number((transcript.offset + transcript.duration).toFixed(1));
    return {
      index: index,
      text: transcript.text,
      start: start,
      end: end,
    };
  });
}

export function transformSearchResults(
  response: YouTubeSearchResponse
): TransformedYouTubeSearchResponseItem[] {
  return response.items.map((item) => {
    return {
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.default,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    };
  });
}
