package it.bgitu.wednesday.network.reqTrips

import it.bgitu.wednesday.network.trips.TripsResponseBodyDto

interface ReqTripsSource {
    suspend fun createReqTrip(tripBody: ReqTripsRequestBodyDto): TripsResponseBodyDto

    suspend fun acceptReqTrip(id: String)

    suspend fun deleteReqTrip()

    suspend fun getAllReqTrip()
}