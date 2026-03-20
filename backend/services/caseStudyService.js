const CaseStudy = require('../models/CaseStudy');
const AppError = require('../utils/AppError');

exports.createCaseStudy = async (data) => {
  const caseId = await CaseStudy.create(data);
  return await CaseStudy.findById(caseId);
};

exports.getAllCaseStudies = async () => {
  return await CaseStudy.findAll();
};

exports.getCaseStudyById = async (id) => {
  const caseStudy = await CaseStudy.findById(id);
  if (!caseStudy) {
    throw new AppError('Étude de cas introuvable', 404);
  }
  return caseStudy;
};

exports.updateCaseStudy = async (id, data) => {
  const success = await CaseStudy.update(id, data);
  if (!success) {
    throw new AppError('Étude de cas introuvable ou aucune modification apportée', 404);
  }
  return await CaseStudy.findById(id);
};

exports.deleteCaseStudy = async (id) => {
  const success = await CaseStudy.delete(id);
  if (!success) {
    throw new AppError('Étude de cas introuvable', 404);
  }
  return true;
};
