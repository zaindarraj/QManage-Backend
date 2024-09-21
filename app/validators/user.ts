import vine from '@vinejs/vine'


export const createUserValidator = vine.compile(
    vine.object({
      fullName: vine.string().trim().minLength(6),
      email: vine.string().trim().email().unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.id)
          .where('email', value)
          .first()
        return !user
      }),
      password: vine.string().trim().minLength(10)
    })
  )
  