package it.bgitu.wednesday.fragments

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.MODE_CACHE
import it.bgitu.wednesday.R
import it.bgitu.wednesday.databinding.FragmentHomeBinding
import it.bgitu.wednesday.network.Const
import it.bgitu.wednesday.network.SourceProviderHolder
import kotlinx.coroutines.runBlocking

class FragmentHome : Fragment() {
    private lateinit var binding: FragmentHomeBinding

    companion object {
        fun newInstance(): FragmentHome {
            return FragmentHome()
        }

    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val sharedPref  = activity?.getSharedPreferences("myCache", Context.MODE_PRIVATE)

        binding.sity1.text = Const.ME?.name ?: "Антон"
        binding.price.text = Const.ME?.email ?: "Пусто"
        binding.price3.text = Const.ME?.phone
        binding.age.text = "24 лет"

        binding.switchChecked.isChecked = sharedPref!!.getBoolean(MODE_CACHE, false)
        if (binding.switchChecked.isChecked) {
            binding.switchChecked.text = "Водитель"
        } else {
            binding.switchChecked.text = "Пассажир"
        }

        //Listeners
        binding.switchChecked.setOnCheckedChangeListener { compoundButton, b ->
            if (binding.switchChecked.isChecked) {
                binding.switchChecked.text = "Водитель"
            } else {
                binding.switchChecked.text = "Пассажир"
            }
            sharedPref!!.edit().putBoolean(MODE_CACHE, binding.switchChecked.isChecked).apply()
        }

        binding.logout.setOnClickListener {
            Const.TOKEN = ""
            Const.ME = null
            sharedPref!!.edit().putString(Const.TOKEN_CACHE, "").apply()

            runBlocking {
                try {
                    SourceProviderHolder.sourcesProvider.getAuthSource().logout()
                } catch (e: Exception) {
                    println("ТТТТТТТТТ")
                }
            }
            activity
                ?.supportFragmentManager!!
                .beginTransaction()
                .replace(R.id.fragment_container, FragmentLogIn.newInstance())
                .commit()

        }
    }


}