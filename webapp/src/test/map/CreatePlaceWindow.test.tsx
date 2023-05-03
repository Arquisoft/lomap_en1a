import { render, act, waitFor, fireEvent } from "@testing-library/react";

import * as api from '../../api/api'
import { Place } from "../../domain/Place";
import { Visibility } from "../../domain/Visibility";
import CreatePlaceWindow from "../../components/map/CreatePlaceWindow";
import { Category } from "../../domain/Category";

jest.mock('../../api/api');


const handleIsOpen = async (value:boolean) => {}
const handleNewPlace = async () => {}
const handleDeleteMarker = async (value:boolean) => {}




test('check place is added', async () => {
  jest.spyOn(api, 'addPlace').mockImplementation((): Promise<Place> => Promise.resolve(new Place("ID","","","",0,0,Visibility.PUBLIC,Category.BAR)));
  await act(async () => {
    const { container, getByText } = render(

        <CreatePlaceWindow latitude={0} longitude={0} handleNewPlace={handleNewPlace}
        handleDeleteMarker={handleDeleteMarker} handleIsOpen={handleIsOpen} /> 

      )
    await waitFor(()=>expect(getByText("New place!")).toBeInTheDocument()) //Wait for component to render
    const input = container.querySelector('textarea[name="text"]')!;
    fireEvent.change(input, { target: { value: "hola" } })
    const button = getByText("Add place");
    fireEvent.click(button);
    await waitFor(()=>expect(jest.spyOn(api, 'addPlace')).toHaveBeenCalled()) 
    
    expect(await getByText("Your new place has been added!")).toBeInTheDocument();
  });
})


test('check place is not added', async () => {
  jest.spyOn(api, 'addPlace').mockImplementation((): Promise<Place> => Promise.resolve(new Place("ERR","","","",0,0,Visibility.PUBLIC,Category.BAR)));
  await act(async () => {
    const { container, getByText } = render(

        <CreatePlaceWindow latitude={0} longitude={0} handleNewPlace={handleNewPlace}
        handleDeleteMarker={handleDeleteMarker} handleIsOpen={handleIsOpen} /> 

      )
    await waitFor(()=>expect(getByText("New place!")).toBeInTheDocument()) //Wait for component to render
    const input = container.querySelector('textarea[name="text"]')!;
    fireEvent.change(input, { target: { value: "hola" } })
    const button = getByText("Add place");
    fireEvent.click(button);
    await waitFor(()=>expect(jest.spyOn(api, 'addPlace')).toHaveBeenCalled()) 
    
    expect(await getByText("There\'s been an error adding your place.")).toBeInTheDocument();
  });
})


