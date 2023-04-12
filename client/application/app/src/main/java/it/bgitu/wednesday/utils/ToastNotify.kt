package it.bgitu.wednesday.utils

import android.content.Context
import android.widget.Toast

class ToastNotify(private val ctx: Context?, private val message: String) {
    init {
        if (ctx != null) {
            val toast = Toast.makeText(ctx, message, Toast.LENGTH_SHORT)
            toast.show()
        }
    }
}