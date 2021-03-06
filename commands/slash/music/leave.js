const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("Leave The VC"),

	execute: async (interaction) => {
		const player = interaction.client.player;
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x:|  You need to be in a voice channel to do this!`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `โ | You need to be in the same voice channel as me to do that`,
				ephemeral: true,
			});
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) {
			return interaction.editReply({
				content: `โ | There is nothing playing right now!`,
				ephemeral: true,
			});
		}
		if (queue) {
			if (interaction.guild.me.voice.channel !== undefined) {
				await interaction.guild.me.voice.channel.leave();
				await queue.destroy();
				return await interaction.editReply("๐งช | Successfully left the VC");
			} else {
				return interaction.editReply({
					content: `โ | I am not in a voice channel!`,
					ephemeral: true,
				});
			}
		}
	},
};
