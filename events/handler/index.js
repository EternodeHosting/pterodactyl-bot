const bot = require("../../index");
const {Colors} = require("discord.js");

bot.on('interactionCreate', async (interaction) => {
    // Slash Command Handling
    if (interaction.type == 2) {
        const cmd = bot.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Une erreur est survenue !" });
        if(interaction.channel.type == 1) return interaction.reply({content: 'Tu ne peux pas effectuer cette commande en mp !', ephemeral: true});
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 1) {
                if (option.name){
                    args.push(option.name);
                }
                option.options?.forEach((x) => {
                    if (x.value){
                        args.push(x.value);
                    }
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(bot, interaction, args);
    }
});