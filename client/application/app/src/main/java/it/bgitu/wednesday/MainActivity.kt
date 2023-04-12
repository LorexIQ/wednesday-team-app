package it.bgitu.wednesday

import android.content.Context
import android.content.SharedPreferences
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
import it.bgitu.wednesday.fragments.*


class MainActivity : AppCompatActivity() {
    private lateinit var binding : ActivityMainBinding

    private lateinit var sharedPref: SharedPreferences
    private var token: String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        sharedPref = getSharedPreferences("myCache", Context.MODE_PRIVATE)

        token = sharedPref.getString(TOKEN_CACHE, null)

        var fragment = Fragment()
        //проверка токена авторизации
        if (token == null) {
            fragment = if(!checkCreatedTravel()) FragmentFindTravel.newInstance()
                        else FragmentActionTravel.newInstance()
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
                    fragment = if(!checkCreatedTravel()) FragmentFindTravel.newInstance()
                                else FragmentActionTravel.newInstance()
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

    private fun checkCreatedTravel(): Boolean {
        return true
    }



}