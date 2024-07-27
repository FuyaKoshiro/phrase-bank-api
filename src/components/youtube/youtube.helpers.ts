import { TranscriptResponse } from "youtube-transcript";
import { YouTubeSearchResponse } from "./youtube.service";
import { TransformedYouTubeSearchResponseItem } from "./youtube.interface";

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
      thumbnail: item.snippet.thumbnails.high,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    };
  });
}

export function convertSpecialCharactersToNormal(text: string): string {
  let hasSpecialCharacters = true;

  while (hasSpecialCharacters) {
    const originalText = text;
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");

    if (text === originalText) {
      hasSpecialCharacters = false;
    }
  }

  return text;
}
