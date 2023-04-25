import React from 'react'
import { render } from "@testing-library/react";
import CommentList from '../../components/map/CommentList';
import { Comment } from '../../domain/Comment';
import { Visibility } from '../../domain/Visibility';

test('check that the list of comments renders propertly', async () => {
  var v = Visibility.PUBLIC;
  var c = new Comment("", "hello", "", "", new Date(), v);
  const list: Comment[] = [c];
  const { getByText } = render(<CommentList comments={list} />);
  expect(getByText("hello")).toBeInTheDocument();
});