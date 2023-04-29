import { render, act, waitFor} from "@testing-library/react";
import * as api from '../../api/api'
import { User } from "../../domain/User";
import UserProfile from "../../components/mainPage/UserProfile";
jest.mock('../../api/api');


test('check user profile is rendered correctly', async () => {

  jest.spyOn(api,'getProfile').mockImplementation(():Promise<User> => Promise.resolve(new User("TEST","TEST-ID")));
  //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const {container, getByText} = render(<UserProfile/>)  
    await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
    expect(await getByText("TEST")).toBeInTheDocument();
    expect(await getByText("TEST-ID")).toBeInTheDocument();
  });
  
  
})
