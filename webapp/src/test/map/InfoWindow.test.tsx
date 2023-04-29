import { render, act, waitFor} from "@testing-library/react";
import InfoWindow from "../../components/map/InfoWindow";
import { Category } from "../../domain/Category";
import * as api from '../../api/api'
import { User } from "../../domain/User";
import { Comment } from "../../domain/Comment";
import { Picture } from "../../domain/Picture";
import { Score } from "../../domain/Score";
import { Visibility } from "../../domain/Visibility";

jest.mock('../../api/api');


test('check info window data is rendered correctly', async () => {
  jest.spyOn(api, 'getComments').mockImplementation((): Promise<Comment[]> => Promise.resolve([]));
  jest.spyOn(api, 'getPictures').mockImplementation((): Promise<Picture[]> => Promise.resolve([]));
  jest.spyOn(api, 'getScores').mockImplementation((): Promise<Score[]> => Promise.resolve([new Score("",3,"","",new Date(),Visibility.FRIENDS)]));
  jest.spyOn(api,'getProfileById').mockImplementation(():Promise<User> => Promise.resolve(new User("Test creator","")));
  const handleIsLoading = async () => {}
  await act(async () => {    

    const infoWindowData= {
        title: "Test title",
        creator: "ID",
        category: Category.BAR,
        id: "ID",
        latitude: 0,
        longitude: 0,
        description:"Test description"
    }
    const {container, getByText} = render(<InfoWindow infoWindowData={infoWindowData} handleIsLoading={handleIsLoading} isLoading = {false}/> )  
    await waitFor(()=>expect(jest.spyOn(api, 'getProfileById')).toHaveBeenCalled()) //Wait for component to render
    expect(jest.spyOn(api, 'getScores')).toHaveBeenCalled()
    expect(jest.spyOn(api, 'getComments')).toHaveBeenCalled()
    expect(jest.spyOn(api, 'getPictures')).toHaveBeenCalled()
    expect(await getByText("Test title")).toBeInTheDocument();    
    expect(await getByText("Place created by Test creator")).toBeInTheDocument();
    expect(await getByText("Test description")).toBeInTheDocument();
  });
  
  
})

