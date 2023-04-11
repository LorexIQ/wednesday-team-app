package it.bgitu.wednesday.network.Travel

data class TravelResponseBody(
    val id: Int,
    val from: String,
    val to: String,
    val date: String,
    val places: Int,
    val placesIsFilled: Int,
    val complected: Boolean,
    val driverId: Int,
    val createdAt: String,
    val updatedAt: String,
    val driver: Driver,
    val passengers: List<Passenger>
) {
    data class Driver(
        val id: Int,
        val email: String,
        val name: String,
        val phone: String,
        val addPassengers: Any?,
        val selfTripId: Int,
        val tripId: Int,
        val carId: Int,
        val createdAt: String,
        val updatedAt: String
    )
    data class Passenger(
        val id: Int,
        val email: String,
        val name: String,
        val phone: String,
        val addPassengers: Any?,
        val selfTripId: Any?,
        val tripId: Int,
        val carId: Int?,
        val createdAt: String,
        val updatedAt: String
    )
}