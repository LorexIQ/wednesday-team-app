package it.bgitu.wednesday.network.Travel

import it.bgitu.wednesday.network.base.BaseRetrofitSource
import it.bgitu.wednesday.network.base.RetrofitConfig
import it.bgitu.wednesday.network.Travel.TravelSources
import kotlinx.coroutines.delay
import retrofit2.Retrofit
import retrofit2.create

class RetrofitTravelSource(
    config: RetrofitConfig
) : BaseRetrofitSource(config), TravelSources {
    val travelAPI: TravelAPI = retrofit.create(TravelAPI::class.java)

    override suspend fun trips(
        token: String,
        travelRequestBody: TravelRequestBody
    ): TravelResponseBody = wrapRetrofitExceptions {
        delay(1000)
        travelAPI.trips(token, travelRequestBody)
    }
}