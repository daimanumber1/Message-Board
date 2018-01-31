const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

function _connectDB() {

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log('连接服务失败')
                reject('serverConnectFailure');
            }
            console.log("成功连上服务");
            const db = client.db(dbName);
            resolve([db, client]);
        });
    })
}
module.exports. insertOne = function (collectionName, json) {
    console.log(typeof json)
    _connectDB().then(([db, client]) => {
        db.collection(collectionName).insertOne(json, function (err, r) {
            if (err) {
                console.log('插入数据失败')
            };
            if (r.insertedCount !== 1) {
                console.log('插入一条数据失败')
            };
            client.close();

            // Insert multiple documents
            // db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
            //   assert.equal(null, err);
            //   assert.equal(2, r.insertedCount);

            //   client.close();
            // });
        });
    })
};

module.exports.updataMany = function (collectionName, json1, json2) {
    _connectDB().then(([db, client]) => {
        const col = db.collection(collectionName);
        col.updateMany(json1, json2, function (err, r) {
            if (err) {
                console.log('update err')
            }
            // console.log(r);
            client.close();
        });
    })
};
module.exports.getAllCount = function (collectionName, callback) {
    // let a = await _connectDB();
    // console.log(a);
    // console.log(typeof a)
    // let b = await a.then(([db, client]) => {
    //     db.collection(collectionName).count({});
    // });
    // let c= b.then((count)=>{
    //     client.close();
    //     return count
    // });
    // console.log(c)

    _connectDB().then(([db, client]) => {
        db.collection(collectionName).count({}).then((count) => {
            client.close();
            callback(count);
        })
    })



    // return _connectDB().then(([db, client]) => {
    //     return db.collection(collectionName).count({}).then((count) => {
    //         // console.log(count)
    //         // return count
    //         client.close();
    //         return count;
    //     });
    // })
};
module.exports.find = function (collectionName, json, callback) {
    _connectDB().then(([db, client]) => {
        let col = db.collection(collectionName);
        skipNumber = json.skipNumber || 0;
        limitNumber = json.limitNumber || 0;
        col.find({}).skip(skipNumber).sort({"_id":-1}).limit(limitNumber).toArray((err, docs) => {
            callback(docs);
            client.close();
        });
    })

}