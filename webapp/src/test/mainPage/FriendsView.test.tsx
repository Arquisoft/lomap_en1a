import { render, act, waitFor, fireEvent} from "@testing-library/react";
import * as api from '../../api/api'
import { User } from "../../domain/User";
import FriendsView from "../../components/mainPage/FriendsView";
jest.mock('../../api/api');

beforeEach(()=>{
    jest.spyOn(api,'getFriendRequests').mockImplementation(():Promise<User[]> => Promise.resolve([new User("FRIEND","FRIEND-ID")]));
}

);


test('check send request', async () => {
  jest.spyOn(api,'addFriend').mockImplementation(():Promise<boolean> => Promise.resolve(true));
  //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const {container, getByText} = render(<FriendsView/>)  
    expect(await getByText("Friend management menu")).toBeInTheDocument();
    const input = container.querySelector('textarea[name="text"]')!;
    fireEvent.change(input, { target: { value: "test" } })
    const button = getByText("Send request");
    fireEvent.click(button);
    await waitFor(()=>expect(jest.spyOn(api, 'addFriend')).toHaveBeenCalled())
    expect(await getByText("Your friend request has been sent!")).toBeInTheDocument();

  });
})

test('check send request fail', async () => {
    jest.spyOn(api,'addFriend').mockImplementation(():Promise<boolean> => Promise.resolve(false));
    //Profile component must be inside BrowserRouter for the test
    await act(async () => {    
      const {container, getByText} = render(<FriendsView/>)  
      expect(await getByText("Friend management menu")).toBeInTheDocument();
      const input = container.querySelector('textarea[name="text"]')!;
      fireEvent.change(input, { target: { value: "test" } })
      const button = getByText("Send request");
      fireEvent.click(button);
      await waitFor(()=>expect(jest.spyOn(api, 'addFriend')).toHaveBeenCalled())
      expect(await getByText("There\'s been an error sending your friend request.")).toBeInTheDocument();
  
    });
  })

  test('check accept friend request', async () => {
    jest.spyOn(api,'addFriend').mockImplementation(():Promise<boolean> => Promise.resolve(true));

    //Profile component must be inside BrowserRouter for the test
    await act(async () => {    
      const {container, getByText} = render(<FriendsView/>)  
      expect(await getByText("Friend management menu")).toBeInTheDocument();
      await waitFor(()=>expect(getByText("FRIEND")).toBeInTheDocument())
      expect(await getByText("FRIEND-ID")).toBeInTheDocument();
      const button = getByText("Accept request");
      fireEvent.click(button);
      await waitFor(()=>expect(jest.spyOn(api, 'addFriend')).toHaveBeenCalled())
      expect(await getByText("Your new friend has been added!")).toBeInTheDocument();
  
    });
  })

  test('check accept friend request fail', async () => {
    jest.spyOn(api,'addFriend').mockImplementation(():Promise<boolean> => Promise.resolve(false));

    //Profile component must be inside BrowserRouter for the test
    await act(async () => {    
      const {container, getByText} = render(<FriendsView/>)  
      expect(await getByText("Friend management menu")).toBeInTheDocument();
      await waitFor(()=>expect(getByText("FRIEND")).toBeInTheDocument())
      expect(await getByText("FRIEND-ID")).toBeInTheDocument();
      const button = getByText("Accept request");
      fireEvent.click(button);
      await waitFor(()=>expect(jest.spyOn(api, 'addFriend')).toHaveBeenCalled())
      expect(await getByText("There\'s been an error adding your new friend.")).toBeInTheDocument();
  
    });
  })
  
  
