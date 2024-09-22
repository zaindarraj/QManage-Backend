import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
    createUserValidator,
    signInValidator
  } from '#validators/user'
import { json } from 'stream/consumers'
export default class UsersController {
   public async  signUp(httpContext : HttpContext) {
        const payload = await httpContext.request.validateUsing(createUserValidator)
        const user = await User.create(payload);
        const refreshToken = await User.refreshTokens.create(user)
        const accessToken = await User.accessTokens.create(user)     
        return {"accessToken" : accessToken, "refreshToken" : refreshToken}
    }


    public async signIn(httpContext : HttpContext){
      const payload = await httpContext.request.validateUsing(signInValidator)
      const user = await User.verifyCredentials(payload.email, payload.password)
      const refreshToken = await User.refreshTokens.create(user)
      const accessToken = await User.accessTokens.create(user)     
      return {"accessToken" : accessToken, "refreshToken" : refreshToken}
    }
}