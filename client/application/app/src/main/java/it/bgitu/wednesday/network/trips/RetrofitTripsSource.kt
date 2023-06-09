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

    override suspend fun leaveTrip() = wrapRetrofitExceptions {
        tripsAPI.leaveTrip()
    }

    override suspend fun joinTrip(
        id: String
    ) = wrapRetrofitExceptions {
        tripsAPI.joinTrip(id)
    }

    override suspend fun deleteTrip() = wrapRetrofitExceptions {
        tripsAPI.deleteTrip()
    }

    override suspend fun getAllTrip(): Array<TripsResponseBodyDto> = wrapRetrofitExceptions {
        tripsAPI.getAllTrip()
    }
}