// const { ActivityHandler } = require('botbuilder');
// const { DialogSet } = require('botbuilder-dialogs');

// class QRCodeBot extends ActivityHandler {
//     constructor(conversationState, userState, dialog) {
//         super();
//         if (!conversationState) throw new Error('[QRCodeBot]: Missing parameter. conversationState is required');
//         if (!userState) throw new Error('[QRCodeBot]: Missing parameter. userState is required');
//         if (!dialog) throw new Error('[QRCodeBot]: Missing parameter. dialog is required');

//         this.conversationState = conversationState;
//         this.userState = userState;
//         this.dialog = dialog;

//         // Create a DialogState property in the conversation state
//         this.dialogState = this.conversationState.createProperty('DialogState');

//         // Create a DialogSet to hold the dialogs
//         this.dialogSet = new DialogSet(this.dialogState);
//         this.dialogSet.add(this.dialog);

//         this.onMessage(async (context, next) => {
//             console.log('Running dialog with Message Activity.');

//             // Create dialog context and run the dialog
//             const dialogContext = await this.dialogSet.createContext(context);
//             const result = await dialogContext.continueDialog();
//             if (result.status === 'empty') {
//                 await dialogContext.beginDialog(this.dialog.id);
//             }

//             await next();
//         });

//         this.onMembersAdded(async (context, next) => {
//             const membersAdded = context.activity.membersAdded;
//             for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
//                 if (membersAdded[cnt].id !== context.activity.recipient.id) {
//                     await context.sendActivity('Hello and welcome! How can I assist you today?');
//                 }
//             }
//             await next();
//         });
//     }

//     async run(context) {
//         await super.run(context);
//         await this.conversationState.saveChanges(context, false);
//         await this.userState.saveChanges(context, false);
//     }
// }

// module.exports.QRCodeBot = QRCodeBot;


const { ActivityHandler } = require('botbuilder');
const { DialogSet } = require('botbuilder-dialogs');

class QRCodeBot extends ActivityHandler {
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('[QRCodeBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[QRCodeBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[QRCodeBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;

        // Create a DialogState property in the conversation state
        this.dialogState = this.conversationState.createProperty('DialogState');

        // Create a DialogSet to hold the dialogs
        this.dialogSet = new DialogSet(this.dialogState);
        this.dialogSet.add(this.dialog);

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');

            // Create dialog context and run the dialog
            const dialogContext = await this.dialogSet.createContext(context);
            const result = await dialogContext.continueDialog();
            if (result.status === 'empty') {
                await dialogContext.beginDialog(this.dialog.id);
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    // Send welcome message
                    await context.sendActivity('Hello and welcome! How can I assist you today?');

                    // Begin MainDialog
                    const dialogContext = await this.dialogSet.createContext(context);
                    await dialogContext.beginDialog(this.dialog.id);
                }
            }
            await next();
        });
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.QRCodeBot = QRCodeBot;
