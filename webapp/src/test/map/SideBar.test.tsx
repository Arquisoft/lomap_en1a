import { render, act, waitFor, fireEvent } from "@testing-library/react";

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

let friends: User[];
friends=[ new User("TEST-USER","",null)];

let users: User[];
users=[ new User("TEST-USER-PUBLIC","publicUserWebId",null)];

let publicPlaces: Place[];
publicPlaces=[ new Place("","TEST-PUBLIC","","",0,0,Visibility.PUBLIC,Category.BAR)];

let privatePlaces: Place[];
privatePlaces=[ new Place("","TEST-PRIVATE","","",0,0,Visibility.PRIVATE,Category.BAR)];

let sharedPlaces: Place[];
sharedPlaces=[ new Place("","TEST-FRIENDS","","",0,0,Visibility.FRIENDS,Category.BAR)];

let importedPlaces: Place[];
importedPlaces=[ new Place("","TEST-IMPORTED","","",0,0,Visibility.FRIENDS,Category.BAR)];


beforeEach(()=>{
    jest.spyOn(api, 'getFriendsForUser').mockImplementation((): Promise<User[]> => Promise.resolve(friends));
    jest.spyOn(api, 'getAllPublicUsers').mockImplementation((): Promise<User[]> => Promise.resolve(users));
    jest.spyOn(api, 'getPublicPlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(publicPlaces));
    jest.spyOn(api, 'getPrivatePlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(privatePlaces));
    jest.spyOn(api, 'getSharedPlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(sharedPlaces));
    jest.spyOn(api, 'getPublicPlacesByPublicUser').mockImplementation((): Promise<Place[]> => Promise.resolve(importedPlaces));
    jest.spyOn(api, 'addUserToList').mockImplementation((): Promise<boolean> => Promise.resolve(true));
    jest.spyOn(api, 'getProfile').mockImplementation((): Promise<User> => Promise.resolve(new User("","",null)));
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

test('check public users list is shown', async () => {
  await act(async () => {
    const { container, getByText } = render(
    <ProSidebarProvider>
        <MySideBar handleFriendWindowData={handleFriendWindowData} 
            handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
        visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
    </ProSidebarProvider>

      )
    await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
    expect(jest.spyOn(api, 'getAllPublicUsers')).toHaveBeenCalled()
    expect(await getByText("TEST-USER-PUBLIC")).toBeInTheDocument();
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

  test('check users can add themselves to public list', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      const button = getByText("Add me to public user list");
      fireEvent.click(button);
      expect(jest.spyOn(api, 'addUserToList')).toBeCalled()
    });
  })

  test('check imported list place is updated when adding public markers', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      const display = getByText("Public users");
      fireEvent.click(display);
      const secondButton = getByText("Show this user's markers")
      fireEvent.click(secondButton);
      expect(jest.spyOn(api, 'getPublicPlacesByPublicUser')).toBeCalled()
    });
  })

  test('check imported list place is shown', async () => {

    await act(async () => {
      const { container, getByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      expect(jest.spyOn(api, 'getPublicPlacesByPublicUser')).toHaveBeenCalled()
      expect(await getByText("TEST-IMPORTED")).toBeInTheDocument();
    });
  })


