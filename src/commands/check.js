import { hearManager } from "../bot.js";
import { getIdsByContext } from "../repository/get_ids_by_context.js";
import { getInfoAboutExperts } from "../repository/get_info_about_experts.js";
import { Statistics } from "../repository/stat.js";


export function check_command() {
    hearManager.hear(/^.?чек(?:\s+?\[id[0-9]+\|[\s\S]+\])?$/i, async (context) => {

        let timeStart = new Date()

        let ids = getIdsByContext(context)

        if (ids.length == 0)
            return context.send({ sticker_id: process.env.STICKER_ID });

        let dataTotal = await getInfoAboutExperts(ids, 'total')
        let dataToday = await getInfoAboutExperts(ids, 'current_day')


        if (dataTotal == null || dataToday == null)
            return context.send('Попробуйте позже');

        let message = '';
        for (let i = 0; i < ids.length; i++) {
            let userTotal = dataTotal[i]
            let userToday = dataToday[i]
            if (userTotal.is_expert == true && userToday.is_expert == false) {
                message += `🧐 ID: @id${userTotal.user_id}\n\t❌ Недавно исключен из экспертов\n\n`
            }
            else if (userTotal.is_expert == false && userToday.is_expert == true) {
                message += `🧐 ID: @id${userTotal.user_id}\n\t✅ Недавно вступил в эксперты\n\t🔥 Тематика: ${userToday.topic_name}\n\t💪 Записей оценено: ${userToday.actions_count}\n\n`
            }
            else if (userTotal.is_expert == true && userToday.is_expert == true) {
                message += `🧐 ID: @id${userTotal.user_id}\n\t🔥 Тематика: ${userToday.topic_name}\n\t🏆 Место в топе: ${userTotal.position}\n\t💪 Записей оценено сегодня: ${userToday.actions_count}\n\n`
            }
            else {
                message += `🧐 ID: @id${userTotal.user_id}\n\t❌ Не эксперт\n\n`
            }
        }
        await context.send(message, { disable_mentions: 1 })

        let timeEnd = new Date()

        Statistics.add("чек", timeEnd - timeStart)
    });

}

