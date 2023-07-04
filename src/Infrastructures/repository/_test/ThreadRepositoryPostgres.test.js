const ThreadTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        it('should persist add thread', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ 
            id : 'user-123',
            username: 'dicoding',
            password: 'secret_password',
            fullname: 'Dicoding Indonesia', 
            });

            const addThread = new AddThread({
                title: 'Judul Thread',
                body: 'Body Thread',
                owner: 'user-123',
            });
            const fakeIdGenerator = () => '123';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
    
            // Action
            await threadRepositoryPostgres.addThread(addThread);
    
            // Assert
            const thread = await ThreadTableTestHelper.findThreadById('thread-123');
            expect(thread).toHaveLength(1);
        });
    
        it('should return added thread correctly', async () => {
            // Arrange
            const addThread = new AddThread({
                title: 'Judul Thread',
                body: 'Body Thread',
                owner: 'user-123',
            });
            const fakeIdGenerator = () => '123';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
    
            // Action
            const addedThread = await threadRepositoryPostgres.addThread(addThread);
    
            // Assert
            expect(addedThread).toStrictEqual(new AddedThread({
                id: 'thread-123',
                title: 'Judul Thread',
                owner: 'user-123',
            }));
        });
    });
});
