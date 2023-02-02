import meilisearchCient from 'utils/config/search/meilisearch';

export const getAllIndex = async () => {
    try {
        let result = await meilisearchCient.getIndexes();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const createIndex = async (indexName) => {
    try {
        await meilisearchCient.createIndex(indexName, { primaryKey: 'id' });
    } catch (error) {
        console.error(error);
    }
};

export const getAllStats = async () => {
    try {
        let result = await meilisearchCient.getStats();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const getHealth = async () => {
    try {
        let result = await meilisearchCient.health();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const updateDocument = async (index, documents) => {
    try {
        await meilisearchCient.index(index).addDocuments(documents);
    } catch (error) {
        console.error(error);
    }
};
