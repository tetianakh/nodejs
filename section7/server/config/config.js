const env = process.env.NODE_ENV || 'development';
console.log(`Running in ${env} environment`);


if (env !== 'production'){

  const config = require('./config.json')[env];

  Object.keys(config).forEach(key => {
    process.env[key] = config[key];
  })
}
