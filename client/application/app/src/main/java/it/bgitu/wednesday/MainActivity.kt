package it.bgitu.wednesday

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import it.bgitu.wednesday.databinding.ActivityMainBinding
import it.bgitu.wednesday.fragments.FragmentCreateTravel
import it.bgitu.wednesday.fragments.FragmentFindTravel
import it.bgitu.wednesday.fragments.FragmentHome
import it.bgitu.wednesday.fragments.FragmentLogIn


class MainActivity : AppCompatActivity() {
    private lateinit var binding : ActivityMainBinding

    private val TOKEN_CACHE: String = "TOKEN"
    private var token: String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val sharedPref  = getSharedPreferences("myCache", Context.MODE_PRIVATE)
        //sharedPref.edit().putString(TOKEN_CACHE, "dfdfs").apply() //debug
        token = sharedPref.getString(TOKEN_CACHE, null)

        var fragment = Fragment()
        //проверка токена авторизации
        if (token == null) {
            fragment = FragmentFindTravel.newInstance()
            binding.bottomNavigation.selectedItemId = R.id.item_2
        } else {
            if (checkAuthorization(token ?: "")) {
                //заполняюем данный пользователя и остаёмся на главной
            } else {
                fragment = FragmentLogIn.newInstance()
                binding.bottomNavigation.selectedItemId = R.id.item_1
            }
        }
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            var resultFlag = false
            fragment = FragmentLogIn.newInstance()

            when(item.itemId) {
                R.id.item_1 -> {
                    fragment = if (checkAuthorization(token ?: ""))
                        FragmentHome.newInstance() else FragmentLogIn.newInstance()
                    resultFlag = true
                }
                R.id.item_2 -> {
                    fragment = FragmentFindTravel.newInstance()
                    resultFlag = true
                }
                R.id.item_3 -> {
                    fragment = if (checkAuthorization(token ?: ""))
                        FragmentCreateTravel.newInstance() else FragmentLogIn.newInstance()
                    resultFlag = true
                }

            }
            supportFragmentManager
                .beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit()
            resultFlag
        }

    }

    private fun checkAuthorization(token: String): Boolean {
        /* if (token == "be313f90")
             return true
         else return false*/
        return true
    }




}