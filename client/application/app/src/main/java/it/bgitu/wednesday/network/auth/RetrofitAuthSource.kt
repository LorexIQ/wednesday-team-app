package it.bgitu.wednesday.network.auth

import it.bgitu.wednesday.network.base.BaseRetrofitSource
import it.bgitu.wednesday.network.base.RetrofitConfig
import kotlinx.coroutines.delay

class RetrofitAuthSource(
    config: RetrofitConfig
): BaseRetrofitSource(config), AuthSource {
    private val authAPI = retrofit.create(AuthAPI::class.java)

    override suspend fun login(
        phone: String,
        password: String,
        token: String
    ): String = wrapRetrofitExceptions {
        delay(1000)
        val authRequestBody = AuthRequestBodyDto(
            phone,
            password,
            token)
        authAPI.login(authRequestBody).token
    }

    override suspend fun registration(
        phone: String,
        password: String,
        token: String
    ): String = wrapRetrofitExceptions {
        delay(1000)
        val authRequestBody = AuthRequestBodyDto(
            phone,
            password,
            token)
        authAPI.registration(authRequestBody).token
    }
}