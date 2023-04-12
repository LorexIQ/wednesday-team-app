package it.bgitu.wednesday.network.auth

data class AuthRequestBodyDto(
    val phone: String,
    val password: String,
    val token: String
)
