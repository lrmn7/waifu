const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js') // packages
const { check_if_dj } = require('../../Util/functions')
const weblog = require('../../Config/webhook.json')
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token
})

module.exports = {
  name: 'waifu-about', // name of the command
  description: 'Check about me', // description of the command
  usage: '/waifu-about', // usage of the cmd
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  // inVoiceChannel: true,
  // sameVoice: true,
  options: [
    {
      name: 'abouts',
      description: 'Select the type of about me',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Waifu',
          value: 'waifu'
        },
        {
          name: 'LRMN',
          value: 'LRMN'
        }
      ]
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **About me used by ${interaction.user.tag} from ${interaction.guild.name}**`)
    const { options, members, guild } = interaction
    const abouts_m = options.getString('abouts')
    try {
      if (abouts_m === 'waifu') {
        const bot_about = new EmbedBuilder()
          .setTitle(client.emoji.blank + `${client.user.usernamne} About me!`)
          .setDescription('WaifuMusic is a **Discord music bot** designed to deliver the **highest quality audio** experience to users on the Discord web and app platforms. With WaifuMusic, users can easily play music in voice channels and enjoy crystal clear sound quality.')
          .addFields(
            {
              name: 'Techonology', vallue: "WaifuMusic is a feature-rich Discord music bot developed using **JavaScript** and the **discord.js** library. The bot's functionality is further enhanced through the use of the **Distube** package, which allows it to seamlessly provide music within voice channels on the Discord platform. Additionally, the bot utilizes the Discord API to provide a wide range of features and capabilities."
            }
          )

        interaction.reply({ embeds: [bot_about] })
      } else if (abouts_m === 'LRMN') {
        // bruh
      }
    } catch (e) {
      console.log(e)
      await interaction.reply({
        embeds:
                    [
                      new EmbedBuilder()
                        .setTitle(client.emoji.warning + ' Error!')
                        .setDescription('*n error occured!' + `${e}`)
                        .setColor(client.important.ERR_COLOR)
                    ],
        ephemeral: true
      })
    }
  }
}
