const { EmbedBuilder, Collection, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, WebhookClient, ChannelType } = require('discord.js');
const config = require('../../Config/config.json');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.addnrem.id,
    token: weblog.addnrem.token,
});


module.exports = {
    name: 'guildDelete',
    execute: async (guild, client) => {
        try {
            const owner = await guild.fetchOwner()
            // console.log(guild.ownerId)
            let kickembed = new EmbedBuilder()
                .setAuthor({ name: guild.name, iconURL: guild.iconURL() || "https://res.cloudinary.com/lrmn/image/upload/v1685996171/waifumusic_t3pfk9.png" })
                .setThumbnail(guild.iconURL() || "https://res.cloudinary.com/lrmn/image/upload/v1685996171/waifumusic_t3pfk9.png")
                .setColor(client.important.MAIN_COLOR)
                .addFields(
                    {
                        name: 'WaifuMusic',
                        value: `Name: ${guild.name}\n Guild ID: ${guild.id}\n Owner: \`${owner.user.tag}\`\n Description: ${guild.description || "No Description"} `
                    }
                )
                .setFooter({ text: `Left Guild...` });

            wbc.send({ embeds: [kickembed] });
        } catch (e) {
            console.log(e)
        }
    }
}