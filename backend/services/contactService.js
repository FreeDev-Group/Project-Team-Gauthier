const Contact = require('../models/Contact');
const sendEmail = require('../utils/emailService');

exports.submitContactForm = async (contactData) => {
  const contactId = await Contact.create(contactData);
  
  // Envoyer une notification par e-mail à l'administrateur (Optionnel selon les besoins)
  try {
    await sendEmail({
      email: process.env.EMAIL_FROM, // Envoyer à l'adresse de l'administrateur
      subject: `Nouvelle demande de contact : ${contactData.subject}`,
      message: `Vous avez un nouveau message de ${contactData.name} (${contactData.email}):\n\n${contactData.message}`
    });
  } catch (error) {
    console.error('L\'envoi de l\'e-mail a échoué, mais le contact a été enregistré dans la base de données :', error);
    // Ne pas lever d'erreur pour permettre à la sauvegarde du contact de réussir même si l'e-mail échoue
  }

  return contactId;
};

exports.getAllContacts = async () => {
  const contacts = await Contact.findAll();
  return contacts;
};

exports.getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

exports.deleteContact = async (id) => {
  const affectedRows = await Contact.delete(id);
  return affectedRows > 0;
};
