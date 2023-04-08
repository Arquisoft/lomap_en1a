import { render, act } from "@testing-library/react";
import MySideBar from "./SideBar";
import * as api from '../../api/api'
import { Place } from "../../domain/Place";
import { useState } from "react";
import { User } from "../../domain/User";
import { Visibility } from "../../domain/Visibility";

jest.mock('../../api/api');


test('check update side bar place added', async () => {
  jest.spyOn(api, 'addPlace').mockImplementation((p: Place): Promise<Place> => Promise.resolve(new Place("ID","","","",0,0,Visibility.FRIENDS)))
  const [infoWindowData, setInfoWindowData] = useState({
    title: "",
    id: "",
    latitude: 0,
    longitude: 0,
  });
  const [friendWindowData, setFriendWindowData] = useState({
    friend: new User("", ""),
    friendPhoto: "",
    sharedSites: []
  });
  const [isOpen, setIsOpen] = useState(false);
  const [slidingPaneView, setSlidingPaneView] = useState(0);

  await act(async () => {
    const { container, getByText } = render(<MySideBar setFriendWindowData={setFriendWindowData} setInfoWindowData={setInfoWindowData} setSlidingPaneView={setSlidingPaneView}
      visibility="test" setIsOpen={setIsOpen} newPlace={1} />)
    expect(jest.spyOn(api, 'addPlace')).toHaveBeenCalled()
    expect(await container.querySelector('li[class="ps-menuitem-root css-12vkui9"]')).toBeInTheDocument();
  });


})

