const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addThread(addThread) {
        const { title, body, owner } = addThread;
        const id = `thread-${await this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3) RETURNING id, title, owner',
            values: [id, title, owner],
        };

        const result = await this._pool.query(query);

        return new AddedThread({ ...result.rows[0] });
    }
}

module.exports = ThreadRepositoryPostgres;
