/**
 * Testing the UserRepositoryImpl
 */

import {UserRepositoryImpl} from "../../../src/repositories/UserRepositoryImpl";
import {Visibility} from "../../../src/domain/Visibility";
import {User} from "../../../src/domain/User"
import {Category} from "../../../src/domain/Category";

const userRepository = new UserRepositoryImpl();

describe('UserRepository.getProfile() -> ', () => {
    test('ok', async () => {
        try {
            await userRepository.getProfile('sessionId', 'webId')
            fail('That session does not exist.')
        } catch (e) {
            expect(e.message).toMatch('Session could not be found.')
        }
    })
})

describe('UserRepository.getFriends() -> ', () => {
    test('ok', async () => {

        try {
            await userRepository.getFriends('sessionId', 'webId')
            fail('That session does not exist.')
        } catch (e) {
            expect(e.message).toMatch('Session could not be found.')
        }
    })
})

describe('UserRepository.isLoggedIn() -> ', () => {
    test('ok', async () => {

        expect(await userRepository.isLoggedIn('sessionId')).toBeFalsy()


    })
})

describe('UserRepository.addFriend() -> ', () => {
    test('ok', async () => {

        try {
            await userRepository.addFriend('sessionId', 'webId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('UserRepository.sharePublicPlaces() -> ', () => {
    test('ok', async () => {

        try {
            await userRepository.sharePublicPlaces('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('UserRepository.getPublicUsers() -> ', () => {
    test('ok', async () => {
        try {
            await userRepository.getPublicUsers('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('Cannot read properties of undefined (reading \'collection\')')
        }
    })
})

describe('UserRepository.getFriendRequests() -> ', () => {
    test('ok', async () => {

        try {
            await userRepository.getFriendRequests('sessionId')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})