const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-skip', // name of the command
  description: 'Skip the current song', // description of the command
  usage: '/skip', // usage of the cmd
  category: 'Music', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Skip used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guildId, guild } = interaction;
      const queue = client.distube.getQueue(guildId);
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
            .setColor(client.important.ERR_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          if (queue.songs.length === 1 && queue.autoplay === false) {
            const noskip = new EmbedBuilder()
              .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
              .setColor(client.important.ERR_COLOR)
            return interaction.reply({ embeds: [noskip] }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          await queue.skip();
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Skip song', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription('⏭ | Skipped song!')
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            ]
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`❌ | There is no music currently playing!`)
            .setColor(client.important.MAIN_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`❌ | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            });
          }
          if (queue.songs.length === 1 && queue.autoplay === false) {
            const noskip = new EmbedBuilder()
              .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
              .setColor(client.important.ERR_COLOR)
            return interaction.reply({ embeds: [noskip] })
          }
          await queue.skip();
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Skip song', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription('⏭ | Skipped song!')
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            ]
          })
        }
      } catch (e) {
        console.log(e)
        await interaction.reply({
            embeds:
                [
                    new EmbedBuilder()
                        .setTitle(client.emoji.warning + " Error!")
                        .setDescription("*n error occured!" + `${e}`)
                        .setColor(client.important.ERR_COLOR)
                ],
                ephemeral: true
        })
      }
    } catch (e) {
      console.log(e)
      await interaction.reply({
          embeds:
              [
                  new EmbedBuilder()
                      .setTitle(client.emoji.warning + " Error!")
                      .setDescription("*n error occured!" + `${e}`)
                      .setColor(client.important.ERR_COLOR)
              ],
              ephemeral: true
      })
    }
  }
}