package it.bgitu.wednesday.network.base

import it.bgitu.wednesday.network.SourcesProvider
import it.bgitu.wednesday.network.auth.AuthSource
import it.bgitu.wednesday.network.auth.RetrofitAuthSource
import it.bgitu.wednesday.network.trips.RetrofitTripsSource
import it.bgitu.wednesday.network.trips.TripsSource
import it.bgitu.wednesday.network.users.RetrofitUsersSource
import it.bgitu.wednesday.network.users.UserSource
import retrofit2.converter.moshi.MoshiConverterFactory

class RetrofitSourcesProvider(
    val config: RetrofitConfig
): SourcesProvider {

    override fun getAuthSource(): AuthSource {
        return RetrofitAuthSource(config)
    }

    override fun getUsersSource(): UserSource {
        return RetrofitUsersSource(config)
    }
    override fun getTripsSource(): TripsSource {
        return RetrofitTripsSource(config)
    }
}