package it.bgitu.wednesday.network.auth

import retrofit2.http.Body
import retrofit2.http.POST

interface AuthAPI {

    @POST("auth/signin")
    suspend fun login(@Body authRequestBodyDto: AuthRequestBodyDto): AuthResponseBodyDto

    @POST("auth/signup")
    suspend fun registration(@Body authRequestBodyDto: AuthRequestBodyDto): AuthResponseBodyDto

}