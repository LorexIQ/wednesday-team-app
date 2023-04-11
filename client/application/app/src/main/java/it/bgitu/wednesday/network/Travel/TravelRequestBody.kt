package it.bgitu.wednesday.network.Travel

import java.util.Date

data class TravelRequestBody(
    val from: String,
    val to: String,
    val date: String,
    val places: Int,
    val priceForPlace: Int
)
