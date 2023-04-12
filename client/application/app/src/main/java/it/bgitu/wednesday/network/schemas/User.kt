package it.bgitu.wednesday.network.schemas

data class User(
    val id: String,
    val email: String,
    val name: String,
    val phone: String,
    val addPassengers: Number,
    val deviceToken: String,
    val selfTripId: Number,
    val tripId: Number,
    val carId: Number,
    val requestTripId: Number,
    val selfTrip: Number,
    var trip: Trip,
    var requestTrip: RequestTrip
)