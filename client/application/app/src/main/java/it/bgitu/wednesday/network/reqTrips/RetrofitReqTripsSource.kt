package it.bgitu.wednesday.network.reqTrips

import it.bgitu.wednesday.network.base.BaseRetrofitSource
import it.bgitu.wednesday.network.base.RetrofitConfig
import it.bgitu.wednesday.network.trips.ListTripsResponseBodyDto
import it.bgitu.wednesday.network.trips.TripsResponseBodyDto
import retrofit2.http.Path

class RetrofitReqTripsSource(
    config: RetrofitConfig
): BaseRetrofitSource(config), ReqTripsSource {
    private val reqTripsAPI = retrofit.create(ReqTripsAPI::class.java)

    override suspend fun createReqTrip(
        tripBody: ReqTripsRequestBodyDto
    ): TripsResponseBodyDto = wrapRetrofitExceptions {
        reqTripsAPI.createReqTrip(tripBody)
    }

    override suspend fun acceptReqTrip(id: String): TripsResponseBodyDto = wrapRetrofitExceptions{
        reqTripsAPI.acceptReqTrip(id)
    }

    override suspend fun deleteReqTrip() = wrapRetrofitExceptions {
        reqTripsAPI.deleteReqTrip()
    }

    override suspend fun getAllReqTrip(): ListTripsResponseBodyDto = wrapRetrofitExceptions{
        reqTripsAPI.getAllReqTrip()
    }
}