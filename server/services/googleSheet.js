const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Initialize JWT client for Google Sheets
const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const appendToSheet = async (data) => {
    try {
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
            console.log('Skipping Google Sheet (Missing Credentials)');
            return;
        }

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // First sheet
        await sheet.addRow({
            Name: data.name || 'N/A',
            Phone: data.phone || 'N/A',
            Email: data.email || 'N/A',
            Treatment: data.treatment || 'N/A',
            Branch: data.branch || 'N/A',
            Date: data.date || 'N/A',
            Time: data.time || 'N/A',
            Urgency: data.urgency || 'Normal',
            Address: data.address || 'N/A',
            Message: data.message || 'N/A',
            SubmittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        });
        console.log('Appended to Google Sheet');
    } catch (error) {
        console.error('Google Sheet Error:', error);
    }
};

module.exports = appendToSheet;
