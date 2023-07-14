function loadError(client) {
    const { EmbedBuilder, WebhookClient } = require("discord.js");
    const chalk = require("chalk");
    const ee = require('../Config/embed.json');
    const weblog = require('../Config/webhook.json');
    const wbc = new WebhookClient({
        id: weblog.error.id,
        token: weblog.error.token,
    });
    

    process.on("beforeExit", (code) => {
        
        
        
        wbc.send(`${code}`)
    });
    process.on("exit", (error) => {
        // If You Want You Can Use
        
        
        
        wbc.send(`${error}`)
    });
    process.on("unhandledRejection", async (reason, promise) => {
        // Needed
        
        
        
        wbc.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.important.ERR_COLOR)
                    .setTitle("An Error Occured:")
                    .setDescription(`\`\`\`${reason}\`\`\``)
                    .setTimestamp()
            ]
        })
    });
    process.on("rejectionHandled", (promise) => {
        // If You Want You Can Use
        
        
        
        wbc.send(`${promise}`);
    });
    process.on("uncaughtException", (err, origin) => {
        // Needed
        
        
        
        wbc.send(`${err}, ${origin}`);
    });
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // Needed
        
        
        
        wbc.send(`${err}, ${origin}`);
    });
    process.on("warning", (warning) => {
        // If You Want You Can Use
        
        
        
        wbc.send(`${warning}`);
    });
}

module.exports = { loadError }