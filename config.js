require('dotenv').config();
const isHeadless = process.argv.includes('--headless');
module.exports = {
  // Required
  chat_url: process.env.CHAT_URL,
  sector: process.env.CHAT_CONTAINER_SELECTOR,
  chatMessageSelector: process.env.CHAT_MESSAGE_SELECTOR,

  // Chrome
  chromeOptions: {
    userDataDir: process.env.CHROME_USER_DATA_DIR,
    profileName: process.env.CHROME_PROFILE_NAME,
    headless: isHeadless
  },

  // Output
  outputFiles: {
    markdown: process.env.OUTPUT_MD_FILE || 'chat.md',
    pdf: process.env.OUTPUT_PDF_FILE || 'chat.pdf'
  },

  // PDF Generation
  pdfOptions: {
    format: 'A4',
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
    stylesheet: process.env.MD_STYLESHEET || ''
  }
};
