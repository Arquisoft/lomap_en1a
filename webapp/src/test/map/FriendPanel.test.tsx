import * as api from '../../api/api'
import { render, act, waitFor, getAllByText, fireEvent } from "@testing-library/react";
import { Place } from '../../domain/Place';
import { Visibility } from '../../domain/Visibility';
import { Category } from '../../domain/Category';
import { FriendPanel } from '../../components/map/FriendPanel';
import { User } from '../../domain/User';

jest.mock('../../api/api');

let friend = new User("Alice", "", "");

let places = [
    new Place("id1", "Place1", "Description", "Alice", 756, 123, Visibility.FRIENDS, Category.MONUMENT),
    new Place("id2", "Place2", "Description", "Alice", 458, 156, Visibility.FRIENDS, Category.BAR),
    new Place("id3", "Place3", "Description", "Alice", 456, 789, Visibility.FRIENDS, Category.RESTAURANT),
    new Place("id4", "Place4", "Description", "Alice", 789, 456, Visibility.FRIENDS, Category.SHOP),
];

beforeEach(() => {
    jest.spyOn(api, 'getPlacesToShareByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(places))
    jest.spyOn(api, 'getSharedPlacesByFriends').mockImplementation((): Promise<Place[]> => Promise.resolve(places))
})

test('check friend panel list upon initial display', async () => {
    
    await act(async () => {
        
        const { container, getByText, getAllByText } = render(<FriendPanel friend={friend} friendPhoto={""} sharedSites={places}/>)
        
        await waitFor(()=>expect(jest.spyOn(api, 'getPlacesToShareByUser')).toHaveBeenCalled()) //Wait for component to render

        expect(getByText("Place1")).toBeInTheDocument();
        expect(getByText("MONUMENT")).toBeInTheDocument();
        expect(getByText("Place2")).toBeInTheDocument();
        expect(getByText("BAR")).toBeInTheDocument();
        expect(getByText("Place3")).toBeInTheDocument();
        expect(getByText("RESTAURANT")).toBeInTheDocument();
        expect(getByText("Place4")).toBeInTheDocument();
        expect(getByText("SHOP")).toBeInTheDocument();

        let buttons = getAllByText("Show");
        await fireEvent.click(buttons[0]);
        await waitFor(()=>expect(jest.spyOn(api, 'getSharedPlacesByFriends')).toHaveBeenCalled())

        await waitFor(()=>expect(getByText("Hide")).toBeInTheDocument());

        let hidingButtons = getAllByText("Hide");
        expect(hidingButtons.length).toEqual(1);
    });
})

test('check friend panel list upon hiding displayed marker', async () => {
    
    await act(async () => {
        
        const { container, getByText, getAllByText } = render(<FriendPanel friend={friend} friendPhoto={""} sharedSites={places}/>)
        
        await waitFor(()=>expect(jest.spyOn(api, 'getPlacesToShareByUser')).toHaveBeenCalled()) //Wait for component to render

        expect(getByText("Place1")).toBeInTheDocument();
        expect(getByText("MONUMENT")).toBeInTheDocument();
        expect(getByText("Place2")).toBeInTheDocument();
        expect(getByText("BAR")).toBeInTheDocument();
        expect(getByText("Place3")).toBeInTheDocument();
        expect(getByText("RESTAURANT")).toBeInTheDocument();
        expect(getByText("Place4")).toBeInTheDocument();
        expect(getByText("SHOP")).toBeInTheDocument();

        let buttons = getAllByText("Hide");
        await fireEvent.click(buttons[0]);

        expect(() => getByText('Hide')).toThrow('Unable to find an element');
    });
})

test('check friend panel list upon display then hide then display again', async () => {
    
    await act(async () => {
        
        const { container, getByText, getAllByText } = render(<FriendPanel friend={friend} friendPhoto={""} sharedSites={places}/>)
        
        await waitFor(()=>expect(jest.spyOn(api, 'getPlacesToShareByUser')).toHaveBeenCalled()) //Wait for component to render

        expect(getByText("Place1")).toBeInTheDocument();
        expect(getByText("MONUMENT")).toBeInTheDocument();
        expect(getByText("Place2")).toBeInTheDocument();
        expect(getByText("BAR")).toBeInTheDocument();
        expect(getByText("Place3")).toBeInTheDocument();
        expect(getByText("RESTAURANT")).toBeInTheDocument();
        expect(getByText("Place4")).toBeInTheDocument();
        expect(getByText("SHOP")).toBeInTheDocument();

        let buttons = getAllByText("Show");
        await fireEvent.click(buttons[0]);
        buttons = getAllByText("Hide");
        await fireEvent.click(buttons[0]);
        buttons = getAllByText("Show");
        await fireEvent.click(buttons[0]);

        await waitFor(()=>expect(jest.spyOn(api, 'getSharedPlacesByFriends')).toHaveBeenCalled())
        
        let hidingButtons = getAllByText("Hide");
        expect(hidingButtons.length).toEqual(1);
    });
})