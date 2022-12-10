import * as yup from 'yup'

export const userValidator = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  phone_number: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required(),
})
