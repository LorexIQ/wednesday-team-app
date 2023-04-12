package it.bgitu.wednesday.network.users

import it.bgitu.wednesday.network.base.BaseRetrofitSource
import it.bgitu.wednesday.network.base.RetrofitConfig
import kotlinx.coroutines.delay

class RetrofitUsersSource(
    config: RetrofitConfig
): BaseRetrofitSource(config), UserSource {
    private val usersAPI = retrofit.create(UsersAPI::class.java)

    override suspend fun getMe(): UsersResponseBodyDto = wrapRetrofitExceptions {
        usersAPI.getMe()
    }
}