/**
 * Testing the PlaceServiceImpl
 */
import {PlaceDto} from "../../../src/domain/dtos/PlaceDto";
import {Visibility} from "../../../src/domain/Visibility";
import {v4 as generateUUID} from 'uuid';
import {PlaceServiceImpl} from "../../../src/business/place/PlaceServiceImpl";
import {Category} from "../../../src/domain/Category";

const placeService = new PlaceServiceImpl();

function newPlaceDto(id: string | undefined,
                     name: string | undefined,
                     description: string | undefined,
                     latitude: number | undefined,
                     longitude: number | undefined,
                     visibility: Visibility | undefined,
                     category: Category | undefined): PlaceDto {
    let c = new PlaceDto()
    c.id = id
    c.name = name
    c.description = description
    c.latitude = latitude
    c.longitude = longitude
    c.visibility = visibility
    c.category = category

    return c;
}

/**
 * Testing the addOwn() method
 */
describe('PlaceService.addOwn() -> ', () => {
    test('place.name == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            undefined,
            'description',
            10,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull);
            fail('Name cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The name cannot be undefined.')
        }
    })

    test('place.description == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            undefined,
            10,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Description cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The description cannot be undefined.')
        }
    })

    // Latitude

    test('place.latitude == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            undefined,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Latitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The latitude cannot be undefined.')
        }
    })

    test('place.latitude < -90', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            -91,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Latitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The latitude value is out of bounds.')
        }
    })

    test('place.latitude > 90', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            91,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Latitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The latitude value is out of bounds.')
        }
    })

    // Longitude

    test('place.longitude == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            undefined,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Longitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The longitude cannot be undefined.')
        }
    })

    test('place.longitude < -90', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            -91,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Longitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The longitude value is out of bounds.')
        }
    })

    test('place.longitude > 90', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            91,
            Visibility.PRIVATE,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Longitude cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The longitude value is out of bounds.')
        }
    })

    test('place.visibility == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            10,
            undefined,
            Category.MONUMENT);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Visibility cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The visibility cannot be undefined.')
        }
    })

    test('place.category == undefined', async () => {
        let dtoNull = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            10,
            Visibility.PRIVATE,
            undefined);
        try {
            await placeService.add('sessionId', dtoNull)
            fail('Category cannot be undefined')
        } catch (e) {
            expect(e.message).toMatch('The category cannot be undefined.')
        }
    })

    test('place == not existent', async () => {
        let dtoOk = newPlaceDto(
            generateUUID(),
            'name',
            'description',
            10,
            10,
            Visibility.PRIVATE,
            Category.MONUMENT);

        try {
            await placeService.add('sessionId', dtoOk)
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }

        /*
        await placeService.add('sessionId', dtoOk).then(place => {
            expect(place.getId()).toMatch('ERR')
            expect(place.getName()).toMatch('')
            expect(place.getDescription()).toMatch('')
            expect(place.getOwner()).toMatch('')
            expect(place.getId()).toMatch('ERR')
            expect(place.getLatitude()).toBe(0)
            expect(place.getLongitude()).toBe(0)
            expect(place.getVisibility()).toBe(dtoOk.visibility)
            expect(place.getCategory()).toBe(dtoOk.category)
        })
         */
    })
})

/**
 * Testing the findFriendForUser() method
 */
describe('PlaceService.findFriendForUser() -> ', () => {
    test('sessionId == null, user == null', async () => {
        try {
            await placeService.findFriendForUser('', '')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the findFriend() method
 */
describe('PlaceService.findFriend() -> ', () => {
    test('sessionId == null', async () => {
        try {
            await placeService.findFriend('')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})


/**
 * Testing the findPublic() method
 */
describe('PlaceService.findPublic() -> ', () => {
    test('sessionId == null, webId == null', async () => {
        try {
            await placeService.findPublic('', '')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the findOwnPublic() method
 */
describe('PlaceService.findOwnPublic() -> ', () => {
    test('sessionId == null', async () => {
        try {
            await placeService.findOwnPublic('')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the findSharedFriends() method
 */
describe('PlaceService.findSharedFriends() -> ', () => {
    test('sessionId == null', async () => {
        try {
            await placeService.findSharedFriends('')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})
