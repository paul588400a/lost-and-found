var mongoCollection = require('../models/mongoCollection');
var uuid = require('uuid');

let foundCollection;

function insertOne(info) {
    return mongoCollection.getFoundCollection.then((collection) => {
        foundCollection = collection;
        info['_id'] = uuid();
        return foundCollection.insertOne(info);
    });
}

function insertCommentById(_id, comment) {
    return mongoCollection.getFoundCollection.then((collection) => {
        foundCollection = collection;
        return foundCollection.update({ '_id': _id },
        {
        $push: { comments: comment }
        }).then((insertedComment)=>{
            return findFoundById(_id);
        })
    });
}

function findFoundById(_id){
    return mongoCollection.getFoundCollection.then((collection)=>{
        return collection.findOne({'_id': _id});
    }).then((found)=>{
        return found;
    }).catch((err)=>{
        throw err;
    });
}

function findFounds(){
    return mongoCollection.getFoundCollection.then((collection)=>{
        return collection.find({}).toArray();
    }).catch((err)=>{
        throw err;
    });
}

function deleteById(id){
    return mongoCollection.getFoundCollection.then((collection)=>{
        return collection.deleteOne({'_id': id});
    }).catch((err)=>{
        throw err;
    });
}

exports.insertOne = insertOne
exports.insertCommentById = insertCommentById;
exports.findFoundById = findFoundById;
exports.findFounds = findFounds;
exports.deleteById = deleteById;