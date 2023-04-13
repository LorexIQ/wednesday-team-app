package it.bgitu.wednesday.network.trips

import com.google.gson.annotations.SerializedName
import com.squareup.moshi.JsonClass

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
    //@SerializedName("driver") val driver: Driver,
    //@SerializedName("passengers") val passengers: List<String>,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)

class ListTripsResponseBodyDto(vararg pairs: TripsResponseBodyDto)

@JsonClass(generateAdapter = true)
data class Driver(
    @SerializedName("id") val id: Int,
    @SerializedName("email") val email: String,
    @SerializedName("name") val name: String,
    @SerializedName("phone") val phone: String,
    @SerializedName("addPassengers") val addPassengers: Any?,
    @SerializedName("deviceToken") val deviceToken: String,
    @SerializedName("selfTripId") val selfTripId: Int,
    @SerializedName("tripId") val tripId: Int,
    @SerializedName("carId") val carId: Int,
    @SerializedName("requestTripId") val requestTripId: Int,
    @SerializedName("selfTrip") val selfTrip: String,
    @SerializedName("trip") val trip: String,
    @SerializedName("car") val car: Car,
    @SerializedName("requestTrip") val requestTrip: RequestTrip,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)

@JsonClass(generateAdapter = true)
data class Car(
    @SerializedName("id") val id: Int,
    @SerializedName("stateNumber") val stateNumber: String,
    @SerializedName("manufacturer") val manufacturer: String,
    @SerializedName("model") val model: String,
    @SerializedName("body") val body: String,
    @SerializedName("color") val color: String,
    @SerializedName("ownerId") val ownerId: Int,
    @SerializedName("owner") val owner: String
)

@JsonClass(generateAdapter = true)
data class Passenger(
    @SerializedName("id") val id: Int,
    @SerializedName("email") val email: String,
    @SerializedName("name") val name: String,
    @SerializedName("phone") val phone: String,
    @SerializedName("tripId") val tripId: Int,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)

@JsonClass(generateAdapter = true)
data class RequestTrip(
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
