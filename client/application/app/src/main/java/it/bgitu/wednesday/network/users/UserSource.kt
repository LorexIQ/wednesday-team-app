package it.bgitu.wednesday.network.users

interface UserSource {
    suspend fun getMe(): UsersResponseBodyDto
}