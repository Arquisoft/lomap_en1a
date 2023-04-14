import { render, act, waitFor, queryAllByText, getAllByText} from "@testing-library/react";
import Profile from "../../components/mainPage/Profile";
import { BrowserRouter} from "react-router-dom";
import * as api from '../../api/api'
import { User } from "../../domain/User";
jest.mock('../../api/api');


test('check profile menu is rendered correctly', async () => {

  jest.spyOn(api,'getProfile').mockImplementation(():Promise<User> => Promise.resolve(new User("TEST","TEST")));
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
  });
  
  
})
