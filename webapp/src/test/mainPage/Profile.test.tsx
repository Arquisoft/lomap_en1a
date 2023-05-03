import { render, act, waitFor, queryAllByText, getAllByText} from "@testing-library/react";
import Profile from "../../components/mainPage/Profile";
import { BrowserRouter} from "react-router-dom";
import * as api from '../../api/api'
import { User } from "../../domain/User";
jest.mock('../../api/api');


beforeEach(()=>{
  jest.spyOn(api,'getProfile').mockImplementation(():Promise<User> => Promise.resolve(new User("TEST","TEST",null)));
}

);

test('check profile menu is rendered correctly', async () => {
  //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const mockFunc = async (value:boolean) => {}
    const {container, getAllByText} = render(
        <BrowserRouter>
            <Profile handleLogout={mockFunc}/>
        </BrowserRouter>
    )  
    await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
    expect(await getAllByText("TEST")[0]).toBeInTheDocument();
    expect(await getAllByText("Log out")[0]).toBeInTheDocument();
    expect(await getAllByText("My profile")[0]).toBeInTheDocument();
  });
  
})

test('check logout works correctly', async () => {
  jest.spyOn(api,'logout').mockImplementation(():Promise<void> => Promise.resolve());
  //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const mockFunc = async (value:boolean) => {}
    const {container, getByText} = render(
        <BrowserRouter>
            <Profile handleLogout={mockFunc}/>
        </BrowserRouter>
    )  
    await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
    const logoutButton = getByText("Log out")
    logoutButton.click();
    expect(jest.spyOn(api, 'logout')).toHaveBeenCalled()

  });
  
})
