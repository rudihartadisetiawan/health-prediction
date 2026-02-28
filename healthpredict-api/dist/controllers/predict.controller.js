"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictDiabetes = predictDiabetes;
exports.predictHeart = predictHeart;
const ml_service_1 = require("../services/ml.service");
const scoring_service_1 = require("../services/scoring.service");
async function predictDiabetes(req, res) {
    try {
        const data = req.body;
        let result;
        try {
            result = await (0, ml_service_1.getDiabetesPrediction)(data);
        }
        catch (error) {
            console.log('ML service unavailable, using fallback:', error.message);
            result = (0, scoring_service_1.calculateDiabetesRisk)(data);
        }
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat memproses prediksi',
        });
    }
}
async function predictHeart(req, res) {
    try {
        const data = req.body;
        let result;
        try {
            result = await (0, ml_service_1.getHeartPrediction)(data);
        }
        catch (error) {
            console.log('ML service unavailable, using fallback:', error.message);
            result = (0, scoring_service_1.calculateHeartRisk)(data);
        }
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat memproses prediksi',
        });
    }
}
//# sourceMappingURL=predict.controller.js.map