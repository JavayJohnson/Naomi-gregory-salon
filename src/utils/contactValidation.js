const phonePattern = /^[0-9+().\-\s]{7,30}$/

export function validateContact(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (values.telephone.trim() && !phonePattern.test(values.telephone)) errors.telephone = 'Enter a valid telephone number or leave this optional field blank.'
  if (!values.message.trim()) errors.message = 'Enter a message.'
  return errors
}
