/**
 * Testing the CommentRepositoryImpl
 */

import {CommentRepositoryImpl} from "../../../src/repositories/CommentRepositoryImpl";
import {Visibility} from "../../../src/domain/Visibility";
import {Comment} from "../../../src/domain/Comment"

const commentRepository = new CommentRepositoryImpl();

describe('CommentRepository.add() -> ', () => {
    test('ok', async () => {
        try {
            await commentRepository.add('sessionId', new Comment('id', 'text', 'place', 'owner', new Date(), Visibility.PRIVATE))
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('CommentRepository.findByPlace() -> ', () => {
    test('ok', async () => {

        try {
            await commentRepository.findByPlace('sessionId', 'place')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})