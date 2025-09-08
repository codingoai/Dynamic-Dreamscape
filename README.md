<h1 align="center">Dynamic Dreamscape</h1>

<div align="center">
  <p><strong>Your story, your face, your world.</strong></p>
  <p>An AI-powered application that transforms your selfie into a hero for a personalized, illustrated, and interactive storybook adventure.</p>
</div>

<div align="center">
  <a href="https://ai.studio/apps/drive/1ETakWAtbaXiczFCo3tcopafZ7A-FcX1b">
    <img src="https://img.shields.io/badge/View%20in%20AI%20Studio-007BFF?style=for-the-badge&logo=google&logoColor=white" alt="View in AI Studio"/>
  </a>
</div>
<br>
<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API"/>
</div>

Dynamic Dreamscape is a cutting-edge web application that places you at the heart of an epic tale. By harnessing the powerful multimodal capabilities of Google's Gemini, this app transforms a simple selfie into a fully-realized character within a rich, illustrated storybook. Choose your art style, define your genre, and guide the narrative with your own words to create a truly personalized and interactive adventure.

![Generated Scene Example](https://github.com/user-attachments/assets/70432633-d977-4ef3-80a0-214feb841551)

## ✨ Key Features

- **Selfie-to-Hero Transformation**: Upload a selfie to become the protagonist of your own story.
- **Customizable Aesthetics**: Select from a diverse range of artistic styles (e.g., Graphic Novel, Watercolor, Anime) and story genres (e.g., Sci-Fi, Fantasy, Detective Noir).
- **AI-Powered Character Design**: Generates a consistent, stylized character sheet from your photo, maintaining your core likeness.
- **Dynamic Scene Generation**: Creates a rich, cinematic opening scene that places your character into the chosen story world.
- **Interactive Narrative Control**: Modify the story and visuals with simple text prompts, directing the action and evolving the scene in real-time.
- **Seamless UX**: A clean, intuitive, and fully responsive interface that guides you through the story-creation process.

## 🤖 How It Works

The application employs a sophisticated multi-step generative pipeline powered by the Gemini API:

1.  **Character Sheet Generation**: Upon uploading a selfie and selecting a style/genre, the app sends a detailed prompt to the Gemini API. This prompt instructs the model to act as a concept artist, analyzing the user's facial features and redrawing them as a full-body character in the chosen style, complete with thematic attire. The output is a clean character sheet on a white background.

2.  **Initial Scene Composition**: The generated character sheet is then sent back to the API along with a new prompt. This prompt acts as a scene composer, instructing the model to place the character into a cinematic, wide-shot environment that matches the selected genre. It emphasizes stylistic consistency, natural lighting, and a dynamic pose.

3.  **Iterative Scene Editing**: For each subsequent user request (e.g., "Make it rain"), the current scene image is sent to the API with the new text prompt. The model is constrained to only apply the requested edit, preserving the character's identity and the overall art style, allowing for a continuous and coherent visual narrative.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini API (gemini-2.5-flash-image-preview)
- **Module Management**: ES Modules with Import Maps

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- A Google Gemini API Key. You can get one from [Google AI Studio](https://ai.google.dev/).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd dynamic-dreamscape
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a new file named `.env` in the root of the project and add your Gemini API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 📂 Project Structure

````

.
├── public/               \# Static assets
├── src/
│   ├── components/       \# Reusable React components
│   │   ├── Header.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── Loader.tsx
│   │   ├── StoryCanvas.tsx
│   │   └── StyleSelector.tsx
│   ├── services/         \# API interaction logic
│   │   └── geminiService.ts
│   ├── App.tsx           \# Main application component
│   ├── constants.ts      \# App-wide constants
│   ├── index.tsx         \# Entry point
│   └── types.ts          \# TypeScript type definitions
├── index.html            \# Main HTML file
└── ...                   \# Configuration files

````

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgements

- The [Google Gemini Team](https://ai.google.dev/) for their incredible work on multimodal AI.
- [React](https://react.dev/) and the open-source community.
