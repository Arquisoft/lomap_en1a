import { render, fireEvent, act, findByText } from "@testing-library/react";
import CommentForm from "../../components/map/CommentForm";
import * as api from '../../api/api'
import { Comment } from "../../domain/Comment";

jest.mock('../../api/api');
const handleIsLoading = async (value: boolean) => { }

test('check comment is added', async () => {

  jest.spyOn(api, 'addComment').mockImplementation((c: Comment): Promise<boolean> => Promise.resolve(true))
  await act(async () => {
    const { container, getByText } = render(<CommentForm OnCommentListChange={() => { }} place="" handleIsLoading={handleIsLoading} />)
    const input = container.querySelector('input[name="text"]')!;
    fireEvent.change(input, { target: { value: "Hello" } });
    const button = getByText("Post");
    fireEvent.click(button);
    expect(jest.spyOn(api, 'addComment')).toHaveBeenCalled()
    expect(await findByText(container, "Your comment has been posted!")).toBeInTheDocument();
  });
})

test('check comment is not added', async () => {

  jest.spyOn(api, 'addComment').mockImplementation((c: Comment): Promise<boolean> => Promise.resolve(false))
  await act(async () => {
    const { container, getByText } = render(<CommentForm OnCommentListChange={() => { }} place="" handleIsLoading={handleIsLoading} />)
    const input = container.querySelector('input[name="text"]')!;
    fireEvent.change(input, { target: { value: "Hello" } });
    const button = getByText("Post");
    fireEvent.click(button);
    expect(jest.spyOn(api, 'addComment')).toHaveBeenCalled()
    expect(await findByText(container, "There\'s been an error posting your comment.")).toBeInTheDocument();
  });
})