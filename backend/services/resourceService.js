const Resource = require('../models/Resource');

/**
 * Servicio para la gestión de recursos
 */
class ResourceService {
    /**
     * Obtener todos los recursos
     * @returns {Promise<Array>} Lista de recursos
     */
    async getAllResources() {
        try {
            const resources = await Resource.find().populate('placeId', 'name');
            return resources;
        } catch (error) {
            throw new Error(`Error al obtener recursos: ${error.message}`);
        }
    }

    /**
     * Obtener un recurso por ID
     * @param {string} id - ID del recurso
     * @returns {Promise<Object>} Recurso encontrado
     */
    async getResourceById(id) {
        try {
            const resource = await Resource.findById(id).populate('placeId', 'name');
            if (!resource) {
                throw new Error('Recurso no encontrado');
            }
            return resource;
        } catch (error) {
            throw new Error(`Error al obtener el recurso: ${error.message}`);
        }
    }

    /**
     * Crear un nuevo recurso
     * @param {Object} resourceData - Datos del recurso
     * @returns {Promise<Object>} Recurso creado
     */
    async createResource(resourceData) {
        try {
            const { resourceType, quantity, latitude, longitude, status, placeId, criticalLevel, notes } = resourceData;

            const newResource = new Resource({
                resourceType,
                quantity,
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                status: status || 'Disponible',
                placeId,
                criticalLevel: criticalLevel || 10,
                notes,
                lastUpdated: Date.now()
            });

            const savedResource = await newResource.save();
            return savedResource;
        } catch (error) {
            throw new Error(`Error al crear el recurso: ${error.message}`);
        }
    }

    /**
     * Actualizar un recurso existente
     * @param {string} id - ID del recurso
     * @param {Object} resourceData - Datos actualizados del recurso
     * @returns {Promise<Object>} Recurso actualizado
     */
    async updateResource(id, resourceData) {
        try {
            const { resourceType, quantity, latitude, longitude, status, placeId, criticalLevel, notes } = resourceData;

            const resource = await Resource.findById(id);

            if (!resource) {
                throw new Error('Recurso no encontrado');
            }

            resource.resourceType = resourceType;
            resource.quantity = quantity;
            resource.location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            resource.status = status;
            resource.placeId = placeId;
            resource.criticalLevel = criticalLevel;
            resource.notes = notes;
            resource.lastUpdated = Date.now();

            const updatedResource = await resource.save();
            return updatedResource;
        } catch (error) {
            throw new Error(`Error al actualizar el recurso: ${error.message}`);
        }
    }

    /**
     * Eliminar un recurso
     * @param {string} id - ID del recurso
     * @returns {Promise<Object>} Mensaje de confirmación
     */
    async deleteResource(id) {
        try {
            const resource = await Resource.findById(id);

            if (!resource) {
                throw new Error('Recurso no encontrado');
            }

            await resource.deleteOne();
            return { message: 'Recurso eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar el recurso: ${error.message}`);
        }
    }

    /**
     * Obtener recursos críticos (por debajo del nivel crítico)
     * @returns {Promise<Array>} Lista de recursos críticos
     */
    async getCriticalResources() {
        try {
            const criticalResources = await Resource.find({
                $expr: { $lte: ['$quantity', '$criticalLevel'] }
            }).populate('placeId', 'name');
            return criticalResources;
        } catch (error) {
            throw new Error(`Error al obtener recursos críticos: ${error.message}`);
        }
    }
}

module.exports = new ResourceService();
