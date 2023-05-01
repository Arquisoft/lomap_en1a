/**
 * Testing the ScoreServiceImpl
 */
import {ScoreDto} from "../../../src/domain/dtos/ScoreDto";
import {Visibility} from "../../../src/domain/Visibility";
import {v4 as generateUUID} from 'uuid';
import {ScoreServiceImpl} from "../../../src/business/score/ScoreServiceImpl";

const scoreService = new ScoreServiceImpl();

function newScoreDto(id: string | undefined,
                     score: number | undefined,
                     place: string | undefined,
                     owner: string | undefined,
                     visibility: Visibility | undefined): ScoreDto {
    let c = new ScoreDto()
    c.id = id
    c.score = score
    c.place = place
    c.owner = owner
    c.visibility = visibility

    return c;
}

/**
 * Testing the addOwn() method
 */
describe('ScoreService.addOwn() -> ', () => {
    test('score.score == null', async () => {
        let dtoNull = newScoreDto(generateUUID(), undefined, 'place', 'owner', Visibility.PRIVATE);
        expect(await scoreService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('score.place == null', async () => {
        let dtoNull = newScoreDto(generateUUID(), 5, undefined, 'owner', Visibility.PRIVATE);
        expect(await scoreService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('score.visibility == null', async () => {
        let dtoNull = newScoreDto(generateUUID(), 5, 'place', 'owner', undefined);
        expect(await scoreService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('score.score < 0', async () => {
        let dtoNull = newScoreDto(generateUUID(), -1, 'place', 'owner', undefined);
        expect(await scoreService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('score.score > 5', async () => {
        let dtoNull = newScoreDto(generateUUID(), 6, 'place', 'owner', undefined);
        expect(await scoreService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('score == OK', async () => {
        let dtoOk = newScoreDto(generateUUID(), 5, 'place', 'owner', Visibility.PRIVATE);

        // We expect the repository to throw an error
        try {
            await scoreService.add('sessionId', dtoOk)
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the findByPlace() method
 */
describe('ScoreService.findByPlace() -> ', () => {
    test('sessionId == null, place == null', async () => {
        try {
            await scoreService.findByPlace('', '')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})