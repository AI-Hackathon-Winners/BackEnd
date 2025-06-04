import axios from 'axios';

export const summarizeText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Missing 'text' in request body." });
    }

    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        message: `Summarize this: ${text}`,
        model: 'command-r', // or 'command-r'
        temperature: 0.3,
        chat_history: []
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = response.data.text;
    res.json({ summary });

  } catch (error) {
    console.error("Cohere API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to summarize", error: error.message });
  }
};








// import { OpenAI } from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// // const openai = new OpenAIApi(config);


// export const summarizeText = async (req, res, next) => {
//   try {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ message: "Missing 'text' in request body" });
//     }

//     const completion = await openai.chat.completions.create({
//       model:  "gpt-3.5-turbo", //  "gpt-3.5-turbo" if needed
//       messages: [
//         {
//           role: "user",
//           content: `Summarize this:\n${text}`
//         }
//       ]
//     });

//     const summary = completion.choices[0].message.content;
//     res.status(200).json({ summary });
//   } catch (error) {
//     console.error("Error summarizing text:", error);
//     next(error);
//   }
// };


// import axios from 'axios';

// export const summarizeText = async (req, res, next) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       return res.status(400).json({ message: "Missing text" });
//     }

//     const response = await axios.post(
//       'https://api.deepseek.com/v1/chat/completions',
//       {
//         model: "deepseek-chat",
//         messages: [
//           {
//             role: "user",
//             content: `Summarize this:\n${text}`
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const summary = response.data.choices[0].message.content;
//     res.status(200).json({ summary });

//   } catch (error) {
//     console.error("Error from DeepSeek:", error.response?.data || error.message);
//     res.status(500).json({ message: "Failed to summarize", error: error.message });
//   }
// };
