import { useState, useRef, useEffect } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Divider,
  IconButton
} from '@mui/material'
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  TrendingUp as TrendingIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Tag as TagIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomAvatar } from '../common'

// Mock search data
const mockUsers = [
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
  },
  {
    id: 'user-3',
    username: 'mike_t',
    fullName: 'Mike Taylor',
    avatar: null,
    isVerified: false,
    isFollowing: false,
    stats: { followers: 342 }
  }
]

const mockHashtags = [
  { tag: 'design', count: 1248 },
  { tag: 'photography', count: 892 },
  { tag: 'art', count: 756 },
  { tag: 'inspiration', count: 634 }
]

const mockTrending = [
  { term: 'Web Design', category: 'Trending', count: 1542 },
  { term: 'UI Inspiration', category: 'Design', count: 1289 },
  { term: 'React Tips', category: 'Development', count: 987 }
]

const SearchBar = ({ onSearch, onUserSelect, onHashtagSelect, variant = 'default' }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchResults, setSearchResults] = useState({
    users: [],
    hashtags: [],
    trending: []
  })
  const [isSearching, setIsSearching] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    } else {
      setSearchResults({
        users: [],
        hashtags: [],
        trending: mockTrending
      })
    }
  }, [searchQuery])

  const handleSearch = async (query) => {
    setIsSearching(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const filteredUsers = mockUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.fullName.toLowerCase().includes(query.toLowerCase())
    )

    const filteredHashtags = mockHashtags.filter(hashtag =>
      hashtag.tag.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults({
      users: filteredUsers,
      hashtags: filteredHashtags,
      trending: query ? [] : mockTrending
    })
    setIsSearching(false)
  }

  const handleInputFocus = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  const handleUserSelect = (user) => {
    onUserSelect?.(user)
    setSearchQuery('')
    setAnchorEl(null)
  }

  const handleHashtagSelect = (hashtag) => {
    onHashtagSelect?.(hashtag)
    setSearchQuery(`#${hashtag.tag} `)
    setAnchorEl(null)
  }

  const handleTrendingSelect = (term) => {
    setSearchQuery(term)
    inputRef.current?.focus()
  }

  const open = Boolean(anchorEl) && searchQuery.length >= 0

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        ref={inputRef}
        fullWidth
        placeholder="Search users, hashtags, or topics..."
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            background: variant === 'header'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            '&:hover': {
              background: variant === 'header'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.08)'
            },
            '&.Mui-focused': {
              background: variant === 'header'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
              borderColor: 'primary.main'
            }
          }
        }}
        variant="outlined"
        size={variant === 'header' ? 'small' : 'medium'}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            width: inputRef.current?.clientWidth || 400,
            maxHeight: 400,
            overflow: 'auto',
            mt: 1
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* Search Results */}
          {searchQuery ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Users */}
              {searchResults.users.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ px: 2, pt: 2, pb: 1 }}
                  >
                    Users
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {searchResults.users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <ListItem
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.05)'
                            }
                          }}
                          onClick={() => handleUserSelect(user)}
                        >
                          <ListItemAvatar>
                            <CustomAvatar
                              username={user.username}
                              src={user.avatar}
                              size={40}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle2" color="text.primary">
                                  {user.fullName}
                                </Typography>
                                {user.isVerified && (
                                  <Chip
                                    label="Verified"
                                    size="small"
                                    sx={{
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                      color: 'white',
                                      fontSize: '0.6rem',
                                      height: 16
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                @{user.username} • {user.stats.followers.toLocaleString()} followers
                              </Typography>
                            }
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Box>
              )}

              {/* Hashtags */}
              {searchResults.hashtags.length > 0 && (
                <Box>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ px: 2, pt: 2, pb: 1 }}
                  >
                    Hashtags
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {searchResults.hashtags.map((hashtag, index) => (
                      <motion.div
                        key={hashtag.tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <ListItem
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.05)'
                            }
                          }}
                          onClick={() => handleHashtagSelect(hashtag)}
                        >
                          <ListItemAvatar>
                            <TagIcon sx={{ color: 'primary.main' }} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" color="text.primary">
                                #{hashtag.tag}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {hashtag.count.toLocaleString()} posts
                              </Typography>
                            }
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Box>
              )}

              {/* No Results */}
              {searchResults.users.length === 0 && searchResults.hashtags.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No results found for "{searchQuery}"
                  </Typography>
                </Box>
              )}
            </motion.div>
          ) : (
            /* Trending/Suggestions */
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ px: 2, pt: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <TrendingIcon fontSize="small" />
                Trending Now
              </Typography>
              <List sx={{ p: 0 }}>
                {searchResults.trending.map((item, index) => (
                  <motion.div
                    key={item.term}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                      onClick={() => handleTrendingSelect(item.term)}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" color="text.primary">
                            {item.term}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={item.category}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.6rem', height: 20 }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {item.count.toLocaleString()} posts
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          )}
        </AnimatePresence>
      </Popover>
    </Box>
  )
}

export default SearchBar