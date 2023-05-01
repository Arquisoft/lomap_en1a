import * as api from '../../api/api'
import { render, act, waitFor, getAllByText, fireEvent } from "@testing-library/react";
import { Place } from '../../domain/Place';
import { Visibility } from '../../domain/Visibility';
import { Category } from '../../domain/Category';
import { FriendPanel } from '../../components/map/FriendPanel';
import { User } from '../../domain/User';

jest.mock('../../api/api');

test('check comment is added', async () => {
    let places = [
        new Place("id1", "Place1", "Description", "Alice", 756, 123, Visibility.FRIENDS, Category.MONUMENT),
        new Place("id2", "Place2", "Description", "Alice", 458, 156, Visibility.FRIENDS, Category.BAR),
        new Place("id3", "Place3", "Description", "Alice", 456, 789, Visibility.FRIENDS, Category.RESTAURANT),
        new Place("id4", "Place4", "Description", "Alice", 789, 456, Visibility.FRIENDS, Category.SHOP),
    ];
    let friend = new User("Alice", "", "");
    jest.spyOn(api, 'getPlacesToShareByUser').mockImplementation((): Promise<Place[]> => Promise.resolve(places))
    jest.spyOn(api, 'getSharedPlacesByFriends').mockImplementation((): Promise<Place[]> => Promise.resolve(places))
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
        let button = buttons[0]
        await fireEvent.click(buttons[0]);
        let buttons2 = getAllByText("Hide");

        await waitFor(()=>expect(getByText("Hide")).toBeInTheDocument());
    });
})