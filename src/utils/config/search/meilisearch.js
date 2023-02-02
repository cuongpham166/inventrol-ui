import { MeiliSearch } from 'meilisearch';

const meilisearchCient = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'masterKey',
});

export default meilisearchCient;
