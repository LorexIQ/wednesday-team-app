package it.bgitu.wednesday.network.reqTrips

import it.bgitu.wednesday.network.trips.TripsResponseBodyDto

interface ReqTripsSource {
    suspend fun createReqTrip(tripBody: ReqTripsRequestBodyDto): TripsResponseBodyDto

    suspend fun acceptReqTrip(id: String): TripsResponseBodyDto

    suspend fun deleteReqTrip()

    suspend fun getAllReqTrip(): Array<ReqTripsResponseBodyDto>
}