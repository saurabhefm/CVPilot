import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error("Please set a valid GEMINI_API_KEY in your .env file.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Note: listModels is a method on the genAI instance in newer versions or requires v1 API
    // Actually, in the JS SDK its genAI.getGenerativeModel({ model: "..." }) but listing is usually done via a different client
    // or the REST API. Let's try the REST API style or using the SDK if available.
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (data.models) {
      console.log("Available Gemini Models:");
      data.models.forEach(m => {
        console.log(`- ${m.name.replace('models/', '')} (${m.supportedGenerationMethods.join(', ')})`);
      });
    } else {
      console.log("No models found or error in response:", data);
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();
