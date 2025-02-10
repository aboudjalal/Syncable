import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Helper function to delay retries
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const requestCache = new Map(); // Cache requests to avoid duplicate API calls

export const extractSchedule = async (rawText, retries = 3, delayMs = 10000) => {
  if (requestCache.has(rawText)) {
    console.log("🟡 Using cached response for this text.");
    return requestCache.get(rawText);
  }

  const prompt = `
  I have extracted this text from an image/PDF that contains a university class timetable.
  Please analyze the text and return ONLY valid JSON.

  DO NOT return anything except JSON. No explanations, no pre-text.

  Extracted Text:
  ${rawText}

  Expected JSON format:
  {
    "schedule": [
      {
        "course": "Course Name",
        "time": "Start Time - End Time",
        "days": ["Monday", "Wednesday"],
        "location": "Building and Room Number"
      }
    ]
  }
  `;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt + 1}: Sending request to OpenAI...`);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use GPT-3.5 to reduce cost
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      });

      console.log("✅ OpenAI Response:", response);

      const jsonContent = response.choices[0].message.content.trim();
      console.log("📝 Extracted JSON:", jsonContent);

      const parsedData = JSON.parse(jsonContent);
      requestCache.set(rawText, parsedData); // Cache the response
      return parsedData;
    } catch (error) {
      console.error(`❌ Error extracting schedule (Attempt ${attempt + 1}):`, error);

      if (error.status === 429) {
        console.warn(`⏳ Rate Limit Hit - Retrying in ${delayMs / 1000} seconds...`);
        await delay(delayMs);
      } else {
        return null;
      }
    }
  }

  console.error("❌ Failed after multiple attempts.");
  return null;
};
