/**
 * Testing the PictureRepositoryImpl
 */

import {PictureRepositoryImpl} from "../../../src/repositories/PictureRepositoryImpl";
import {Visibility} from "../../../src/domain/Visibility";
import {Picture} from "../../../src/domain/Picture"

const pictureRepository = new PictureRepositoryImpl();

describe('PictureRepository.add() -> ', () => {
    test('ok', async () => {
        try {
            await pictureRepository.add('sessionId', new Picture('id', 'text', 'place', 'owner', new Date(), Visibility.PRIVATE))
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

describe('PictureRepository.findByPlace() -> ', () => {
    test('ok', async () => {

        try {
            await pictureRepository.findByPlace('sessionId', 'place')
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})