package it.bgitu.wednesday.network.schemas

data class RequestTrip(
    val id: Number,
    val from: String,
    val to: String,
    val fromName: String,
    val toName: String,
    val date: String,
    val addPassengers: Number,
    val priceForPlace: Number,
    val ownerId: Number,
    val owner: User
)
