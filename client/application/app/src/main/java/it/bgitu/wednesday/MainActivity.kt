package it.bgitu.wednesday

import android.content.Context
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.databinding.ActivityMainBinding
import it.bgitu.wednesday.fragments.*
import it.bgitu.wednesday.network.Const
import it.bgitu.wednesday.network.SourceProviderHolder
import kotlinx.coroutines.runBlocking


class MainActivity : AppCompatActivity() {
    private lateinit var binding : ActivityMainBinding

    private var token: String? = null
    private lateinit var sharedPref: SharedPreferences
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        updateMeInfo()

        sharedPref = getSharedPreferences("myCache", Context.MODE_PRIVATE)
        token = sharedPref.getString(Const.TOKEN_CACHE, null)
        Const.TOKEN = token.toString()


        var fragment = Fragment()
        //проверка токена авторизации
        if (token == null) {
            fragment = if(!checkCreatedTravel()) FragmentFindTravel.newInstance()
                        else FragmentActionTravel.newInstance()
            binding.bottomNavigation.selectedItemId = R.id.item_2
        } else {
            if (checkAuthorization()) {
                fragment = FragmentHome.newInstance()
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

            updateMeInfo()

            when(item.itemId) {
                R.id.item_1 -> {
                    fragment = if (checkAuthorization())
                        FragmentHome.newInstance() else FragmentLogIn.newInstance()
                    resultFlag = true
                }
                R.id.item_2 -> {
                    fragment = if(!checkCreatedTravel()) FragmentFindTravel.newInstance()
                                else FragmentActionTravel.newInstance()
                    resultFlag = true
                }
                R.id.item_3 -> {
                    fragment = if (checkAuthorization())
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

    private fun checkAuthorization(): Boolean {
        token = sharedPref.getString(Const.TOKEN_CACHE, null)
        return !token.isNullOrEmpty()
    }

    private fun checkCreatedTravel(): Boolean {
        println(Const.ME)
        return Const.ME?.tripId != null ||
                Const.ME?.selfTripId != null
    }

    fun updateMeInfo() {
        runBlocking {
            try {
                println(Const.TOKEN)
                Const.ME = SourceProviderHolder.sourcesProvider.getUsersSource().getMe()
                println("*********************${Const.ME}************************")
            } catch (e: Exception) {
                println(e.message)
            }
        }
    }
}