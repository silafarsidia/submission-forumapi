const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUsecase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(useCasePayload) {
        const addThread = new AddThread(useCasePayload);
        return this._threadRepository.addThread(addThread);
    }
}

module.exports = AddThreadUsecase;
