const { Events } = require('discord.js');
const db = require('../utils/db');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		try {
			const start = performance.now();
			await client.db.query("SELECT 1");
			const dbPing = Math.round(performance.now() - start);
			console.log(`Ready! Logged in as ${client.user.tag} | Database ping: ${dbPing}ms`);
		} catch (error) {
			console.error('Error occurred while pinging the database:', error);
		}
	},
};
