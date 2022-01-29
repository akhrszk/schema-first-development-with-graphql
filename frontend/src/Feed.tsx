import React from 'react'
import './Feed.css'
import { SortOrder, useFeedQuery } from './graphql/types'
import DateTime from './DateTime'

interface FeedProps {
  q: string
  take: number
  skip: number
  sort: SortOrder
}

export const Feed: React.FC<FeedProps> = ({ q, take, skip, sort }) => {
  const { loading, error, data } = useFeedQuery({
    variables: { q, take, skip, sort }
  })
  if (loading) {
    return (<div>loading...</div>)
  }
  if (error) {
    return (<div>{error.message}</div>)
  }
  const posts = data?.feed ?? []
  return (
    <div className='Feed'>
      {posts.map((post) => (
        <div className='Feed-Row'>
          <a className='Feed-Row-Title' href='/'>{post.title}</a>
          {' '}
          <span className='Post-Views'>{post.viewCount}views</span>
          <div>
            <span className='Post-Author'>author: {post.author?.name}</span>
            {' '}
            <DateTime className='Post-DateTime' datetime={post.createdAt} />
          </div>
        </div>
      ))}
    </div>
  )
}
