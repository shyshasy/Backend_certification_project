// Importer la bibliothèque Twilio en utilisant la syntaxe ECMAScript (import)
import twilio from 'twilio';

const accountSid = 'ACe48146162d384255af8460828bf48407';  // Remplacez par votre Account SID
const authToken = '6d73d2605a66ab72f28f2217bd834186';  // Remplacez par votre Auth Token

// Initialiser le client Twilio
const client = twilio(accountSid, authToken);

// Fonction pour envoyer un message
function sendSms() {
  client.messages
    .create({
      body: 'Bonjour, ceci est un message envoyé via Twilio. Votre tour approche, merci de vous rendre sur place!',
      from: '++12132795621',  // Remplacez par votre numéro Twilio
      to: '+22249900343'     // Remplacez par le numéro du destinataire
    })
    .then(message => {
      console.log('Message envoyé avec succès! SID:', message.sid);
    })
    .catch(error => {
      // Détails de l'erreur pour mieux comprendre l'origine
      console.error('Erreur lors de l\'envoi du message:');
      console.error('Code d\'erreur:', error.code);
      console.error('Message d\'erreur:', error.message);
      console.error('Détails:', error.details);  // Détails supplémentaires de l'erreur
    });
}
// sendMessage.mjs
//  sendSms() 
export default sendSms;
