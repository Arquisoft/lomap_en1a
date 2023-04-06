import React from 'react'
import { render } from "@testing-library/react";
import CommentList from './CommentList';
import { Comment } from '../../domain/Comment';

test('check that the list of comments renders propertly', async () => {
    var c = new Comment("","hello","","");
    const list:Comment[] = [c];
    const {getByText} = render(<CommentList comments={list}/>);
    expect(getByText("hello")).toBeInTheDocument();
  });