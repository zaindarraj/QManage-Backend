import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
    createUserValidator,
  } from '#validators/user'
export default class UsersController {
    async signUp(httpContext : HttpContext) {
        const payload = await httpContext.request.validateUsing(createUserValidator)
        const user = await User.create(payload)
        if(user){
            
        }
        

        
    }
}