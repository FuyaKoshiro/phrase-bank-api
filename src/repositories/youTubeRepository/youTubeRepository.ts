import axios from "axios";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";
import { videoMetaDataSchema } from "./youTubeRepositorySchema";

export async function getTranscript(videoId: string) {
  try {
    return (await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    })) as TranscriptResponse[];
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
    const videoData = {
      videoId: data.items[0].id,
      title: data.items[0].snippet.title,
    };
    return videoData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
