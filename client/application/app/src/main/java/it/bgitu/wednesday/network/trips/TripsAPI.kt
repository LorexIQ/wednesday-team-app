package it.bgitu.wednesday.network.trips

import retrofit2.http.Body
import retrofit2.http.POST

interface TripsAPI {
    @POST("trips")
    suspend fun createTrip(@Body tripBody: TripsRequestBodyDto): TripsResponseBodyDto
}