import { useState, useRef } from 'react'
import {
  Box,
  IconButton,
  ButtonGroup,
  Menu,
  MenuItem,
  Chip,
  Typography
} from '@mui/material'
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  Link as LinkIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as NumberedListIcon,
  Code as CodeIcon,
  FormatQuote as QuoteIcon,
  AddPhotoAlternate as PhotoIcon
} from '@mui/icons-material'

const RichTextEditor = ({ value, onChange, placeholder = "What's on your mind?" }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [linkUrl, setLinkUrl] = useState('')
  const textareaRef = useRef(null)

  const formattingOptions = [
    { icon: <BoldIcon />, tag: '**', label: 'Bold' },
    { icon: <ItalicIcon />, tag: '*', label: 'Italic' },
    { icon: <UnderlineIcon />, tag: '__', label: 'Underline' },
    { icon: <CodeIcon />, tag: '`', label: 'Code' },
    { icon: <QuoteIcon />, tag: '> ', label: 'Quote' },
    { icon: <ListIcon />, tag: '- ', label: 'Bullet List' },
    { icon: <NumberedListIcon />, tag: '1. ', label: 'Numbered List' }
  ]

  const applyFormatting = (tag) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText, newCursorPos

    if (tag === '> ' || tag === '- ' || tag === '1. ') {
      // For block elements, apply to the entire line or selected lines
      const lines = value.split('\n')
      const startLine = value.substring(0, start).split('\n').length - 1
      const endLine = value.substring(0, end).split('\n').length - 1

      for (let i = startLine; i <= endLine; i++) {
        if (!lines[i].startsWith(tag)) {
          lines[i] = tag + lines[i]
        }
      }

      newText = lines.join('\n')
      newCursorPos = start + tag.length
    } else {
      // For inline elements
      if (selectedText) {
        newText = value.substring(0, start) + tag + selectedText + tag + value.substring(end)
        newCursorPos = end + tag.length * 2
      } else {
        newText = value.substring(0, start) + tag + tag + value.substring(end)
        newCursorPos = start + tag.length
      }
    }

    onChange(newText)

    // Restore cursor position after state update
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleLinkInsert = () => {
    if (linkUrl.trim()) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end) || 'link'

      const linkText = `[${selectedText}](${linkUrl})`
      const newText = value.substring(0, start) + linkText + value.substring(end)

      onChange(newText)
      setLinkUrl('')
      setAnchorEl(null)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + linkText.length, start + linkText.length)
      }, 0)
    }
  }

  const handleKeyDown = (e) => {
    // Auto-complete markdown features
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const newText = value.substring(0, start) + '  ' + value.substring(start)
      onChange(newText)
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2)
      }, 0)
    }
  }

  return (
    <Box>
      {/* Formatting Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mb: 1,
          p: 1,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 1,
          flexWrap: 'wrap'
        }}
      >
        <ButtonGroup variant="outlined" size="small">
          {formattingOptions.map((option, index) => (
            <IconButton
              key={index}
              onClick={() => applyFormatting(option.tag)}
              sx={{
                color: 'text.secondary',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main'
                }
              }}
              title={option.label}
            >
              {option.icon}
            </IconButton>
          ))}
        </ButtonGroup>

        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            color: 'text.secondary',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main'
            }
          }}
          title="Insert Link"
        >
          <LinkIcon />
        </IconButton>

        {/* Link Insert Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              p: 2,
              minWidth: 300
            }
          }}
        >
          <MenuItem disableRipple sx={{ cursor: 'default' }}>
            <Box sx={{ width: '100%' }}>
              <input
                type="url"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '14px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleLinkInsert()}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label="Insert"
                  onClick={handleLinkInsert}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                />
                <Chip
                  label="Cancel"
                  variant="outlined"
                  onClick={() => setAnchorEl(null)}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </Box>

      {/* Textarea */}
      <Box
        component="textarea"
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight: 120,
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          lineHeight: 1.5,
          resize: 'vertical',
          fontFamily: 'inherit',
          outline: 'none'
        }}
      />

      {/* Character Count */}
      {value.length > 0 && (
        <Typography
          variant="caption"
          color={value.length > 1000 ? 'error.main' : 'text.secondary'}
          sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
        >
          {value.length}/1000
        </Typography>
      )}
    </Box>
  )
}

export default RichTextEditor