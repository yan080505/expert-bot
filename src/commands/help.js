import { hearManager } from "../bot.js";
import { Statistics } from "../repository/stat.js";

export function help_command()
{
    hearManager.hear(/^(?:help|start)$/i, async (context) =>
    {
        let timeStart = new Date()
        await context.send('Hello, world! - 👋🌎🌍🌏');
        let timeEnd = new Date()
        Statistics.add("start", timeEnd - timeStart)
    });
}