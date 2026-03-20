/**
 * Formateur de réponse API standardisé
 */
const sendResponse = (res, statusCode, message, data = null) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  
  const responsePayload = {
    status: isSuccess ? 'succès' : 'échec',
    message,
    data
  };

  res.status(statusCode).json(responsePayload);
};

module.exports = sendResponse;
