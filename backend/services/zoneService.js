const Zone = require('../models/Zone');

/**
 * Servicio para la gestión de zonas
 */
class ZoneService {
    /**
     * Obtener todas las zonas
     * @returns {Promise<Array>} Lista de zonas
     */
    async getAllZones() {
        try {
            const zones = await Zone.find();
            return zones;
        } catch (error) {
            throw new Error(`Error al obtener zonas: ${error.message}`);
        }
    }

    /**
     * Crear una nueva zona
     * @param {Object} zoneData - Datos de la zona
     * @returns {Promise<Object>} Zona creada
     */
    async createZone(zoneData) {
        try {
            const { name, description, coordinates } = zoneData;

            const zone = new Zone({
                name,
                description,
                coordinates
            });

            const newZone = await zone.save();
            return newZone;
        } catch (error) {
            throw new Error(`Error al crear la zona: ${error.message}`);
        }
    }

    /**
     * Actualizar una zona existente
     * @param {string} id - ID de la zona
     * @param {Object} zoneData - Datos actualizados de la zona
     * @returns {Promise<Object>} Zona actualizada
     */
    async updateZone(id, zoneData) {
        try {
            const { name, description, coordinates } = zoneData;
            const zone = await Zone.findById(id);
            
            if (!zone) {
                throw new Error('Zona no encontrada');
            }

            zone.name = name;
            zone.description = description;
            zone.coordinates = coordinates;

            const updatedZone = await zone.save();
            return updatedZone;
        } catch (error) {
            throw new Error(`Error al actualizar la zona: ${error.message}`);
        }
    }

    /**
     * Eliminar una zona
     * @param {string} id - ID de la zona
     * @returns {Promise<Object>} Mensaje de confirmación
     */
    async deleteZone(id) {
        try {
            const zone = await Zone.findById(id);
            
            if (!zone) {
                throw new Error('Zona no encontrada');
            }

            await zone.deleteOne();
            return { message: 'Zona eliminada correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar la zona: ${error.message}`);
        }
    }
}

module.exports = new ZoneService();
