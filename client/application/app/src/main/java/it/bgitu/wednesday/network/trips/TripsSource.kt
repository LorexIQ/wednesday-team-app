package it.bgitu.wednesday.network.trips

interface TripsSource {
    suspend fun createTrip(tripBody: TripsRequestBodyDto): TripsResponseBodyDto

    suspend fun leaveTrip()

    suspend fun joinTrip(id: String)

    suspend fun deleteTrip()

    suspend fun getAllTrip(): Array<TripsResponseBodyDto>
}