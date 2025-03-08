const fs = require('fs').promises;
const Turndown = require('turndown');
const turndownService = new Turndown();
const { mdToPdf } = require('md-to-pdf');
const config = require('./config');

turndownService.addRule('codeBlocks', {
  filter: ['pre'],
  replacement: (content) => `\`\`\`\n${content}\n\`\`\`\n`,
});

async function saveAsMarkdown(htmlContent, outputPath) {
  const markdown = turndownService.turndown(htmlContent);
  await fs.writeFile(outputPath, markdown);

 
    // Convert to PDF
    const pdf = await mdToPdf(

     { content: markdown }, 
     {
      pdf_options: {
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
      },
      stylesheet: [
        'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css'
      ]
    });

    if (pdf) {
      await fs.writeFile(config.outputFiles.pdf, pdf.content);
      console.log('PDF generated from Markdown!');
    }

  console.log(`Markdown saved to: ${outputPath}`);
}


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function saveDeepSeekChat() {

    console.log(config.chat_url);
    console.log(config.sector);
    console.log(config.chromeOptions.userDataDir);
    console.log(config.chromeOptions.profileName);
    console.log(config.chromeOptions.headless);


  const browser = await puppeteer.launch({
    headless: config.chromeOptions.headless, // Keep visible for debugging
    userDataDir: config.chromeOptions.userDataDir,
    args: [
        `--profile-directory=${config.chromeOptions.profileName}`,
        '--remote-debugging-port=9222'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    // Wait for login to complete
    //await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    // Step 4: Navigate to the chat URL after login
    await page.goto(config.chat_url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Step 5: Wait for chat content to load
//    await page.waitForSelector('.f6004764', { timeout: 60000 });
    const sector = config.sector;
    await page.waitForSelector(sector, { timeout: 60000 });
    const htmlContent = await page.$eval(sector, el => el.innerHTML);
    await saveAsMarkdown(htmlContent, 'chat.md');
    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await require('fs').promises.writeFile('deepseek-chat.pdf', pdfBuffer);
    console.log('PDF saved!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

saveDeepSeekChat();
