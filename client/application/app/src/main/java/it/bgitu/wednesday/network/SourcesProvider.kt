package it.bgitu.wednesday.network

import it.bgitu.wednesday.network.auth.AuthSource

interface SourcesProvider {

    fun getAuthSource(): AuthSource;

}