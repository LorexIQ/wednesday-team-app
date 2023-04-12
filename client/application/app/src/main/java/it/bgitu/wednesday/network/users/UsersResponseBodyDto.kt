package it.bgitu.wednesday.network.users

import com.google.gson.annotations.SerializedName

data class UsersResponseBodyDto(
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
    @SerializedName("selfTrip") val selfTrip: MyTrip?,
    @SerializedName("trip") val trip: MyTrip?,
    @SerializedName("car") val car: MyCar?,
    @SerializedName("requestTrip") val requestTrip: MyRequestTrip?,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)

data class MyTrip(
    @SerializedName("id") val id: Int,
    @SerializedName("from") val from: String,
    @SerializedName("to") val to: String,
    @SerializedName("fromName") val fromName: String,
    @SerializedName("toName") val toName: String,
    @SerializedName("date") val date: String,
    @SerializedName("priceForPlace") val priceForPlace: Int,
    @SerializedName("places") val places: Int,
    @SerializedName("placesIsFilled") val placesIsFilled: Int,
    @SerializedName("completed") val completed: Boolean,
    @SerializedName("driverId") val driverId: Int,
    @SerializedName("driver") val driver: String,
    @SerializedName("passengers") val passengers: List<String>
)

data class MyCar(
    @SerializedName("id") val id: Int,
    @SerializedName("stateNumber") val stateNumber: String,
    @SerializedName("manufacturer") val manufacturer: String,
    @SerializedName("model") val model: String,
    @SerializedName("body") val body: String,
    @SerializedName("color") val color: String,
    @SerializedName("ownerId") val ownerId: Int,
    @SerializedName("owner") val owner: String
)

data class MyRequestTrip(
    @SerializedName("id") val id: Int,
    @SerializedName("from") val from: String,
    @SerializedName("to") val to: String,
    @SerializedName("fromName") val fromName: String,
    @SerializedName("toName") val toName: String,
    @SerializedName("date") val date: String,
    @SerializedName("addPassengers") val addPassengers: Int,
    @SerializedName("priceForPlace") val priceForPlace: Int,
    @SerializedName("ownerId") val ownerId: Int,
    @SerializedName("owner") val owner: String
)