import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  post: Post;
  isActivePost: boolean;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

const PostItem: FC<Props> = ({ post, setSelectedPost, isActivePost }) => {
  const handleSelect = () => {
    setSelectedPost(isActivePost ? null : post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', { 'is-light': !isActivePost })}
          onClick={handleSelect}
        >
          {isActivePost ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};

export default PostItem;
