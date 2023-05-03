/**
 * Testing the ScoreRepositoryImpl
 */

import {ScoreRepositoryImpl} from "../../../src/repositories/ScoreRepositoryImpl";
import {Visibility} from "../../../src/domain/Visibility";
import {Score} from "../../../src/domain/Score"

const scoreRepository = new ScoreRepositoryImpl();

describe('ScoreRepository.add() -> ', () => {
    test('ok', async () => {
        try {
            await scoreRepository.add('sessionId', new Score('id', 4, 'place', 'owner', new Date(), Visibility.PRIVATE))
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('ScoreRepository.findByPlace() -> ', () => {
    test('ok', async () => {

        try {
            await scoreRepository.findByPlace('sessionId', 'place')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})