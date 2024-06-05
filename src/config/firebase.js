const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'clinica-85dbc.appspot.com'
});

module.exports = admin;
