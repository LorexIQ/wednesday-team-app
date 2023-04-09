package it.bgitu.wednesday.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.databinding.FragmentFindTravelBinding

class FragmentFindTravel: Fragment() {
    private lateinit var binding: FragmentFindTravelBinding

    companion object {
        fun newInstance(): FragmentFindTravel {
            return FragmentFindTravel()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        binding = FragmentFindTravelBinding.inflate(layoutInflater)
        return binding.root
    }
}