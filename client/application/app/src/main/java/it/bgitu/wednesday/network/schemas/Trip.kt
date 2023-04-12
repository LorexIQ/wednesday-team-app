package it.bgitu.wednesday.network.schemas

data class Trip(
    val id: Number,
    val from: String,
    val to: String,
    val fromName: String,
    val toName: String,
    val date: String,
    val priceForPlace: Number,
    val places: Number,
    val placesIsFilled: Number,
    val completed: Boolean,
    val driverId: Number,
    val driver: User,
    val passengers: ArrayList<User>
)
