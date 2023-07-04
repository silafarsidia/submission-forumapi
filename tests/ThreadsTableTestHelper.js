/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
    // async addUser({
    //     id = 'user-123', username = 'dicoding',
    //     password = 'secret_password',
    //     fullname = 'Dicoding Indonesia',
    // }) {
    //     const query = {
    //         text: 'INSERT INTO users VALUES($1, $2, $3, $4)',
    //         values: [id, username, password, fullname],
    //     };

    //     await pool.query(query);
    // },
    async addThread({
        id = 'thread-123', title = 'Judul Thread', body='Body Thread', owner = 'user-123',
    }) {
        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
            values: [id, title, body, owner],
        };

        await pool.query(query);
    },

    async findThreadById(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM users WHERE 1=1');
    },
};

module.exports = ThreadsTableTestHelper;
