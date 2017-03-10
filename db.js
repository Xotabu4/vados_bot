var flatfile = require('flat-file-db');


// db.on('open', function() {
//     db.put('hello', {world:1});  // store some data 
//     console.log(db.get('hello')) // prints {world:1} 

//     db.put('hey', {world:2}, function() {
//         // 'hey' is now fully persisted 
//     });
// });

class DataBase {
    constructor() {
        this.db = flatfile.sync('./database.db');
    }

    set_work_time(work_time) {
        this.db.put(work_time, {})
    }

    get_all_work_times() {
        return this.db.keys()
    }

    del_work_time(work_time, cb) {
        if (this.db.has(work_time)) {
            this.db.del(work_time, cb)
        }
    }

    clear(cb) {
        this.db.clear(cb)
    }
}

let database = new DataBase()
module.exports.DB = database