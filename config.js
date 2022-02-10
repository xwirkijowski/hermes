import dotenv from 'dotenv';
dotenv.config();

const env = process.env;
if (!env.NODE_ENV) env.NODE_ENV = 'development';

const config = {};
config.debug = (env.NODE_ENV === 'development');
config.port = env.PORT;

if (!config.port) throw new Error('Unspecified port, cannot proceed');

config.database = env.MONGOCS || (() => {
	let [user, pass, host, name, opts] = [
		env.DB_USER,
		env.DB_PASS,
		env.DB_HOST,
		env.DB_NAME,
		env.DB_OPTS
	]

	if (user && !pass || !user && pass) throw new Error('Credentials incomplete, cannot proceed');

	if (/(:\|\/\|\?\|#\|\[\|]\|@)/.test(pass)) pass = encodeURIComponent(pass);

	return `mongodb://${(user)?user+':'+pass+'@':''}${host}/${name}${opts}`;
})

export { config, env };