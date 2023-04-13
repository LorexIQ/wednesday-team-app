package it.bgitu.wednesday.network.reqTrips

import com.google.gson.annotations.SerializedName

data class ReqTripsResponseBodyDto(
    @SerializedName("id") val id: Int?,
    @SerializedName("from") val from: String?,
    @SerializedName("to") val to: String?,
    @SerializedName("fromName") val fromName: String?,
    @SerializedName("toName") val toName: String?,
    @SerializedName("date") val date: String?,
    @SerializedName("priceForPlace") val priceForPlace: Int?,
    @SerializedName("addPassengers") val addPassengers: Int?,
    @SerializedName("ownerId") val ownerId: Int?,
    @SerializedName("createdAt") val createdAt: String?,
    @SerializedName("updatedAt") val updatedAt: String?
)
