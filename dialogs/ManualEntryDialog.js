const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

class ManualEntryDialog extends ComponentDialog {
    constructor() {
        super('ManualEntryDialog');

        this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.getManualEntryStep.bind(this),
                this.confirmEntryStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async getManualEntryStep(step) {
        const messageText = 'Please enter the material number, plant, and storage location.';
        return await step.prompt('TextPrompt', { prompt: messageText });
    }

    async confirmEntryStep(step) {
        const enteredData = step.result;
        await step.context.sendActivity(`You entered: ${enteredData}`);
        return await step.endDialog(enteredData);
    }
}

module.exports.ManualEntryDialog = ManualEntryDialog;
