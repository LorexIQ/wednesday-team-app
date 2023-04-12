package it.bgitu.wednesday.network.users

import it.bgitu.wednesday.network.schemas.RequestTrip
import it.bgitu.wednesday.network.schemas.Trip
import it.bgitu.wednesday.network.schemas.User

data class UsersResponseBodyDto(
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
    val selfTrip: Number
)
