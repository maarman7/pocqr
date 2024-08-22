


// const { ComponentDialog, WaterfallDialog, DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
// const { RemoveOrReturnDialog } = require('./RemoveOrReturnDialog');

// class MainDialog extends ComponentDialog {
//     constructor() {
//         super('MainDialog');

//         this.addDialog(new RemoveOrReturnDialog())
//             .addDialog(new WaterfallDialog('mainWaterfallDialog', [
//                 this.introStep.bind(this),
//                 this.finalStep.bind(this)
//             ]));

//         this.initialDialogId = 'mainWaterfallDialog';
//     }

//     async introStep(step) {
//         // Start the RemoveOrReturnDialog with the correct dialog ID
//         return await step.beginDialog('RemoveOrReturnDialog');
//     }

//     async finalStep(step) {
//         return await step.endDialog();
//     }

//     async run(context, dialogState) {
//         const dialogSet = new DialogSet(dialogState);
//         dialogSet.add(this);

//         const dialogContext = await dialogSet.createContext(context);
//         const result = await dialogContext.continueDialog();

//         if (result.status === DialogTurnStatus.empty) {
//             await dialogContext.beginDialog(this.id);
//         }
//     }
// }

// module.exports.MainDialog = MainDialog;




const { ComponentDialog, WaterfallDialog, ChoicePrompt, TextPrompt } = require('botbuilder-dialogs');
const { RemoveOrReturnDialog } = require('./RemoveOrReturnDialog');
const { RemoveDialog } = require('./RemoveDialog');


class MainDialog extends ComponentDialog {
    constructor() {
        super('MainDialog');

        this.addDialog(new ChoicePrompt('ChoicePrompt'))
            .addDialog(new RemoveOrReturnDialog())
            .addDialog(new RemoveDialog())
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.introStep.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async introStep(step) {
        return await step.prompt('ChoicePrompt', {
            prompt: 'Welcome, how can I help you today? Would you like to remove a material from stock or return an item to stock?',
            choices: ['Remove', 'Return']
        });
    }

    async finalStep(step) {
        if (step.result.value === 'Return') {
            return await step.beginDialog('RemoveOrReturnDialog');
        } else {
            return await step.beginDialog('RemoveDialog');  // Add RemoveDialog in the same way as RemoveOrReturnDialog
        }
    }
}

module.exports.MainDialog = MainDialog;

