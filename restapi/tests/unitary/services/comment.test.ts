/**
 * Testing the CommentServiceImpl
 */
import {CommentDto} from "../../../src/domain/dtos/CommentDto";
import {Visibility} from "../../../src/domain/Visibility";
import {v4 as generateUUID} from 'uuid';
import {CommentServiceImpl} from "../../../src/business/comment/CommentServiceImpl";

const commentService = new CommentServiceImpl();

function newCommentDto(id: string | undefined,
                       text: string | undefined,
                       place: string | undefined,
                       owner: string | undefined,
                       visibility: Visibility | undefined): CommentDto {
    let c = new CommentDto()
    c.id = id
    c.text = text
    c.place = place
    c.owner = owner
    c.visibility = visibility

    return c;
}

/**
 * Testing the addOwn() method
 */
describe('CommentService.addOwn() -> ', () => {
    test('comment.text == null', async () => {
        let dtoNull = newCommentDto(generateUUID(), undefined, 'place', 'owner', Visibility.PRIVATE);
        expect(await commentService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('comment.place == null', async () => {
        let dtoNull = newCommentDto(generateUUID(), 'text', undefined, 'owner', Visibility.PRIVATE);
        expect(await commentService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('comment.visibility == null', async () => {
        let dtoNull = newCommentDto(generateUUID(), 'text', 'place', 'owner', undefined);
        expect(await commentService.add('sessionId', dtoNull)).toBeFalsy();
    })

    test('comment == OK', async () => {
        let dtoOk = newCommentDto(generateUUID(), 'text', 'place', 'owner', Visibility.PRIVATE);

        // We expect the repository to throw an error
        try {
            await commentService.add('sessionId', dtoOk)
            fail('The user should be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})

/**
 * Testing the findByPlace() method
 */
describe('CommentService.findByPlace() -> ', () => {
    test('sessionId == null, place == null', async () => {
        try {
            await commentService.findByPlace('', '')
            fail('The user must be logged in.')
        } catch (e) {
            expect(e.message).toMatch('The user must be logged in.')
        }
    })
})