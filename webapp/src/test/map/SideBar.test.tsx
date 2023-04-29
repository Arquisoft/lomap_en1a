import { render, act, waitFor } from "@testing-library/react";

import * as api from '../../api/api'
import { Place } from "../../domain/Place";
import MySideBar from "../../components/map/SideBar";
import { FriendWindowDataType, InfoWindowDataType } from "../../components/map/MapView";
import { Visibility } from "../../domain/Visibility";
import { useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { User } from "../../domain/User";
import { Category } from "../../domain/Category";

jest.mock('../../api/api');

//A mock resizeObserver must be defined
class ResizeObserver {
    observe() {}
    unobserve() {}
  }
(global as any).ResizeObserver = ResizeObserver;


const handleInfoWindowData = async (value:InfoWindowDataType) => {}
const handleFriendWindowData = async (value:FriendWindowDataType) => {}
const handleIsOpen = async (value:boolean) => {}
const handleSlidingPaneView = async (value:number) => {}

var friends: User[];
friends=[ new User("TEST-USER","")];

var users: User[];
users=[ new User("TEST-USER-PUBLIC","")];

var publicPlaces: Place[];
publicPlaces=[ new Place("","TEST-PUBLIC","","",0,0,Visibility.PUBLIC,Category.BAR)];

var privatePlaces: Place[];
privatePlaces=[ new Place("","TEST-PRIVATE","","",0,0,Visibility.PRIVATE,Category.BAR)];

var sharedPlaces: Place[];
sharedPlaces=[ new Place("","TEST-FRIENDS","","",0,0,Visibility.FRIENDS,Category.BAR)];


beforeEach(()=>{
    jest.spyOn(api, 'getFriendsForUser').mockImplementation((): Promise<User[]> => Promise.resolve(friends));
    jest.spyOn(api, 'getAllPublicUsers').mockImplementation((): Promise<User[]> => Promise.resolve(users));
    jest.spyOn(api, 'getPublicPlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(publicPlaces));
    jest.spyOn(api, 'getPrivatePlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(privatePlaces));
    jest.spyOn(api, 'getSharedPlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(sharedPlaces));
    jest.spyOn(api, 'getProfile').mockImplementation((): Promise<User> => Promise.resolve(new User("","")));
}

);

test('check friend list is shown', async () => {
  await act(async () => {
    const { container, getByText } = render(
    <ProSidebarProvider>
        <MySideBar handleFriendWindowData={handleFriendWindowData} 
            handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
        visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
    </ProSidebarProvider>

      )
    await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
    expect(jest.spyOn(api, 'getFriendsForUser')).toHaveBeenCalled()
    expect(await getByText("TEST-USER")).toBeInTheDocument();
  });
})



test('check public list place is shown', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      expect(jest.spyOn(api, 'getPublicPlacesByUser')).toHaveBeenCalled()
      expect(await getByText("TEST-PUBLIC")).toBeInTheDocument();
    });
  })

  test('check friend list place is shown', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      expect(jest.spyOn(api, 'getSharedPlacesByUser')).toHaveBeenCalled()
      expect(await getByText("TEST-FRIENDS")).toBeInTheDocument();
    });
  })

  test('check private list place is shown', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      expect(jest.spyOn(api, 'getPrivatePlacesByUser')).toHaveBeenCalled()
      expect(await getByText("TEST-PRIVATE")).toBeInTheDocument();
    });
  })


