package it.bgitu.wednesday.network

import it.bgitu.wednesday.network.auth.AuthSource
import it.bgitu.wednesday.network.trips.TripsSource
import it.bgitu.wednesday.network.users.UserSource

interface SourcesProvider {

    fun getAuthSource(): AuthSource;

    fun getUsersSource(): UserSource;

    fun getTripsSource(): TripsSource;
}