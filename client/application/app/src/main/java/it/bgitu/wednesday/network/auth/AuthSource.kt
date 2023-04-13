package it.bgitu.wednesday.network.auth

import retrofit2.http.Body
import retrofit2.http.POST

interface AuthSource {
    suspend fun login(
        phone: String,
        password: String,
        deviceToken: String
    ): String

    suspend fun registration(
        phone: String,
        password: String,
        deviceToken: String
    ): String

    suspend fun logout()
}