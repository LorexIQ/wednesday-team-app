package it.bgitu.wednesday.network.trips

import it.bgitu.wednesday.network.base.BaseRetrofitSource
import it.bgitu.wednesday.network.base.RetrofitConfig
import it.bgitu.wednesday.network.users.UsersAPI

class RetrofitTripsSource(
    config: RetrofitConfig
): BaseRetrofitSource(config), TripsSource {
    private val tripsAPI = retrofit.create(TripsAPI::class.java)

    override suspend fun createTrip(
        tripBody: TripsRequestBodyDto
    ): TripsResponseBodyDto = wrapRetrofitExceptions {
        tripsAPI.createTrip(tripBody)
    }

    override suspend fun leaveTrip() {
        tripsAPI.leaveTrip()
    }

    override suspend fun deleteTrip() {
        tripsAPI.deleteTrip()
    }
}