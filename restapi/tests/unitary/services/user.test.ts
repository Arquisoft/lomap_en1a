/**
 * Testing the UserServiceImpl
 */
import {UserServiceImpl} from "../../../src/business/user/UserServiceImpl";
import {PodManager} from "../../../src/repositories/pods/PodManager";

const userService = new UserServiceImpl();

/**
 * Testing the getProfile() method
 */
describe('UserService.getProfile() -> ', () => {
    test('sessionId == null, webId == OWN', async () => {
        try {
            // Calls sessionManager.getCurrentWebId
            await userService.getProfile('', 'OWN');
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })

    test('sessionId == null, webId == not existent', async () => {
        try {
            // Calls userRepository.getProfile
            await userService.getProfile('', '');
            fail('The user should be logged in.')
        } catch (e) {
        }
    })
})

/**
 * Testing the getFriends() method
 */
describe('UserService.getFriends() -> ', () => {
    test('sessionId == not existent, webId == not existent', async () => {
        try {
            // Calls userRepository.getProfile
            await userService.getFriends('', '');
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('Session could not be found.')
        }
    })
})

/**
 * Testing the isLoggedIn() method
 */
describe('UserService.isLoggedIn() -> ', () => {
    test('sessionId == not existent', async () => {
        // As the repositories are not initialized, it is expected for the method to return false
        expect(await userService.isLoggedIn('')).toBeFalsy()
    })
})

/**
 * Testing the addFriend() method
 */
describe('UserService.addFriend() -> ', () => {
    test('sessionId == not existent', async () => {
        try {
            await userService.addFriend('', '')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the sharePublicPlaces() method
 */
describe('UserService.sharePublicPlaces() -> ', () => {
    test('sessionId == not existent', async () => {
        try {
            await userService.sharePublicPlaces('')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the getPublicUsers() method
 */
describe('UserService.getPublicUsers() -> ', () => {
    test('sessionId == not existent', async () => {
        try {
            await userService.getPublicUsers('')
            fail('A collection cannot be found.')
        }catch(e){
        }
    })
})

/**
 * Testing the getFriendRequests() method
 */
describe('UserService.getFriendRequests() -> ', () => {
    test('sessionId == not existent', async () => {
        try {
            await userService.getFriendRequests('')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

