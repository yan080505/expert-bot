import { hearManager } from "../bot.js";
import { getIdsByContext } from "../repository/get_ids_by_context.js";
import { getInfoAboutExpertsC3po } from "../repository/get_info_about_experts_c3po.js";
import { Statistics } from "../repository/stat.js";

export function check_c3po_command() {
    hearManager.hear(/^.?ч(?:\s+?\[id[0-9]+\|[\s\S]+\])?$/i, async (context) => {

        let timeStart = new Date()

        let ids = getIdsByContext(context)

        if (ids.length == 0) {
            return context.send({ sticker_id: process.env.STICKER_ID });
        }

        let data = await getInfoAboutExpertsC3po(ids)

        if (data == null)
            return context.send('Попробуйте позже');

        let message = '';
        for (let i = 0; i < ids.length; i++) {
            let user = data[i]
            if (user.is_expert == true) {
                message += `🧐 ID: @id${user.info.user_id}\n\t🔥 Тематика: ${user.info.topic_name}\n\t🏆 Место в топе: ${user.info.position}\n\t💪 Записей оценено сегодня: ${user.info.actions_current_day}\n\n`
            }
            else {
                message += `🧐 ID: @id${user.info.user_id}\n\t❌ Не эксперт\n\n`
            }
        }
        await context.send(message, { disable_mentions: 1 })

        let timeEnd = new Date()

        Statistics.add("ч", timeEnd - timeStart)
    });
}