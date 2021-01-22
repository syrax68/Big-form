module.exports = function(api) {
    api.cache(true);
  
    return {
      presets: ['@babel/preset-typescript'],
      ignore: ['node_modules/**/*'],
      extends: 'big-form/babel.config.js',
      env: {
        production: {
          plugins: [
            [
              'module-resolver',
              {
                alias: {
                  '^big-form/src/(.+)': 'big-form/lib/\\1'
                },
                extensions: ['.js', '.jsx','.ts', '.tsx'],
                stripExtensions: ['.js', '.jsx','.ts', '.tsx']
              }
            ],
            [
              'babel-plugin-styled-components',
              {
                ssr: true
              }
            ],
            'syntax-async-functions',
            '@babel/plugin-syntax-dynamic-import',
            'dynamic-import-node'
          ]
        },
        development: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                ssr: true
              }
            ],
            'syntax-async-functions',
            '@babel/plugin-syntax-dynamic-import',
            'dynamic-import-node'
          ]
        }
      }
    };
  };