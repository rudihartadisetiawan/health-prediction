"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateHeartInput = exports.validateDiabetesInput = void 0;
const express_validator_1 = require("express-validator");
exports.validateDiabetesInput = [
    (0, express_validator_1.body)('age').isInt({ min: 1, max: 120 }).withMessage('Usia harus antara 1-120 tahun'),
    (0, express_validator_1.body)('gender').isIn(['male', 'female']).withMessage('Gender harus male atau female'),
    (0, express_validator_1.body)('weight').isFloat({ min: 20, max: 300 }).withMessage('Berat harus antara 20-300 kg'),
    (0, express_validator_1.body)('height').isFloat({ min: 50, max: 250 }).withMessage('Tinggi harus antara 50-250 cm'),
    (0, express_validator_1.body)('glucose').isFloat({ min: 0, max: 600 }).withMessage('Glukosa harus antara 0-600 mg/dL'),
    (0, express_validator_1.body)('bloodPressure').isFloat({ min: 0, max: 200 }).withMessage('Tekanan darah harus antara 0-200 mmHg'),
    (0, express_validator_1.body)('insulin').optional().isFloat({ min: 0, max: 1000 }).withMessage('Insulin harus antara 0-1000 µU/mL'),
    (0, express_validator_1.body)('pregnancies').optional().isInt({ min: 0, max: 20 }).withMessage('Kehamilan harus antara 0-20'),
    (0, express_validator_1.body)('familyHistory').isIn(['yes', 'no']).withMessage('Riwayat keluarga harus yes atau no'),
    (0, express_validator_1.body)('physicalActivity').isIn(['rarely', 'sometimes', 'often']).withMessage('Aktivitas fisik harus rarely, sometimes, atau often'),
];
exports.validateHeartInput = [
    (0, express_validator_1.body)('age').isInt({ min: 1, max: 120 }).withMessage('Usia harus antara 1-120 tahun'),
    (0, express_validator_1.body)('gender').isIn(['male', 'female']).withMessage('Gender harus male atau female'),
    (0, express_validator_1.body)('weight').isFloat({ min: 20, max: 300 }).withMessage('Berat harus antara 20-300 kg'),
    (0, express_validator_1.body)('height').isFloat({ min: 50, max: 250 }).withMessage('Tinggi harus antara 50-250 cm'),
    (0, express_validator_1.body)('cholesterol').isFloat({ min: 0, max: 600 }).withMessage('Kolesterol harus antara 0-600 mg/dL'),
    (0, express_validator_1.body)('systolicBP').isFloat({ min: 0, max: 300 }).withMessage('Tekanan darah sistolik harus antara 0-300 mmHg'),
    (0, express_validator_1.body)('maxHeartRate').isFloat({ min: 0, max: 300 }).withMessage('Detak jantung maksimal harus antara 0-300 bpm'),
    (0, express_validator_1.body)('fastingBS').isIn(['yes', 'no']).withMessage('Gula darah puasa harus yes atau no'),
    (0, express_validator_1.body)('chestPainType').isIn(['none', 'atypical', 'typical']).withMessage('Jenis nyeri dada harus none, atypical, atau typical'),
    (0, express_validator_1.body)('smoking').isIn(['never', 'former', 'current']).withMessage('Status merokok harus never, former, atau current'),
    (0, express_validator_1.body)('familyHistory').isIn(['yes', 'no']).withMessage('Riwayat keluarga harus yes atau no'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: 'Validasi gagal',
            errors: errors.array(),
        });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=validation.js.map