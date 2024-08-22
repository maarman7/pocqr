// const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
// const { QRCodeScanner } = require('../services/QRCodeScanner');

// class QRCodeDialog extends ComponentDialog {
//     constructor() {
//         super('QRCodeDialog');

//         this.addDialog(new WaterfallDialog('WaterfallDialog', [
//             this.openCameraStep.bind(this),
//             this.scanQRCodeStep.bind(this)
//         ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async openCameraStep(step) {
//         await step.context.sendActivity('Opening camera to scan QR code...');
//         return await step.next();
//     }

//     async scanQRCodeStep(step) {
//         const scanner = new QRCodeScanner();
//         const scannedData = await scanner.scanQRCode();
//         await step.context.sendActivity(`QR Code scanned: ${scannedData}`);
//         return await step.endDialog(scannedData);
//     }
// }

// module.exports.QRCodeDialog = QRCodeDialog;




const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
const { QRCodeScanner } = require('../services/QRCodeScanner');

class QRCodeDialog extends ComponentDialog {
    constructor() {
        super('QRCodeDialog');

        this.addDialog(new WaterfallDialog('WaterfallDialog', [
            this.openCameraStep.bind(this),
            this.scanQRCodeStep.bind(this)
        ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async openCameraStep(step) {
        await step.context.sendActivity('Opening camera to scan QR code...');
        return await step.next();
    }

    async scanQRCodeStep(step) {
        const scanner = new QRCodeScanner();
        const scannedData = await scanner.scanQRCode();
        await step.context.sendActivity(`QR Code scanned: ${scannedData}`);
        return await step.endDialog(scannedData);
    }
}

module.exports.QRCodeDialog = QRCodeDialog;

