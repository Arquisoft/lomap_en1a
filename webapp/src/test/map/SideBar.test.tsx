import { render, act, waitFor, fireEvent } from "@testing-library/react";

import * as api from '../../api/api'
import { Place } from "../../domain/Place";
import MySideBar from "../../components/map/SideBar";
import { FriendWindowDataType, InfoWindowDataType } from "../../components/map/MapView";
import { Visibility } from "../../domain/Visibility";
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
friends=[
  new User("TEST-USER","friendsUserWebId",null),
  new User("TEST-USER-2","friendsUserWebId2",null)
  ];

let users: User[];
users=[
  new User("TEST-USER-PUBLIC","publicUserWebId",null),
  new User("TEST-USER-PUBLIC-2","publicUserWebId2",null)
];

let publicPlaces: Place[];
publicPlaces=[
  new Place("","TEST-PUBLIC","","",0,0,Visibility.PUBLIC,Category.BAR),
  new Place("","TEST-PUBLIC-2","","",0,0,Visibility.PUBLIC,Category.MONUMENT)
];

let privatePlaces: Place[];
privatePlaces=[
  new Place("","TEST-PRIVATE","","",0,0,Visibility.PRIVATE,Category.BAR),
  new Place("","TEST-PRIVATE-2","","",0,0,Visibility.PRIVATE,Category.MONUMENT)
];

let sharedPlaces: Place[];
sharedPlaces=[
  new Place("","TEST-FRIENDS","","",0,0,Visibility.FRIENDS,Category.BAR),
  new Place("","TEST-FRIENDS-2","","",0,0,Visibility.FRIENDS,Category.MONUMENT)
];

let importedPlaces: Place[];
importedPlaces=[
  new Place("","TEST-IMPORTED","","",0,0,Visibility.FRIENDS,Category.BAR),
  new Place("","TEST-IMPORTED-2","","",0,0,Visibility.FRIENDS,Category.BAR)
];


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

    const menu = getByText("Friends")
    fireEvent.click(menu);
    expect(await getByText("TEST-USER")).toBeInTheDocument();
    expect(await getByText("TEST-USER-2")).toBeInTheDocument();
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
    expect(await getByText("TEST-USER-PUBLIC-2")).toBeInTheDocument();
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

      const menu = getByText("My public sites")
      fireEvent.click(menu);

      expect(await getByText("TEST-PUBLIC")).toBeInTheDocument();
      expect(await getByText("TEST-PUBLIC-2")).toBeInTheDocument();
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

      const menu = getByText("My shared sites")
      fireEvent.click(menu);

      expect(await getByText("TEST-FRIENDS")).toBeInTheDocument();
      expect(await getByText("TEST-FRIENDS-2")).toBeInTheDocument();
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

      const menu = getByText("My private sites")
      fireEvent.click(menu);

      expect(await getByText("TEST-PRIVATE")).toBeInTheDocument();
      expect(await getByText("TEST-PRIVATE-2")).toBeInTheDocument();
    });
  })

  test('check users can add themselves to public list succesfully', async () => {

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
      await waitFor(()=>expect(getByText("You have been added to the public user list!")).toBeInTheDocument());
    });
  })


  test('check users can add themselves to public list fail', async () => {

    jest.spyOn(api, 'addUserToList').mockImplementation((): Promise<boolean> => Promise.resolve(false));
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
      await waitFor(()=>expect(getByText("There\'s been an error adding you to the public user list.")).toBeInTheDocument());
    });
  })

  test('check imported list place is updated when adding public markers', async () => {

    await act(async () => {
      const { container, getByText, getAllByText } = render(
      <ProSidebarProvider>
          <MySideBar handleFriendWindowData={handleFriendWindowData} 
              handleInfoWindowData={handleInfoWindowData} handleSlidingPaneView={handleSlidingPaneView}
          visibility="test" handleIsOpen={handleIsOpen} newPlace={1} />
      </ProSidebarProvider>
  
        )
      await waitFor(()=>expect(jest.spyOn(api, 'getProfile')).toHaveBeenCalled()) //Wait for component to render
      const display = getByText("Public users");
      fireEvent.click(display);
      const buttons = getAllByText("Show this user's markers")
      fireEvent.click(buttons[0]);
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

      const menu = getByText("Imported sites")
      fireEvent.click(menu);

      expect(await getByText("TEST-IMPORTED")).toBeInTheDocument();
      expect(await getByText("TEST-IMPORTED-2")).toBeInTheDocument();
    });
  })

  test('check imported places can be removed', async () => {

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
        const button = getByText("Hide this user's markers")
        fireEvent.click(button);
        expect(jest.spyOn(api, 'getPublicPlacesByPublicUser')).toBeCalled()

        const menu = getByText("Imported sites")
        fireEvent.click(menu);

        expect(() => getByText('TEST-IMPORTED')).toThrow('Unable to find an element');
        expect(() => getByText('TEST-IMPORTED-2')).toThrow('Unable to find an element');
    });
  })