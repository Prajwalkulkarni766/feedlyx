import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiEndpoints } from '../services/api'

// Posts queries
export const usePosts = (options = {}) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      return generateMockPosts(1, 10)
    },
    ...options,
  })
}

export const usePost = (postId, options = {}) => {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300))
      return generateMockPosts(1, 1)[0]
    },
    enabled: !!postId,
    ...options,
  })
}

// Posts mutations
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postData) => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newPost = {
        id: `post-${Date.now()}`,
        ...postData,
        likeCount: 0,
        commentCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
      }
      return newPost
    },
    onSuccess: (newPost) => {
      // Update the posts cache with the new post
      queryClient.setQueryData(['posts'], (oldPosts = []) => [newPost, ...oldPosts])
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    },
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, liked }) => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300))
      return { postId, liked }
    },
    onMutate: async ({ postId, liked }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(['posts', postId])
      await queryClient.cancelQueries(['posts'])

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(['posts', postId])
      const previousPosts = queryClient.getQueryData(['posts'])

      // Optimistically update the post
      if (previousPost) {
        queryClient.setQueryData(['posts', postId], (old) => ({
          ...old,
          isLiked: liked,
          likeCount: liked ? old.likeCount + 1 : old.likeCount - 1,
        }))
      }

      // Optimistically update the posts list
      if (previousPosts) {
        queryClient.setQueryData(['posts'], (old) =>
          old.map(post =>
            post.id === postId
              ? {
                ...post,
                isLiked: liked,
                likeCount: liked ? post.likeCount + 1 : post.likeCount - 1,
              }
              : post
          )
        )
      }

      return { previousPost, previousPosts }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', variables.postId], context.previousPost)
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    onSettled: (data, error, variables) => {
      // Refetch to ensure our server data is correct
      queryClient.invalidateQueries(['posts', variables.postId])
      queryClient.invalidateQueries(['posts'])
    },
  })
}

// Mock data generator (temporary)
const generateMockPosts = (page, pageSize = 5) => {
  const posts = []
  const startIndex = (page - 1) * pageSize

  for (let i = 0; i < pageSize; i++) {
    const id = startIndex + i + 1
    posts.push({
      id: `post-${id}`,
      user: {
        id: `user-${id}`,
        username: `user${id}`,
        avatar: null,
        isVerified: Math.random() > 0.7,
        isOnline: Math.random() > 0.5,
        hasStory: Math.random() > 0.3
      },
      content: id % 3 === 0 ? `This is post number ${id}. Check out this amazing content! 🚀` :
        id % 3 === 1 ? `Just sharing some thoughts here... ✨\nWhat do you think about this?` :
          `Another day, another post! 🌟\n#social #post ${id}`,
      image: id % 4 === 0 ? `https://picsum.photos/600/400?random=${id}` : null,
      likeCount: Math.floor(Math.random() * 50),
      commentCount: Math.floor(Math.random() * 20),
      isLiked: Math.random() > 0.7,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  return posts
}