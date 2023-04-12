package it.bgitu.wednesday.network.reqTrips

import com.google.gson.annotations.SerializedName

data class ReqTripsRequestBodyDto(
    @SerializedName("from") val from: String,
    @SerializedName("to") val to: String,
    @SerializedName("date") val date: String,
    @SerializedName("addPassengers") val places: Int?,
    @SerializedName("priceForPlace") val priceForPlace: Int
)