package it.bgitu.wednesday.network.trips

import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST

interface TripsAPI {
    @POST("trips")
    suspend fun createTrip(@Body tripBody: TripsRequestBodyDto): TripsResponseBodyDto

    @PATCH("trips/leave")
    suspend fun leaveTrip()

    @DELETE("trips/me")
    suspend fun deleteTrip()

    @GET("trips/all")
    suspend fun getAllTrip()
}