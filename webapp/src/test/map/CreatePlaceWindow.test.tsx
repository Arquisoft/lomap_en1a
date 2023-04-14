import { render, act, waitFor } from "@testing-library/react";

import * as api from '../../api/api'
import { Place } from "../../domain/Place";
import MySideBar from "../../components/map/SideBar";
import { FriendWindowDataType, InfoWindowDataType } from "../../components/map/MapView";
import { Visibility } from "../../domain/Visibility";
import { useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { User } from "../../domain/User";
import CreatePlaceWindow from "../../components/map/CreatePlaceWindow";

jest.mock('../../api/api');

//A mock resizeObserver must be defined
/*class ResizeObserver {
    observe() {}
    unobserve() {}
  }
(global as any).ResizeObserver = ResizeObserver;*/


const handleInfoWindowData = async (value:InfoWindowDataType) => {}
const handleFriendWindowData = async (value:FriendWindowDataType) => {}
const handleIsOpen = async (value:boolean) => {}
const handleSlidingPaneView = async (value:number) => {}



test('check place is added', async () => {
  jest.spyOn(api, 'addPlace').mockImplementation((): Promise<Place> => Promise.resolve(new Place("ID","","","",0,0,Visibility.PUBLIC)));
  await act(async () => {
    const { container, getByText } = render(

        <CreatePlaceWindow latitude={0} longitude={0} setNewPlace={setNewPlace}
        deleteMarker={} handleIsOpen={handleIsOpen} /> 

      )
    expect(jest.spyOn(api, 'addPlace')).toHaveBeenCalled()
    expect(await getByText("TEST-USER")).toBeInTheDocument();
  });
})

test('check place is not added', async () => {

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

