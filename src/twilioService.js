// Importer la bibliothèque Twilio en utilisant la syntaxe ECMAScript (import)
import twilio from 'twilio';

// Remplacer ces valeurs par vos informations Twilio
const accountSid = 'ACe48146162d384255af8460828bf48407';  // Remplacez par votre Account SID
const authToken = '6d73d2605a66ab72f28f2217bd834186';  // Remplacez par votre Auth Token

// Initialiser le client Twilio
const client = twilio(accountSid, authToken);

// Envoyer le message
client.messages
  .create({
     body: 'Bonjour, ceci est un message envoyé via Twilio!',  // Le texte du message
     from: '+12132795621',  // Remplacez par votre numéro Twilio
     to: '+22249900343'     // Remplacez par le numéro du destinataire
   })
  .then(message => console.log('Message envoyé avec succès! SID:', message.sid))  // Afficher le SID du message
  .catch(error => console.error('Erreur lors de l\'envoi du message:', error));  // Gérer les erreurs
