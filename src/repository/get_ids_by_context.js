export function getIdsByContext(context) {
    let ids = [context.senderId]
    let match = context.text.match(/\[id([0-9]+?)\|/)
    if (match != null) {
        ids = [match[1]];
    }

    if (context.replyMessage != null)
        ids = [context.replyMessage.senderId];


    if (context.forwards.length != 0) {
        ids = []
        for (let i = 0; i < context.forwards.length; i++) {
            ids.push(context.forwards[i].senderId)
        }
        ids = [... new Set(ids)]
    }

    let temp = [];
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] > 0)
            temp.push(ids[i])
    }
    ids = temp;

    return ids;

}