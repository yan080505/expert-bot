import { hearManager } from "../bot.js";
import { Statistics } from "../repository/stat.js";

export function stat_command()
{
    hearManager.hear(/^(?:stat)$/i, async (context) =>
    {
        let stat = Statistics.getStat();
        let message = "Статистика по коммандам\n"
        for (let command of stat.items){
            message+= `\n"${command.name}": количество вызовов - ${command.count}, среднее время вызова - ${command.time}`
        }
        await context.send(message);
        
    });
}