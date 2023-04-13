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
    @SerializedName("driver") val driver: Driver,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
) {
    data class Driver(
        @SerializedName("id") val id: Int,
        @SerializedName("email") val email: String?,
        @SerializedName("name") val name: String?,
        @SerializedName("phone") val phone: String,
        @SerializedName("addPassengers") val addPassengers: Int?,
        @SerializedName("deviceToken") val deviceToken: String?,
        @SerializedName("selfTripId") val selfTripId: Int?,
        @SerializedName("tripId") val tripId: Int?,
        @SerializedName("carId") val carId: Int?,
        @SerializedName("requestTripId") val requestTripId: Int?,
        @SerializedName("createdAt") val createdAt: String,
        @SerializedName("updatedAt") val updatedAt: String
    )
}