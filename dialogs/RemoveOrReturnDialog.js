// const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');
// const { QRCodeDialog } = require('./QRCodeDialog');
// const { ManualEntryDialog } = require('./ManualEntryDialog');

// class RemoveOrReturnDialog extends ComponentDialog {
//     constructor() {
//         super('RemoveOrReturnDialog');

//         this.addDialog(new TextPrompt('TextPrompt'))
//             .addDialog(new QRCodeDialog())
//             .addDialog(new ManualEntryDialog())
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.selectInputMethodStep.bind(this),
//                 this.processInputMethodStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async selectInputMethodStep(step) {
//         const messageText = 'Do you want to scan the QR code for this material or manually enter the required information?';
//         return await step.prompt('TextPrompt', { prompt: messageText });
//     }

//     async processInputMethodStep(step) {
//         const choice = step.result.toLowerCase();

//         if (choice.includes('scan')) {
//             return await step.beginDialog('QRCodeDialog');
//         } else {
//             return await step.beginDialog('ManualEntryDialog');
//         }
//     }
// }

// module.exports.RemoveOrReturnDialog = RemoveOrReturnDialog;


const { ComponentDialog, WaterfallDialog, TextPrompt, ChoicePrompt } = require('botbuilder-dialogs');

class RemoveOrReturnDialog extends ComponentDialog {
    constructor() {
        super('RemoveOrReturnDialog');

        this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(new ChoicePrompt('ChoicePrompt'))
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.askMaterialNumber.bind(this),
                this.askGPID.bind(this),
                this.confirmName.bind(this),
                this.askWorkOrderOrCostCenter.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async askMaterialNumber(step) {
        return await step.prompt('TextPrompt', { prompt: 'How many materials are you removing?' });
    }

    async askGPID(step) {
        step.values.materials = step.result;
        return await step.prompt('TextPrompt', { prompt: 'Thanks. Please enter your GPID' });
    }

    async confirmName(step) {
        step.values.gpid = step.result;
        return await step.prompt('ChoicePrompt', {
            prompt: `Thanks. Are you Carla Cuskelly?`,
            choices: ['Yes', 'No']
        });
    }

    async askWorkOrderOrCostCenter(step) {
        if (step.result.value === 'Yes') {
            return await step.prompt('ChoicePrompt', {
                prompt: 'Would you like to book this material against a work order or a cost center?',
                choices: ['Work Order', 'Cost Center']
            });
        } else {
            await step.context.sendActivity('Name mismatch. Please try again.');
            return await step.endDialog();
        }
    }

    async finalStep(step) {
        const choice = step.result.value;
        if (choice === 'Work Order') {
            await step.context.sendActivity('Your goods movement was successful with a Work Order transaction.');
        } else {
            await step.context.sendActivity('Your goods movement was successful with a Cost Center transaction.');
        }
        return await step.endDialog();
    }
}

module.exports.RemoveOrReturnDialog = RemoveOrReturnDialog;
