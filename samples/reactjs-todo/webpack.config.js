module.exports = (config) => {
  return {
    ...config,
    devtool: 'source-map',
    devServer: {
      ...config.devServer,
      host: 'react.example.com',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'null',
      },
      server: 'https',
      compress: true,
      client: {
        logging: 'none',
        overlay: false,
      },
      port: 8443,
    },
  };
};
