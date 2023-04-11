package it.bgitu.wednesday.network.Travel

import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface TravelAPI {

    @POST("trips")
    suspend fun trips(
        @Header("Authorization") token: String,
        @Body travelRequestBody: TravelRequestBody) :TravelResponseBody
}