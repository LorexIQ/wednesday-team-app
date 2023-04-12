package it.bgitu.wednesday.network

import it.bgitu.wednesday.network.users.UsersResponseBodyDto

object Const {
    const val BASE_URL = "http://192.168.6.135:4000/api/"
    const val TOKEN_CACHE: String = "TOKEN"
    var TOKEN: String = ""
    var ME: UsersResponseBodyDto? = null
    var DEVICE_TOKEN: String? = null
}
