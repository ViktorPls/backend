import { checkSchema } from 'express-validator'

export const registerSchema = checkSchema({
  name: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: 'El nombre es obligatorio'
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'El nombre debe tener entre 1 y 100 caracteres'
    }
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: 'Debe ser un correo electrónico válido'
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'El correo electrónico es obligatorio'
    }
  },
  password: {
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'La contraseña debe tener al menos 6 caracteres'
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria'
    }
  }
})

export const loginSchema = checkSchema({
  email: {
    trim: true,
    isEmail: {
      errorMessage: 'Debe ser un correo electrónico válido'
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'El correo electrónico es obligatorio'
    }
  },
  password: {
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'La contraseña debe tener al menos 6 caracteres'
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria'
    }
  }
})
