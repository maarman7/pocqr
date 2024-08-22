// class QRCodeScanner {
//     async scanQRCode() {
//         // Simulated scanning process
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve('SampleQRCodeData');
//             }, 1000);
//         });
//     }
// }

// module.exports.QRCodeScanner = QRCodeScanner;




class QRCodeScanner {
    async scanQRCode() {
        // Simulated scanning process
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('SampleQRCodeData');
            }, 1000);
        });
    }
}

module.exports.QRCodeScanner = QRCodeScanner;

