package it.bgitu.wednesday.network.reqTrips

import it.bgitu.wednesday.network.trips.TripsResponseBodyDto
import retrofit2.http.*

interface ReqTripsAPI {
    @POST("request-trips/create")
    suspend fun createReqTrip(@Body tripBody: ReqTripsRequestBodyDto): TripsResponseBodyDto

    @PATCH("request-trips/accept/{id}")
    suspend fun acceptReqTrip(@Path("id") id: String): TripsResponseBodyDto

    @DELETE("request-trips/me")
    suspend fun deleteReqTrip()

    @GET("request-trips/all")
    suspend fun getAllReqTrip(): Array<ReqTripsResponseBodyDto>
}