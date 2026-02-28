"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../middleware/validation");
const predict_controller_1 = require("../controllers/predict.controller");
const router = (0, express_1.Router)();
router.post('/diabetes', validation_1.validateDiabetesInput, validation_1.handleValidationErrors, predict_controller_1.predictDiabetes);
router.post('/heart', validation_1.validateHeartInput, validation_1.handleValidationErrors, predict_controller_1.predictHeart);
exports.default = router;
//# sourceMappingURL=predict.routes.js.map