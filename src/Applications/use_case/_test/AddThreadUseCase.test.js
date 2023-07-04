const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Judul Thread',
            body: 'Body Thread',
            owner: 'user-123',
        };

        const mockAddedThread = new AddedThread({
            id: 'thread-123',
            title: 'Judul Thread',
            owner: 'user-123',
        });

        const mockThreadRepository = new ThreadRepository();

        // mockThreadRepository.verifyAvailabilityThread = jest.fn().mockImplementation(() => Promise.resolve());

        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddedThread));
        
        const getThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const addedThread = await getThreadUseCase.execute(useCasePayload);

        // Assert
        expect(addedThread).toStrictEqual(mockAddedThread);
        // expect(mockThreadRepository.verifyAvailabilityThread).toBeCalledWith(useCasePayload.id);
        expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            owner: useCasePayload.owner,
        }));
    });
});
