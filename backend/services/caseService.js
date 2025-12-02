const Case = require('../models/Case');

/**
 * Servicio para la gestión de casos
 */
class CaseService {
    /**
     * Obtener todos los casos
     * @returns {Promise<Array>} Lista de casos
     */
    async getAllCases() {
        try {
            const cases = await Case.find().populate('sourcePlace', 'name');
            return cases;
        } catch (error) {
            throw new Error(`Error al obtener casos: ${error.message}`);
        }
    }

    /**
     * Obtener un caso por ID
     * @param {string} id - ID del caso
     * @returns {Promise<Object>} Caso encontrado
     */
    async getCaseById(id) {
        try {
            const caseItem = await Case.findById(id).populate('sourcePlace', 'name');
            if (!caseItem) {
                throw new Error('Caso no encontrado');
            }
            return caseItem;
        } catch (error) {
            throw new Error(`Error al obtener el caso: ${error.message}`);
        }
    }

    /**
     * Crear un nuevo caso
     * @param {Object} caseData - Datos del caso
     * @returns {Promise<Object>} Caso creado
     */
    async createCase(caseData) {
        try {
            const { disease, caseCount, severity, reportDate, latitude, longitude, status, affectedPopulation, sourcePlace, description } = caseData;

            const newCase = new Case({
                disease,
                caseCount,
                severity,
                reportDate: reportDate || Date.now(),
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                status: status || 'Activo',
                affectedPopulation,
                sourcePlace: sourcePlace || undefined,
                description
            });

            const savedCase = await newCase.save();
            return savedCase;
        } catch (error) {
            throw new Error(`Error al crear el caso: ${error.message}`);
        }
    }

    /**
     * Actualizar un caso existente
     * @param {string} id - ID del caso
     * @param {Object} caseData - Datos actualizados del caso
     * @returns {Promise<Object>} Caso actualizado
     */
    async updateCase(id, caseData) {
        try {
            const { disease, caseCount, severity, reportDate, latitude, longitude, status, affectedPopulation, sourcePlace, description } = caseData;

            const caseItem = await Case.findById(id);

            if (!caseItem) {
                throw new Error('Caso no encontrado');
            }

            caseItem.disease = disease;
            caseItem.caseCount = caseCount;
            caseItem.severity = severity;
            caseItem.reportDate = reportDate;
            caseItem.location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            caseItem.status = status;
            caseItem.affectedPopulation = affectedPopulation;
            caseItem.sourcePlace = sourcePlace || undefined;
            caseItem.description = description;

            const updatedCase = await caseItem.save();
            return updatedCase;
        } catch (error) {
            throw new Error(`Error al actualizar el caso: ${error.message}`);
        }
    }

    /**
     * Eliminar un caso
     * @param {string} id - ID del caso
     * @returns {Promise<Object>} Mensaje de confirmación
     */
    async deleteCase(id) {
        try {
            const caseItem = await Case.findById(id);

            if (!caseItem) {
                throw new Error('Caso no encontrado');
            }

            await caseItem.deleteOne();
            return { message: 'Caso eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar el caso: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de casos agrupadas por enfermedad
     * @returns {Promise<Array>} Estadísticas de casos
     */
    async getCaseStats() {
        try {
            const stats = await Case.aggregate([
                {
                    $group: {
                        _id: '$disease',
                        totalCases: { $sum: '$caseCount' },
                        count: { $sum: 1 }
                    }
                }
            ]);
            return stats;
        } catch (error) {
            throw new Error(`Error al obtener estadísticas: ${error.message}`);
        }
    }
}

module.exports = new CaseService();
