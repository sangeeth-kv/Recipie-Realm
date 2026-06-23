# Recipie Realm
Recipe platform.
User can view, create recipies and also can do  chats with users.

## Features
- User authentication
- 
- 


## Tech Stack
Frontend
- React
- TypeScript
- Tailwind

Backend
- Node.js
- Typescript
- Express
- MongoDB

others(Packages)
Frontend:
    - axios
    - react-hook-form zod @hookform/resolvers
    - react-router-dom
    - lucide-react
    - react-hot-toast
    - @tanstack/react-query
    - react-redux
    - @reduxjs/toolkit
    - framer-motion
    - react-easy-crop
    - zustand
Backend:
    - cookie-parser
    - winston & winston-daily-rotate-file
    - mongoose
    - cors
    - zod
    - bcrypt
    - ioredis
    - jsonwebtoken
    - cloudinary multer-storage-cloudinary
    - bullmq
    - redis
    - @google/genai 
    - crypto
     


#Project summary
Sign up :
     for signup get signup details from user
        -email
        -phone
        -password
        -confirm password
        -fullname

        Frontend validation:
            zod,@hookform/resolvers,react-hook-form
            created schema for signup validation
            Done validation
        Service:
            using axios instance created a singup service 
        
    payload reaches the backend validate using zod,hitted on the authController, then authService:
    
    in AuthService check already a user by using userRepository before creating user, after if not already a user hash the password,  
    then call userrepository to create user with the neccesary user data and return new user to authservice.

    authService return the neccesary data , dont sent sensitive data(password etc..) to authController.

    auth controller return trough apiResponse reusable function to frontend.

    frontend show the data in ui(Success sign up or Already user).

Sign in :    
    for signin get signin details from user
        -email
        -password

        Frontend validation:
            zod,@hookform/resolvers,react-hook-form
            created schema for signup validation
            Done validation
        Service:
            using axios instance created a signin service 

    payload reaches the backend validate using zod,hitted on the authController, then authService:

    in AuthService check a user by using userRepository is user and also compare password, after if not throw app error, 

    and in the then create access token and refresh token usign DI tokenservice, and return accesstoken refreshtoken using jwt,user(email,fullname,phone,isVerified,isBlocked,createdAt,userId) and store accesstoken and refreshtoken in the cookies. return api response with user.

Refresh logic and token expired logic:
    when user refresh the page fist useAuth hook will run and hit /auth/me route and in authMiddleware get the accesstoken from cookies
    and done validation.moves to authController.getMe() and that controller call auth service layer.
    
    in that getMe service it return the getMeResponseDTO like fullname,phone,etc..(non-sensitive data)

    if while validating the accessToken if the token is expired, it return token expired error. and it do api call on the /auth/refresh

    so in backend /auth/refresh it hits on the authcontroller.refresh route controller.get refresh token from the cookies and validate

    and call the auth service layer and verify the token if no error it generate new accesstoken and refresh token (refresh token rotation) and return from the service layer and set that token to cookies,with in  the controller.


Home Page:
    In this page user can see the post (Following sheffs recipies,suggested recipies,etc..)
Recipe page:
    In this user can search for recipie,filter,sort.
Add Recipe:
    User can add recipies by entering recipe data and images. After that recipe created in backend and set the queue for worker and return response, Worker will do the 
    Nutrition extract from the incredients and calculate the calorie values etc.. 
    Added recipe validation usind Gemini AI , It process the recipie details and return the valid or not
Profiles Page:
    user can view, and search for users. and also can follow the profiles.






    