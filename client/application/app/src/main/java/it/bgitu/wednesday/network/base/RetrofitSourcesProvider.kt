package it.bgitu.wednesday.network.base

import it.bgitu.wednesday.network.SourcesProvider
import it.bgitu.wednesday.network.auth.AuthSource
import it.bgitu.wednesday.network.auth.RetrofitAuthSource
import retrofit2.converter.moshi.MoshiConverterFactory

class RetrofitSourcesProvider(
    val config: RetrofitConfig
): SourcesProvider {
//    private fun getConfig(): RetrofitConfig {
//        val loggerInterceptor = HttpLoggingInterceptor()
//            .setLevel(HttpLoggingInterceptor.Level.BODY)
//
//        val client = OkHttpClient.Builder()
//            .addInterceptor(loggerInterceptor)
//            .build()
//
//        val moshi: Moshi = Moshi.Builder().build()
//
//        val moshiConverter: MoshiConverterFactory = MoshiConverterFactory.create(moshi)
//
//        val retrofit = Retrofit.Builder()
//            .baseUrl(Const.BASE_URL)
//            .client(client)
//            .addConverterFactory(moshiConverter)
//            .build()
//        return RetrofitConfig(retrofit, moshi)
//    }

    override fun getAuthSource(): AuthSource {
        return RetrofitAuthSource(config)
    }

}