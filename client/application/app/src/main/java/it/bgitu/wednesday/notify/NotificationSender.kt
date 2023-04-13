package it.bgitu.wednesday.notify

import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class NotificationSender(private val url: String) {

    private val client = OkHttpClient()

    fun sendNotification(token: String) {
        val jsonObject = JSONObject()
        jsonObject.put("deviceToken", token)
        jsonObject.put("phone", "9009009094")
        jsonObject.put("password", "password")

        val requestBody = jsonObject
            .toString()
            .toRequestBody("application/json".toMediaTypeOrNull())

        val request = Request.Builder()
            .url(url)
            .post(requestBody)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call: Call, response: Response) {
                println(response.body?.toString())
            }
            override fun onFailure(call: Call, e: IOException) {
                println(e)
            }
        })
    }
}