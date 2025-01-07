# Socail Media Anaylsis Using Langflow

## Langflow Workflow
![image](https://github.com/user-attachments/assets/1fc9e756-b549-45d2-a5b7-a0213c702e5d)

## Backend Repo
URL : https://github.com/Tarunnagpal7/LangflowBackend


## Overview

The `ChatBox` component is a dynamic React-based chat interface that integrates real-time message handling, error handling, and the ability to render complex data responses such as graphs and tables. It allows users to interact with a bot-like system, sending messages and receiving data in various formats. The component also processes and displays graphs (e.g., bar/line charts) or tables based on the bot's response data, making it ideal for applications that require rich, interactive chat interfaces with dynamic content.

## Features

- **Real-Time User Interaction**: Users can type messages and send them to the bot with real-time updates.
- **Error Handling**: Catches and displays errors if the API call fails.
- **Auto Scroll**: Automatically scrolls to the bottom as new messages arrive.
- **Graph Rendering**: Supports rendering bar or line charts from bot responses that contain JSON data.
- **Table Display**: Can display tables from formatted text responses with pipe (`|`) characters.
- **Markdown Support**: Supports text formatting, such as bold text wrapped in `**` or `***`.

## Installation

To integrate the `ChatBox` component into your project, follow the steps below:

    1. Install the required dependencies by running:

      npm install recharts lucide-react

    2. Import the ChatBox component into your React application:
    
      import ChatBox from './ChatBox';

    3.Use the component in your JSX code like so:

      <ChatBox />


## .env variables

The frontend of the application uses environment variables (EBV) to manage various configurations such as the backend API URL and build settings. Please create a `.env` file in the root directory of the frontend project and set the following environment variables:

- `VITE_API_URL`: The URL of the backend API for handling chat requests.

Example `.env` file:


## Usage

 `The ChatBox component accepts the following properties:`

- `messages:` A list of messages exchanged between the user and the bot.
- `input:` A string representing the current text input.
- `isSending:` A boolean that indicates whether the system is currently sending a message.
- `error:` A string that holds error messages from API calls.




## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the repository.**

2. **Create a new branch for your feature:**

   ```bash
   git checkout -b feature-name
   git commit -m "Add feature description"
   git push origin feature-name

3. **Open a Pull Request.**


