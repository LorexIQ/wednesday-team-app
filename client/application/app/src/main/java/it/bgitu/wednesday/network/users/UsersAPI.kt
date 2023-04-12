package it.bgitu.wednesday.network.users

import retrofit2.http.GET

interface UsersAPI {
    @GET("users/me")
    suspend fun getMe(): UsersResponseBodyDto
}