import { hearManager } from "../bot.js";
import { Statistics } from "../repository/stat.js";

export function stat_command() {
    hearManager.hear(/^(?:stat)$/i, async (context) => {
        let stat = Statistics.getStat();
        let message = "Статистика по командам:\n"
        for (let command of stat.items) {
            message += `\n"${command.name}"\n\tКоличество вызовов - ${command.count}\n\tСреднее время вызова - ${Math.round(command.time)} ms`
        }
        await context.send(message);

    });
}