package it.bgitu.wednesday.network.Travel

interface TravelSources  {

    suspend fun trips(token: String, travelRequestBody: TravelRequestBody): TravelResponseBody
}