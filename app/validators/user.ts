import vine from '@vinejs/vine'


export const createUserValidator = vine.compile(
    vine.object({
      fullName: vine.string().trim().minLength(6),
      email: vine.string().trim().email().unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .first()
        return !user
      }),
      password: vine.string().trim().minLength(10)
    })
  )


export const signInValidator = vine.compile(
  vine.object({
    email : vine.string().trim().email(),
    password : vine.string().minLength(10)
  })
)