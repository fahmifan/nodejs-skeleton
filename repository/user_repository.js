const userModel = require('../model/user')
const mongodb = require('mongodb')
const passwordUtil = require('../utils/password')

/**
 * @typedef {import('mongodb').Db} DB
 */

class UserRepository {
    /**
     * @param {DB} db
     */
    constructor(db) {
        this.db = db

        this.create = this.create.bind(this)
        this.findAll = this.findAll.bind(this)
        this.findUserByUsername = this.findUserByUsername.bind(this)
        this.checkUserExists = this.checkUserExists.bind(this)
    }

    async create(user) {
        try {
            const isExists = await this.checkUserExists(user)
            if (isExists) {
                return Promise.reject(new Error('user exists'))
            }
            user.password = passwordUtil.hash(user.password)

            const res = await this.db.collection(userModel.NewUserCollection()).insertOne(user)
            user.id = res.insertedId

            return Promise.resolve(user)
        } catch (err) {
            console.error(err)
            return Promise.reject(err)
        }
    }

    async checkUserExists(user) {
        try {
            const existingUser = await this.findUserByUsername(user.username)
            if (existingUser._id) {
                return true
            }

            return false
        } catch (err) {
            console.error(err)
            return false
        }
    }

    async findAll() {
        try {
            const users = await this.db
                .collection(userModel.NewUserCollection())
                .find({})
                .toArray()

            return Promise.resolve(users.map(u => {
                u.id = u._id
                u.password = ""
                delete u.password

                return u
            }))
        } catch (err) {
            console.error(err)
            return Promise.reject(err)
        }
    }

    async delete(id) {
        try {
            const res = await this.db.collection(userModel.NewUserCollection()).deleteOne({ "_id": mongodb.ObjectID(id) })
            if (res.deletedCount == 0) throw new Error('failed to delete')
            return Promise.resolve()
        } catch (err) {
            console.error(err)
            return Promise.reject(err)
        }
    }

    async findUserByUsername(username) {
        try {
            const user = await this.db.collection(userModel.NewUserCollection()).findOne({ username })
            if (!user) throw new Error('user not found')
            user.id = user._id
            return Promise.resolve(user)
        } catch (err) {
            console.error(err)
            return Promise.reject(err)
        }
    }

    async update(user, id) {
        try {
            const oldUser = await this.db
                .collection(userModel.NewUserCollection())
                .findOne({ _id: mongodb.ObjectID(id) })

            if (!oldUser) throw new Error('user not found')

            const isPasswordChange = !passwordUtil.verify(user.password, oldUser.password)
            if (!user.password || !isPasswordChange) {
                user.password = oldUser.password
            } else if (isPasswordChange) {
                user.password = passwordUtil.hash(user.password)
            }

            await this.db
                .collection(userModel.NewUserCollection())
                .updateOne({_id: mongodb.ObjectID(id)}, { $set: user })

            return Promise.resolve(user)
        } catch (err) {
            console.error(err)
            return Promise.reject(err)
        }
    }
}

module.exports = UserRepository