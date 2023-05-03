/**
 * Testing the PlaceRepositoryImpl
 */

import {PlaceRepositoryImpl} from "../../../src/repositories/PlaceRepositoryImpl";
import {Visibility} from "../../../src/domain/Visibility";
import {Place} from "../../../src/domain/Place"
import {Category} from "../../../src/domain/Category";

const placeRepository = new PlaceRepositoryImpl();

describe('PlaceRepository.add() -> ', () => {
    test('ok', async () => {
        try {
            await placeRepository.add('sessionId', new Place('id', 'text', 'place', 'owner', 0, 0, Visibility.PRIVATE, Category.MONUMENT))
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findOwn() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findOwn('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findFriend() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findFriend('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findFriendForUser() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findFriendForUser('sessionId', 'user')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findOwnPublic() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findOwnPublic('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findPublic() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findPublic('sessionId', 'webId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findSharedFriends() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findSharedFriends('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PlaceRepository.findAll() -> ', () => {
    test('ok', async () => {

        try {
            await placeRepository.findAll('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})