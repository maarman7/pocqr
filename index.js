// const path = require('path');
// const restify = require('restify');
// const { BotFrameworkAdapter, MemoryStorage, UserState, ConversationState } = require('botbuilder');
// const { QRCodeBot } = require('./bots/QRCodeBot');
// const { MainDialog } = require('./dialogs/MainDialog');

// // Load .env file
// require('dotenv').config({ path: path.join(__dirname, '.env') });

// // Create server
// const server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, () => {
//     console.log(`\n${server.name} listening to ${server.url}`);
// });

// // Create adapter
// const adapter = new BotFrameworkAdapter({
//     appId: process.env.MicrosoftAppId,
//     appPassword: process.env.MicrosoftAppPassword
// });

// // Create memory storage
// const memoryStorage = new MemoryStorage();
// const userState = new UserState(memoryStorage);
// const conversationState = new ConversationState(memoryStorage);

// // Create main dialog and bot
// const dialog = new MainDialog();
// const bot = new QRCodeBot(conversationState, userState, dialog);

// // Listen for incoming requests
// // Correct callback-based function handler
// server.post('/api/messages', (req, res, next) => {
//     adapter.processActivity(req, res, async (turnContext) => {
//         await bot.run(turnContext);
//         next(); // Make sure to call next() to pass control to the next middleware
//     });
// });


const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter, MemoryStorage, UserState, ConversationState } = require('botbuilder');
const { QRCodeBot } = require('./bots/QRCodeBot');
const { MainDialog } = require('./dialogs/MainDialog');

// Load .env file
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Create server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Create memory storage
const memoryStorage = new MemoryStorage();
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

// Create main dialog and bot
const dialog = new MainDialog();
const bot = new QRCodeBot(conversationState, userState, dialog);

// Listen for incoming requests
server.post('/api/messages', (req, res, next) => {
    adapter.processActivity(req, res, async (turnContext) => {
        await bot.run(turnContext);
    });
});
