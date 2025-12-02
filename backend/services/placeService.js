const Place = require('../models/Place');

/**
 * Servicio para la gestión de lugares
 */
class PlaceService {
    /**
     * Obtener todos los lugares
     * @returns {Promise<Array>} Lista de lugares
     */
    async getAllPlaces() {
        try {
            const places = await Place.find();
            return places;
        } catch (error) {
            throw new Error(`Error al obtener lugares: ${error.message}`);
        }
    }

    /**
     * Crear un nuevo lugar
     * @param {Object} placeData - Datos del lugar
     * @returns {Promise<Object>} Lugar creado
     */
    async createPlace(placeData) {
        try {
            const { name, description, latitude, longitude } = placeData;

            const place = new Place({
                name,
                description,
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
            });

            const savedPlace = await place.save();
            return savedPlace;
        } catch (error) {
            throw new Error(`Error al crear el lugar: ${error.message}`);
        }
    }

    /**
     * Actualizar un lugar existente
     * @param {string} id - ID del lugar
     * @param {Object} placeData - Datos actualizados del lugar
     * @returns {Promise<Object>} Lugar actualizado
     */
    async updatePlace(id, placeData) {
        try {
            const { name, description, latitude, longitude } = placeData;

            const place = await Place.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                },
                { new: true }
            );

            if (!place) {
                throw new Error('Lugar no encontrado');
            }

            return place;
        } catch (error) {
            throw new Error(`Error al actualizar el lugar: ${error.message}`);
        }
    }

    /**
     * Eliminar un lugar
     * @param {string} id - ID del lugar
     * @returns {Promise<Object>} Mensaje de confirmación
     */
    async deletePlace(id) {
        try {
            const place = await Place.findByIdAndDelete(id);

            if (!place) {
                throw new Error('Lugar no encontrado');
            }

            return { message: 'Lugar eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar el lugar: ${error.message}`);
        }
    }
}

module.exports = new PlaceService();
