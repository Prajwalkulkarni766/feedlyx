// Validation schemas for forms
export const validationSchemas = {
  login: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    return errors
  },

  signup: (values) => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and numbers'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    return errors
  },

  createPost: (values) => {
    const errors = {}

    if (!values.content && !values.image) {
      errors.content = 'Post must contain text or an image'
    }

    if (values.content && values.content.length > 1000) {
      errors.content = 'Post must be less than 1000 characters'
    }

    return errors
  },

  editProfile: (values) => {
    const errors = {}

    if (!values.fullName) {
      errors.fullName = 'Full name is required'
    }

    if (!values.username) {
      errors.username = 'Username is required'
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }

    if (values.bio && values.bio.length > 500) {
      errors.bio = 'Bio must be less than 500 characters'
    }

    if (values.website && !/^https?:\/\/.+\..+/.test(values.website)) {
      errors.website = 'Please enter a valid website URL'
    }

    return errors
  }
}

// Custom validation hooks
export const useValidation = (schema) => {
  const validate = (values) => {
    if (schema && typeof schema === 'function') {
      return schema(values)
    }
    return {}
  }

  return { validate }
}