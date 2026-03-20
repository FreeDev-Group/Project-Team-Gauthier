const caseStudyService = require('../services/caseStudyService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseFormatter');

exports.createCaseStudy = catchAsync(async (req, res, next) => {
  const studyData = { ...req.body };
  
  if (req.file) {
    studyData.image_url = `/uploads/${req.file.filename}`;
  }

  const caseStudy = await caseStudyService.createCaseStudy(studyData);
  sendResponse(res, 201, 'Étude de cas créée avec succès', { caseStudy });
});

exports.getAllCaseStudies = catchAsync(async (req, res, next) => {
  const caseStudies = await caseStudyService.getAllCaseStudies();
  sendResponse(res, 200, 'Études de cas récupérées avec succès', { caseStudies });
});

exports.getCaseStudyById = catchAsync(async (req, res, next) => {
  const caseStudy = await caseStudyService.getCaseStudyById(req.params.id);
  sendResponse(res, 200, 'Étude de cas récupérée avec succès', { caseStudy });
});

exports.updateCaseStudy = catchAsync(async (req, res, next) => {
  const studyData = { ...req.body };
  
  if (req.file) {
    studyData.image_url = `/uploads/${req.file.filename}`;
  }

  const caseStudy = await caseStudyService.updateCaseStudy(req.params.id, studyData);
  sendResponse(res, 200, 'Étude de cas mise à jour avec succès', { caseStudy });
});

exports.deleteCaseStudy = catchAsync(async (req, res, next) => {
  await caseStudyService.deleteCaseStudy(req.params.id);
  sendResponse(res, 200, 'Étude de cas supprimée avec succès');
});
