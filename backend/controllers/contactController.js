const contactService = require('../services/contactService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseFormatter');

exports.submitContact = catchAsync(async (req, res, next) => {
  const contactId = await contactService.submitContactForm(req.body);
  sendResponse(res, 201, 'Message de contact soumis avec succès', { contactId });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await contactService.getAllContacts();
  sendResponse(res, 200, 'Contacts récupérés avec succès', { contacts });
});

exports.getContactById = catchAsync(async (req, res, next) => {
  const contact = await contactService.getContactById(req.params.id);
  if (!contact) {
    return sendResponse(res, 404, 'Contact introuvable');
  }
  sendResponse(res, 200, 'Contact récupéré avec succès', { contact });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const success = await contactService.deleteContact(req.params.id);
  if (!success) {
    return sendResponse(res, 404, 'Contact introuvable');
  }
  sendResponse(res, 200, 'Contact supprimé avec succès');
});
