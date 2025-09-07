
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { ArtStyle, Genre, ImageFile } from './types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash-image-preview';

const fileToGenerativePart = (base64Data: string, mimeType: string): Part => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

const extractImageFromResponse = (response: any): ImageFile | null => {
    if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return {
                    base64: part.inlineData.data,
                    mimeType: part.inlineData.mimeType
                };
            }
        }
    }
    return null;
}

export const generateCharacterSheet = async (
  userImage: ImageFile,
  artStyle: ArtStyle,
  genre: Genre
): Promise<ImageFile> => {
  const imagePart = fileToGenerativePart(userImage.base64, userImage.mimeType);
  const prompt = `
    You are a master character designer and concept artist. Your task is to analyze the primary human subject in the provided reference image and create a consistent, reusable character based on this person for a multi-scene narrative.
    
    **Instructions:**
    1. **Isolate and Analyze:** Identify the key facial features, hair style and color, skin tone, and overall facial structure of the person in the reference image. Your highest priority is to maintain the core identity and likeness of this individual.
    2. **Stylize and Adapt:** Redraw this person as a full-body character in the distinct artistic style of **${artStyle}**. The final output must look like a professional illustration in this style, not a filtered photo.
    3. **Thematic Integration:** The character must be dressed in detailed attire that is thematically appropriate for a **${genre}** setting. The costume design should be creative and fit the world.
    4. **Output Format:** Generate a single, clean character sheet. The character should be depicted from the front in a neutral, standing T-pose. The background must be solid white (#FFFFFF) to facilitate easy compositing in subsequent steps. The final image should be in a vertical portrait orientation.
  `;

  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, textPart] },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });
  
  const generatedImage = extractImageFromResponse(response);

  if (!generatedImage) {
      throw new Error("API did not return a valid image for character sheet.");
  }
  
  return generatedImage;
};

export const generateInitialScene = async (
    characterSheet: ImageFile,
    artStyle: ArtStyle,
    genre: Genre
): Promise<ImageFile> => {
    const characterPart = fileToGenerativePart(characterSheet.base64, characterSheet.mimeType);
    const storyBeat = `Our hero cautiously enters a bustling, neon-lit alien market, their eyes wide with wonder. The setting is a classic ${genre} world.`;
    const prompt = `
        You are a master digital artist and scene composer. Your task is to seamlessly integrate a character into a background environment, ensuring the final composition is stylistically coherent and emotionally resonant with the provided story beat.

        **Character Image (Foreground):** [Attached Character Sheet]
        
        **Instructions:**
        1. **Composition and Placement:** Intelligently place the character from the Character Image into a scene appropriate for the genre "${genre}". The character's position and scale should be natural and believable within the scene's perspective.
        2. **Pose and Expression:** The character's pose and facial expression must directly reflect the action and mood described in the story beat: "${storyBeat}". The pose should be dynamic and the expression clear.
        3. **Lighting and Style Fusion:** Meticulously adjust the lighting on the character to match the ambient light sources, shadows, and color palette of the environment. The character must look like they are truly *in* the scene, not cut and pasted on top. The final composed image must maintain the consistent art style of **${artStyle}**.
        4. **Cinematic Details:** Render the final scene as a photorealistic wide shot, as if captured with a 35mm camera lens to create a cinematic, immersive atmosphere. The overall mood should be one of wonder and discovery, with sharp focus on the character and a slight depth-of-field effect on the distant background.
    `;
    const textPart = { text: prompt };
    
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [characterPart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    const generatedImage = extractImageFromResponse(response);

    if (!generatedImage) {
        throw new Error("API did not return a valid image for the initial scene.");
    }
    
    return generatedImage;
}

export const editScene = async (
  currentScene: ImageFile,
  userCommand: string
): Promise<ImageFile> => {
  const imagePart = fileToGenerativePart(currentScene.base64, currentScene.mimeType);
  const prompt = `
    You are a visual editor. Your task is to modify the provided image based on the user's explicit request.

    **Editing Instruction:** **${userCommand}**

    **Primary Constraint:** Apply only the requested change. Do not alter the core identity of the character or other elements of the scene unless specifically instructed to do so. Preserve the existing art style and composition as much as possible.
  `;
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, textPart] },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  const generatedImage = extractImageFromResponse(response);

  if (!generatedImage) {
      throw new Error("API did not return a valid edited image.");
  }
  
  return generatedImage;
};
