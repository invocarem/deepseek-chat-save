# Deepseek-chat-save

A Node.js service for convert deepseek chat. The pdf saved contains the thinking.

## Setup

1. Install dependencies:
```bash
   npm install
```
 
2. Create a .env file
   
   You need to set both "CHAT_URL" and "CHAT_CONTAINER_SELECTOR", the block name is the one you found by inspect the block of the chat. The block covers the conversation you want to save to PDF
   
```
CHAT_URL=https://chat.deepseek.com/a/chat/s/[chat-id]
CHAT_CONTAINER_SELECTOR=[block name]

# Chrome Profile (optional)
CHROME_USER_DATA_DIR=C:\Users\[user name]\AppData\Local\Google\Chrome\User Data
CHROME_PROFILE_NAME=[Profile 2]

# Output Files
OUTPUT_MD_FILE=chat.md
OUTPUT_PDF_FILE=chat.pdf

# Styling (optional)
MD_STYLESHEET=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css
```
3 Convert:

Before you convert the deepseek chat, you need kill all Chrome live instances including the one you want to convert.
```
    node main.js
```
