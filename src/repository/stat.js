import fs from "fs"
import { fileURLToPath } from 'url';
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../stat.json')

let stat = {
    items: []
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    let content = JSON.parse(data);
    if (Object.keys(content).length != 0)
        stat = content
});

setInterval(function () {
    fs.writeFile(filePath, JSON.stringify(stat), err => {
        if (err) {
            console.error(err)
            return
        }
    })
}, 600000)

export class Statistics {

    static add(name, time) {
        let i = this._getIndex(name)
        if (i == null) {
            stat.items.push({ name: name, count: 1, time: time })
        }
        else {
            stat.items[i].time = (stat.items[i].time * stat.items[i].count + time) / (stat.items[i].count + 1)
            stat.items[i].count += 1
        }
    }

    static getStat() {
        return stat
    }

    static _getIndex(name) {
        for (let i = 0; i < stat.items.length; i++) {
            if (stat.items[i].name == name)
                return i
        }
        return null
    }
}
