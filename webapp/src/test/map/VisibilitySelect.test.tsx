import React from 'react'
import { render } from "@testing-library/react";
import { Visibility } from '../../domain/Visibility';
import { VisibilitySelect } from '../../components/map/CreatePlaceWindow';

test('check visibility default friends select renders propertly', async () => {
  const myMockFn = jest.fn().mockImplementationOnce(() => Promise.resolve());
  const { getByText } = render(<VisibilitySelect visibility={Visibility.FRIENDS} handleVisibilityChange={myMockFn}/>);
  expect(getByText("Friends")).toBeInTheDocument();
});

test('check visibility default public select renders propertly', async () => {
    const myMockFn = jest.fn().mockImplementationOnce(() => Promise.resolve());
    const { getByText } = render(<VisibilitySelect visibility={Visibility.PUBLIC} handleVisibilityChange={myMockFn}/>);
    expect(getByText("Public")).toBeInTheDocument();
  });


  test('check visibility default private select renders propertly', async () => {
    const myMockFn = jest.fn().mockImplementationOnce(() => Promise.resolve());
    const { getByText } = render(<VisibilitySelect visibility={Visibility.PRIVATE} handleVisibilityChange={myMockFn}/>);
    expect(getByText("Private")).toBeInTheDocument();
  });