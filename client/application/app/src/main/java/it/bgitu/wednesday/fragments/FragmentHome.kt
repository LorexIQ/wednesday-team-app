package it.bgitu.wednesday.fragments

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.MODE_CACHE
import it.bgitu.wednesday.databinding.FragmentHomeBinding

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

        binding.switchChecked.isChecked = sharedPref!!.getBoolean(MODE_CACHE, false)
        if (binding.switchChecked.isChecked) {
            binding.switchChecked.text = "Вы водитель"
        } else {
            binding.switchChecked.text = "Вы пассажир"
        }

        //Listeners
        binding.switchChecked.setOnCheckedChangeListener { compoundButton, b ->
            if (binding.switchChecked.isChecked) {
                binding.switchChecked.text = "Вы водитель"
            } else {
                binding.switchChecked.text = "Вы пассажир"
            }
            sharedPref!!.edit().putBoolean(MODE_CACHE, binding.switchChecked.isChecked).apply()
        }
    }
}