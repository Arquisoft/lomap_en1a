import { render, act, waitFor, fireEvent } from "@testing-library/react";

import * as api from '../../api/api'
import { CategoryList } from "../../components/map/FilterCategory";
import { check } from "yargs";
import { Place } from "../../domain/Place";
import { Visibility } from "../../domain/Visibility";
import { Category } from "../../domain/Category";

jest.mock("../../api/api");

let myPlaces: Place[];
myPlaces=[
  new Place("id1","TEST","","",0,0,Visibility.PUBLIC,Category.BAR),
  new Place("id2","TEST-2","","",0,0,Visibility.PUBLIC,Category.MONUMENT)
];

let friendPlaces: Place[];
friendPlaces=[
  new Place("id3","TEST-FRIEND-2","","",0,0,Visibility.PUBLIC,Category.BAR),
  new Place("id4","TEST-FRIEND","","",0,0,Visibility.PUBLIC,Category.MONUMENT)
];

beforeEach(() => {
    jest.spyOn(api, 'getAllPlacesByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(myPlaces))
    jest.spyOn(api, 'getSharedPlacesByFriends').mockImplementation((): Promise<Place[]> => Promise.resolve(friendPlaces))
})

test('check categories are displayed', async () => {
    await act(async () => {
      const { container, getByText } = render(
          <CategoryList/> 
        )
      await waitFor(()=>expect(getByText("Apply filters")).toBeInTheDocument()) //Wait for component to render
      expect(await getByText("Bar")).toBeInTheDocument();
      expect(await getByText("Monument")).toBeInTheDocument();
      expect(await getByText("Museum")).toBeInTheDocument();
      expect(await getByText("Restaurant")).toBeInTheDocument();
      expect(await getByText("Sight")).toBeInTheDocument();
      expect(await getByText("Shop")).toBeInTheDocument();
    });
  })

  test('check category filters can be checked', async () => {
    await act(async () => {
      const { container, getByText } = render(
          <CategoryList/> 
        )
      await waitFor(()=>expect(getByText("Apply filters")).toBeInTheDocument()) //Wait for component to render
      let checkbox = container.querySelector("#Bar")!;
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();    
    });
  })

  test('check category filters can be checked, then unchecked', async () => {
    await act(async () => {
      const { container, getByText } = render(
          <CategoryList/> 
        )
      await waitFor(()=>expect(getByText("Apply filters")).toBeInTheDocument()) //Wait for component to render
      let checkbox = container.querySelector("#Bar")!;
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  })

  test('check category filters can be applied', async () => {
    await act(async () => {
      const { container, getByText } = render(
          <CategoryList/> 
        )
      await waitFor(()=>expect(getByText("Apply filters")).toBeInTheDocument()) //Wait for component to render
      let checkbox = container.querySelector("#Bar")!;
      fireEvent.click(checkbox);

      let apply = getByText("Apply filters")
      fireEvent.click(apply)
      await waitFor(()=>expect(jest.spyOn(api, 'getAllPlacesByUser')).toHaveBeenCalled())
      await waitFor(()=>expect(jest.spyOn(api, 'getSharedPlacesByFriends')).toHaveBeenCalled())
    });
  })