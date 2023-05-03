import React from 'react'
import { render } from "@testing-library/react";
import CommentList from '../../components/map/CommentList';
import { Comment } from '../../domain/Comment';
import { Visibility } from '../../domain/Visibility';

test('check that the list of comments renders propertly', async () => {
  let v = Visibility.PUBLIC;
  let c = new Comment("", "hello", "", "", new Date(), v);
  const list: Comment[] = [c];
  const { getByText } = render(<CommentList comments={list} />);
  expect(getByText("hello")).toBeInTheDocument();
});