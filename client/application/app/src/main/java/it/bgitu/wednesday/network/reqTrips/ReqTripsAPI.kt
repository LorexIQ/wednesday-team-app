package it.bgitu.wednesday.network.reqTrips

import it.bgitu.wednesday.network.trips.TripsRequestBodyDto
import it.bgitu.wednesday.network.trips.TripsResponseBodyDto
import retrofit2.http.*

interface ReqTripsAPI {
    @POST("request-trips")
    suspend fun createReqTrip(@Body tripBody: ReqTripsRequestBodyDto): TripsResponseBodyDto

    @PATCH("request-trips/accept/{id}")
    suspend fun acceptReqTrip(@Path("id") id: String)

    @DELETE("request-trips/me")
    suspend fun deleteReqTrip()

    @GET("request-trips/all")
    suspend fun getAllReqTrip()
}