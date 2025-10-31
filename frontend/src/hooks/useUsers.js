import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Users queries
export const useUser = (userId, options = {}) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        id: userId,
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
        coverPhoto: null,
        bio: 'Digital creator • Photography enthusiast • Coffee lover ☕',
        location: 'New York, USA',
        website: 'johndoeportfolio.com',
        joinDate: '2024-01-15',
        profession: 'UX Designer',
        education: 'Stanford University',
        isVerified: true,
        isFollowing: false,
        stats: {
          posts: 47,
          followers: 1248,
          following: 563,
          likes: 2890
        }
      }
    },
    enabled: !!userId,
    ...options,
  })
}

export const useUsers = (searchQuery = '', options = {}) => {
  return useQuery({
    queryKey: ['users', searchQuery],
    queryFn: async () => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300))
      return [
        {
          id: 'user-1',
          username: 'johndoe',
          fullName: 'John Doe',
          avatar: null,
          isVerified: true,
          isFollowing: false,
          stats: { followers: 1248 }
        },
        {
          id: 'user-2',
          username: 'sarahj',
          fullName: 'Sarah Johnson',
          avatar: null,
          isVerified: true,
          isFollowing: true,
          stats: { followers: 856 }
        }
      ].filter(user =>
        user.username.includes(searchQuery) ||
        user.fullName.includes(searchQuery)
      )
    },
    ...options,
  })
}

// Users mutations
export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, follow }) => {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500))
      return { userId, follow }
    },
    onMutate: async ({ userId, follow }) => {
      await queryClient.cancelQueries(['users', userId])

      const previousUser = queryClient.getQueryData(['users', userId])

      if (previousUser) {
        queryClient.setQueryData(['users', userId], (old) => ({
          ...old,
          isFollowing: follow,
          stats: {
            ...old.stats,
            followers: follow ? old.stats.followers + 1 : old.stats.followers - 1
          }
        }))
      }

      return { previousUser }
    },
    onError: (error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['users', variables.userId], context.previousUser)
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(['users', variables.userId])
    },
  })
}