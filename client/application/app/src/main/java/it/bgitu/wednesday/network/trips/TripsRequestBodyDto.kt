package it.bgitu.wednesday.network.trips

import com.google.gson.annotations.SerializedName

data class TripsRequestBodyDto(
    @SerializedName("from") val from: String,
    @SerializedName("to") val to: String,
    @SerializedName("date") val date: String,
    @SerializedName("places") val places: Int,
    @SerializedName("priceForPlace") val priceForPlace: Int
)