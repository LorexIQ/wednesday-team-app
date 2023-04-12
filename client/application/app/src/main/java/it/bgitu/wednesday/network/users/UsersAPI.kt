package it.bgitu.wednesday.network.users

import retrofit2.http.GET

interface UsersAPI {
    @GET("me")
    suspend fun getMe(): UsersResponseBodyDto
}