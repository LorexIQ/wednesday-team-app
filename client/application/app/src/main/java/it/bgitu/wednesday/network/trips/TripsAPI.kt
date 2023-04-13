package it.bgitu.wednesday.network.trips

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path

interface TripsAPI {
    @POST("trips")
    suspend fun createTrip(@Body tripBody: TripsRequestBodyDto): TripsResponseBodyDto

    @PATCH("trips/leave")
    suspend fun leaveTrip()

    @PATCH("trips/join/{id}")
    suspend fun joinTrip(@Path("id") id: String)

    @DELETE("trips/me")
    suspend fun deleteTrip()

    @GET("trips")
    suspend fun getAllTrip(): Array<TripsResponseBodyDto>
}