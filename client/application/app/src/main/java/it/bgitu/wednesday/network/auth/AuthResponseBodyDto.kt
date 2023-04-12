package it.bgitu.wednesday.network.auth

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

data class AuthResponseBodyDto(
    val token: String
)