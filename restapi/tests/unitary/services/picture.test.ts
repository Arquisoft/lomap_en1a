/**
 * Testing the PictureServiceImpl
 */
import { PictureDto } from "../../../src/domain/dtos/PictureDto";
import { Visibility } from "../../../src/domain/Visibility";
import { v4 as generateUUID } from "uuid";
import { PictureServiceImpl } from "../../../src/business/picture/PictureServiceImpl";

const pictureService = new PictureServiceImpl();

function newPictureDto(
  id: string | undefined,
  url: string | undefined,
  place: string | undefined,
  owner: string | undefined,
  visibility: Visibility | undefined
): PictureDto {
  let c = new PictureDto();
  c.id = id;
  c.url = url;
  c.place = place;
  c.owner = owner;
  c.visibility = visibility;

  return c;
}

/**
 * Testing the addOwn() method
 */
describe("PictureService.addOwn() -> ", () => {
  test("picture.url == null", async () => {
    let dtoNull = newPictureDto(
      generateUUID(),
      undefined,
      "place",
      "owner",
      Visibility.PRIVATE
    );
    expect(await pictureService.add("sessionId", dtoNull)).toBeFalsy();
  });

  test("picture.place == null", async () => {
    let dtoNull = newPictureDto(
      generateUUID(),
      "text",
      undefined,
      "owner",
      Visibility.PRIVATE
    );
    expect(await pictureService.add("sessionId", dtoNull)).toBeFalsy();
  });

  test("picture.visibility == null", async () => {
    let dtoNull = newPictureDto(
      generateUUID(),
      "text",
      "place",
      "owner",
      undefined
    );
    expect(await pictureService.add("sessionId", dtoNull)).toBeFalsy();
  });

  test("picture == OK", async () => {
    let dtoOk = newPictureDto(
      generateUUID(),
      "text",
      "place",
      "owner",
      Visibility.PRIVATE
    );

    // We expect the repository to throw an error
    try {
      await pictureService.add("sessionId", dtoOk);
      fail("The user should be logged in.");
    } catch (e) {
      expect(e.message).toMatch("The user must be logged in.");
    }
  });
});

// /**
//  * Testing the findOwn() method
//  */
// describe('PictureService.findOwn() -> ', () => {
//     test('sessionId == null, user == null', async () => {
//         try {
//             await pictureService.findOwn('', '')
//             fail('The user must be logged in.')
//         } catch (e) {
//             expect(e.message).toMatch('The user must be logged in.')
//         }
//     })
// })

/**
 * Testing the findByPicture() method
 */
describe("PictureService.findByPicture() -> ", () => {
  test("sessionId == null, picture == null", async () => {
    try {
      await pictureService.findByPlace("", "");
      fail("The user must be logged in.");
    } catch (e) {
      expect(e.message).toMatch("The user must be logged in.");
    }
  });
});
