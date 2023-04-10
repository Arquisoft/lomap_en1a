import { render, act} from "@testing-library/react";
import Profile from "./Profile";
import { BrowserRouter} from "react-router-dom";
import * as api from '../../api/api'
import { User } from "../../domain/User";
jest.mock('../../api/api');


test('check profile menu is rendered correctly', async () => {

  //FIXME
  jest.spyOn(api,'getProfile').mockImplementation(():Promise<User> => Promise.resolve(new User("TEST","TEST")));
    //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const {container, getByText} = render(
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>
            
   
    )  
    expect(await getByText("My profile")).toBeInTheDocument();
  });
  
  
})
