import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import {
  Language,
  transcriptSchema,
  VideoDataFromYouTube,
  videoMetaDataSchema,
  youTubeSearchResponseSchema,
} from "./youTubeRepositorySchema";
import { z } from "zod";
import { convertSpecialCharactersToNormal } from "./utils/youTubeRepositoryHelpers";

export async function getTranscript(
  videoId: string,
  language: Language = "en"
) {
  try {
    const data = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: language,
    });
    const parsedData = z.array(transcriptSchema).parse(data);
    const parsedDataWithNormalizedText = parsedData.map((transcript) => {
      return {
        ...transcript,
        text: convertSpecialCharactersToNormal(transcript.text),
      };
    });
    return parsedDataWithNormalizedText;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getVideoData(videoId: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = videoMetaDataSchema.parse(response.data);
    const videoData: VideoDataFromYouTube = {
      videoId: data.items[0].id,
      title: data.items[0].snippet.title,
    };
    return videoData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function searchVideos(searchQuery: string, startIndex: number) {
  try {
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
    return parsedDataWithNormalizedText;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
