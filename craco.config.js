const CracoLessPlugin = require('craco-less');
const cracoAlias = require('craco-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A', '@border-radius-base': '5px' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: cracoAlias,
            options: {
                baseUrl: './src',
                source: 'jsconfig',
            },
        },
    ],
};
