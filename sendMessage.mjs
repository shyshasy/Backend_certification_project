// Importer la bibliothèque Twilio en utilisant la syntaxe ECMAScript (import)
import twilio from 'twilio';

const accountSid = 'ACe48146162d384255af8460828bf48407';  // Remplacez par votre Account SID
const authToken = '748105647632d9bc9625a505ba9371ec';  // Remplacez par votre Auth Token

// Initialiser le client Twilio
const client = twilio(accountSid, authToken);

// Fonction pour envoyer un message
function sendSms(msg, telephone) {
  client.messages
    .create({
      body: msg,
      from: '++12132795621',  // Remplacez par votre numéro Twilio
      to: telephone     // Remplacez par le numéro du destinataire
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
