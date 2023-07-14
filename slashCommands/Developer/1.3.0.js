const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

module.exports = {
    name: 'waifu-update', // name of the command
    description: 'brah', // description of the command
    usage: '/waifu-', // usage of the cmd
    category: 'Developer', // cmd category
    developer: true, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms user to see the cmd 
    userPerms: ['Administrator'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    // inVoiceChannel: true,
    // sameVoice: true,
    options: [], // options string
    execute: async (client, interaction) => {
        try {
            client.channels.cache.get("1058538124533301328").send({
                content: "> @everyone",
                embeds: [
                    new EmbedBuilder()
                    .setTitle("🛑 Update 1.3.0 is here!")
                    .setDescription("🤔 __What's new?__\n\n🔜 **New looks and emoji!!**\n🔜 **Music channel**\n🔜 **PREFIX COMMANDS**\n🔜 **More related anime commands**\n🔜 **Auto Search on slash play!**\n🔜 **Music pickher for prefix!**\n\n<:29:1058537307898122262> __Others__\n\n🔜 **Error Handling**\n🔜 **Fixes typo and errors**\n🔜 **Source code will release soon!**\n🔜 **Docs almost finish**\n\n🔴 That's all for this update, more feature will be added for upcoming updates in the future. **IF YOU ENCOUNTERED AN ERROR/BUG PLEASE REPORT TO US IMMEDIATELY**\n> \`/waifu-bug <bug-here>\`\n🔴 I know what I'm doing and what I'm capable of, WaifuMusic is just a replacement for all the discord music bot that has been shutdown and just wanna bring those lovely memories. Someday WaifuMusic will be needed to stop due to copyright and ToS of the streaming plotforms like YouTube. So before that time came I want to do all the stuff I want to. Thank you everyone!")
                    .setColor(client.important.MAIN_COLOR)
                ]
            })
            interaction.reply('nice')
        } catch (e) {
            console.log(e)
            await interaction.reply({
                embeds:
                    [
                        new EmbedBuilder()
                            .setTitle(client.emoji.warning + " Error!")
                            .setDescription("**Error occured!**" + `${e}`)
                            .setColor(client.important.ERR_COLOR)
                    ],
                ephemeral: true
            })
        }
    }
}