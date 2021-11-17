import { hearManager } from "../bot.js";

export function ping_command()
{
    hearManager.hear(/^(?:ping|test)$/i, async (context) =>
    {
        let timeStart = new Date()
        await context.send('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
        let timeEnd = new Date()
        context.send(`Ping: ${timeEnd - timeStart} ms`);
    });
}