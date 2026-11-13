const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(path.join(commandsPath, file));
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
	}
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Refreshing ${commands.length} application (/) commands.`);
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
