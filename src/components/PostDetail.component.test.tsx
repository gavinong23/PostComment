import { render, screen } from '@testing-library/react';
import { User } from '../models/LoginUser';
import PostDetailComponent from './PostDetail.component';
import Post from '../models/Post';

describe('Test button visibility based on login roles.', () => {
  it("delete post button is visible if user is admin role.", () => {
    const post: Post = {
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
    render(<PostDetailComponent post={post} user={user} comments={[]} />);
    const deletePostButton = screen.getByTestId('deletePostButton');
    const editPostTitleButton = screen.getByTestId('editPostTitleButton');
    expect(deletePostButton).toBeDefined();
    expect(editPostTitleButton).toBeDefined();
  });

  it("delete button is invisible if user is normal role.", () => {
    const post: Post = {
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
    render(<PostDetailComponent post={post} user={user} comments={[]} />);
    const deletePostButton = screen.queryByTestId('deletePostButton');
    const editPostTitleButton = screen.queryByTestId('editPostTitleButton');
    expect(deletePostButton).toBeNull();
    expect(editPostTitleButton).toBeNull();
  });
});
