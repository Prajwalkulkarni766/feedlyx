import { useState, useCallback } from 'react'

export const useForm = (initialState = {}, validateFn = null) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  // Handle blur event
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate on blur if validation function provided
    if (validateFn) {
      const validationErrors = validateFn(values)
      setErrors(validationErrors)
    }
  }, [validateFn, values])

  // Set field value manually
  const setValue = useCallback((name, value) => {
    handleChange(name, value)
  }, [handleChange])

  // Set multiple values
  const setValuesMultiple = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }))
  }, [])

  // Reset form
  const reset = useCallback(() => {
    setValues(initialState)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialState])

  // Validate form
  const validate = useCallback(() => {
    if (validateFn) {
      const validationErrors = validateFn(values)
      setErrors(validationErrors)
      return Object.keys(validationErrors).length === 0
    }
    return true
  }, [validateFn, values])

  // Submit handler
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true)

    // Validate before submit
    const isValid = validate()

    if (isValid && onSubmit) {
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(false)
    }
  }, [validate, values])

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0

  // Check if form has been modified
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialState)

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    setValue,
    setValues: setValuesMultiple,
    reset,
    validate,
    handleSubmit,
    // Field props for easier integration with inputs
    getFieldProps: (name) => ({
      name,
      value: values[name] || '',
      onChange: (value) => handleChange(name, value),
      onBlur: () => handleBlur(name),
      error: !!errors[name] && touched[name],
      helperText: touched[name] ? errors[name] : ''
    })
  }
}