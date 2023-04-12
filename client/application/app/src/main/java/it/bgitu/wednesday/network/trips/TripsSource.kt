package it.bgitu.wednesday.network.trips

interface TripsSource {
    suspend fun createTrip(tripBody: TripsRequestBodyDto): TripsResponseBodyDto

    suspend fun leaveTrip()

    suspend fun deleteTrip()
}