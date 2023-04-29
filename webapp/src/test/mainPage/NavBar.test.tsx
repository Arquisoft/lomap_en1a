import { render, act, waitFor} from "@testing-library/react";
import * as api from '../../api/api'
import { User } from "../../domain/User";
import NavBar from "../../components/mainPage/NavBar";
import { BrowserRouter } from "react-router-dom";
jest.mock('../../api/api');


test('check not logged navbar is rendered correctly', async () => {

  jest.spyOn(api,'isLoggedIn').mockImplementation(():Promise<boolean> => Promise.resolve(false));
  //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const {container, getByText} = render(
        <BrowserRouter>
        <NavBar/>
        </BrowserRouter>
    
    )  
    await waitFor(()=>expect(jest.spyOn(api, 'isLoggedIn')).toHaveBeenCalled())
    expect(await getByText("Log in")).toBeInTheDocument();
  });
})

test('check logged navbar is rendered correctly', async () => {

    jest.spyOn(api,'isLoggedIn').mockImplementation(():Promise<boolean> => Promise.resolve(true));
    jest.spyOn(api,'getProfile').mockImplementation(():Promise<User> => Promise.resolve(new User("TEST","TEST")));
    //Profile component must be inside BrowserRouter for the test
    await act(async () => {    
      const {container, getByText} = render(
          <BrowserRouter>
          <NavBar/>
          </BrowserRouter>
      
      )  
      await waitFor(()=>expect(jest.spyOn(api, 'isLoggedIn')).toHaveBeenCalled())
      expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()
      expect(await getByText("Map")).toBeInTheDocument();
    });
  })
