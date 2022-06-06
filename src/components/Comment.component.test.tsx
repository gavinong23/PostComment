import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentComponent from './Comment.component';
import PostComment from '../models/Post';
import { User } from '../models/LoginUser';

describe('Test delete button visibility based on login roles.', () => {
  it("delete button is visible if user is admin role.", () => {
    const comment: PostComment = {
      userId: 0,
      id: 0,
      title: '',
      body: '',
      postId: 0,
      name: '',
      email: ''
    };
    const user: User = {
      name: '',
      email: '',
      role: 'admin'
    };
    render(<CommentComponent comment={comment} user={user} />);
    const deleteCommentButton = screen.getByTestId('deleteCommentButton');
    expect(deleteCommentButton).toBeDefined();
  });

  it("delete button is invisible if user is normal role.", () => {
    const comment: PostComment = {
      userId: 0,
      id: 0,
      title: '',
      body: '',
      postId: 0,
      name: '',
      email: ''
    };
    const user: User = {
      name: '',
      email: '',
      role: 'normal'
    };
    render(<CommentComponent comment={comment} user={user} />);
    const deleteCommentButton = screen.queryByTestId('deleteCommentButton');
    expect(deleteCommentButton).toBeNull();
  });
});
