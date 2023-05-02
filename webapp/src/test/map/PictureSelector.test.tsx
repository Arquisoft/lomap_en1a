import { render, fireEvent, act, findByText, waitFor } from "@testing-library/react";
import PictureSelector from "../../components/map/PictureSelector";
import * as api from '../../api/api'
import { Picture } from "../../domain/Picture";

jest.mock('../../api/api');
const handleIsLoading = async (value: boolean) => { }

test('check picture is added', async () => {

  jest.spyOn(api, 'addPicture').mockImplementation((pic: Picture): Promise<boolean> => Promise.resolve(true))
  await act(async () => {
    const { container } = render(<PictureSelector OnPictureListChange={() => { }} place="" handleIsLoading={handleIsLoading} />)
    const input = container.querySelector('textarea[name="text"]')!;
    await fireEvent.change(input, { target: { value: "https://ingenieriainformatica.uniovi.es/image/image_gallery?uuid=a266f556-c40f-4f34-bc35-933c05467019&groupId=780436&t=1348851605421" } });
    const button = container.querySelector('button[id="btn-Add-Image"]')!;
    fireEvent.click(button);
    await waitFor(()=>expect(jest.spyOn(api, 'addPicture')).toHaveBeenCalled()) //Wait for component to render
    expect(jest.spyOn(api, 'addPicture')).toHaveBeenCalled()
    expect(await findByText(container, "Your picture has been posted!")).toBeInTheDocument();
  });
})

test('check comment is not added', async () => {

    jest.spyOn(api, 'addPicture').mockImplementation((pic: Picture): Promise<boolean> => Promise.resolve(false))
    await act(async () => {
      const { container } = render(<PictureSelector OnPictureListChange={() => { }} place="" handleIsLoading={handleIsLoading} />)
      const input = container.querySelector('textarea[name="text"]')!;
      await fireEvent.change(input, { target: { value: "https://ingenieriainformatica.uniovi.es/image/image_gallery?uuid=a266f556-c40f-4f34-bc35-933c05467019&groupId=780436&t=1348851605421" } });
      const button = container.querySelector('button[id="btn-Add-Image"]')!;
      fireEvent.click(button);
      await waitFor(()=>expect(jest.spyOn(api, 'addPicture')).toHaveBeenCalled()) //Wait for component to render
      expect(jest.spyOn(api, 'addPicture')).toHaveBeenCalled()
      expect(await findByText(container, "There\'s been an error posting your picture.")).toBeInTheDocument();
    });
})