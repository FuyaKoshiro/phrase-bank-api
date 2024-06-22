import axios from "axios";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";
import {
  Language,
  transcriptSchema,
  VideoDataFromYouTube,
  videoMetaDataSchema,
} from "./youTubeRepositorySchema";
import { z } from "zod";

export async function getTranscript(
  videoId: string,
  language: Language = "en"
) {
  try {
    const data = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: language,
    });
    return z.array(transcriptSchema).parse(data);
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

getTranscript("SO76gUj1coY", "en").then((data) => console.log(data));
