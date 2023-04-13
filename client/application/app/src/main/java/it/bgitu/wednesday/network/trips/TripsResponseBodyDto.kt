package it.bgitu.wednesday.network.trips

import com.google.gson.annotations.SerializedName

data class TripsResponseBodyDto(
    @SerializedName("id") val id: Int,
    @SerializedName("from") val from: String,
    @SerializedName("to") val to: String,
    @SerializedName("fromName") val fromName: String,
    @SerializedName("toName") val toName: String,
    @SerializedName("date") val date: String,
    @SerializedName("priceForPlace") val priceForPlace: Int,
    @SerializedName("places") val places: Int,
    @SerializedName("placesIsFilled") val placesIsFilled: Int,
    @SerializedName("complected") val complected: Boolean,
    @SerializedName("driverId") val driverId: Int,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)
