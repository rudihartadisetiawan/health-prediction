"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiabetesPrediction = getDiabetesPrediction;
exports.getHeartPrediction = getHeartPrediction;
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.HUGGINGFACE_API_KEY;
async function queryModel(modelUrl, inputs) {
    try {
        const response = await axios_1.default.post(modelUrl, { inputs }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
            const probabilities = data[0];
            if (Array.isArray(probabilities) && probabilities.length > 1) {
                return probabilities[1] * 100;
            }
        }
        throw new Error('Invalid response format from Hugging Face API');
    }
    catch (error) {
        if (error.code === 'ECONNABORTED' || error.response?.status === 503) {
            throw new Error('Model is loading, please try again later');
        }
        throw new Error(error.response?.data?.error || error.message || 'Failed to query model');
    }
}
async function getDiabetesPrediction(input) {
    const modelUrl = process.env.MODEL_DIABETES_URL || 'https://api-inference.huggingface.co/models/';
    const bmi = input.weight / Math.pow(input.height / 100, 2);
    const features = [
        input.pregnancies || 0,
        input.glucose,
        input.bloodPressure,
        20,
        input.insulin || 0,
        bmi,
        0.5,
        input.age,
    ];
    return await queryModel(modelUrl, features);
}
async function getHeartPrediction(input) {
    const modelUrl = process.env.MODEL_HEART_URL || 'https://api-inference.huggingface.co/models/';
    const sex = input.gender === 'male' ? 1 : 0;
    const chestPain = input.chestPainType === 'typical' ? 1 : input.chestPainType === 'atypical' ? 2 : 0;
    const fastingBS = input.fastingBS === 'yes' ? 1 : 0;
    const features = [
        input.age,
        sex,
        chestPain,
        input.systolicBP,
        input.cholesterol,
        fastingBS,
        0,
        input.maxHeartRate,
        0,
        0,
        0,
        0,
        0,
    ];
    return await queryModel(modelUrl, features);
}
//# sourceMappingURL=huggingface.service.js.map