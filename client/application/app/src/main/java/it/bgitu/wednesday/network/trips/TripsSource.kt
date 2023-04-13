package it.bgitu.wednesday.network.trips

interface TripsSource {
    suspend fun createTrip(tripBody: TripsRequestBodyDto): TripsResponseBodyDto

    suspend fun leaveTrip()

    suspend fun joinTrip(id: String, tripBody: TripsJoinRequestBodyDto?): TripsResponseBodyDto

    suspend fun deleteTrip()

    suspend fun getAllTrip(): ListTripsResponseBodyDto
}