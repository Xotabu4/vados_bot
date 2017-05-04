var flatfile = require('flat-file-db'); //https://github.com/mafintosh/flat-file-db


class DataBase {
    constructor() {
        this.db = flatfile.sync('./database.db');
    }

    set_work_date(work_date) {
        this.db.put('last_work_date', {date: work_date})
    }

    get_work_date() {
        let dbEntry = this.db.get('last_work_date')
        return !dbEntry ? 'NO_DATE' : dbEntry.date
    }

    clear() {
        return new Promise((resolve, reject) => {
            this.db.clear(resolve)
        });
    }
}

let database = new DataBase()
module.exports.DB = database