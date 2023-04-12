package it.bgitu.wednesday.notify

import android.Manifest
import android.R
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import java.util.*


@SuppressLint("MissingFirebaseInstanceTokenRefresh")
class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        notify(remoteMessage.notification!!.title, remoteMessage.notification!!.body)
    }

    private fun notify(title: String?, message: String?) {
        val builder: NotificationCompat.Builder =
            NotificationCompat.Builder(this, "channelId")
                .setSmallIcon(R.drawable.sym_def_app_icon)
                .setContentTitle(title)
                .setContentText(message)
                .setAutoCancel(true)
        val managerCompat = NotificationManagerCompat.from(this)
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED) return
        managerCompat.notify(123, builder.build())
    }
}