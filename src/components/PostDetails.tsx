import { FC, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import CommentItem from './CommentItem';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post | null;
}

export const PostDetails: FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost || {};

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoadingComments(true);
    setIsCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${id}`)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => {
        setIsLoadingComments(false);
        setIsFormVisible(false);
      });
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsError && !isLoadingComments && (
            <>
              {comments.length ? (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <CommentItem
                      comment={comment}
                      key={comment.id}
                      setComments={setComments}
                    />
                  ))}
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
            </>
          )}
          {!isFormVisible && !isLoadingComments && !isCommentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && id && (
          <NewCommentForm postId={id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
