import axios from "axios";
import { MessageWithoutId } from "@/types";

export async function postAMessage({ visible, content, reasons }: MessageWithoutId) {
  return await axios
    .post(`${import.meta.env.VITE_BASE_URL}`, {
      content: content,
      visible: visible,
      reasons: reasons,
    })
    .then(res => {
      return res.data;
    });
}

export async function postModeration(input: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .post(
      `${import.meta.env.VITE_PERSPECTIVE_GOOGLE_URL}/comments:analyze?key=${import.meta.env.VITE_PERSPECTIVE_API_KEY}`,
      {
        comment: {
          text: input,
        },
        languages: ["en", "fr"],
        requestedAttributes: {
          TOXICITY: {
            scoreThreshold: 0.7,
          },
          SEVERE_TOXICITY: {
            scoreThreshold: 0.7,
          },
          IDENTITY_ATTACK: {
            scoreThreshold: 0.7,
          },
          INSULT: {
            scoreThreshold: 0.7,
          },
          PROFANITY: {
            scoreThreshold: 0.7,
          },
          THREAT: {
            scoreThreshold: 0.7,
          },
        },
      },
      config,
    )
    .then(res => {
      console.log(res.data.attributeScores);
      return res.data;
    });
}
