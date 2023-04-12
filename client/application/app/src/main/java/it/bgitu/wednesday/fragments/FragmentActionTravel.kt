package it.bgitu.wednesday.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.databinding.FragmentActionTravelBinding

class FragmentActionTravel: Fragment() {
    private lateinit var binding: FragmentActionTravelBinding

    companion object {
        fun newInstance(): FragmentActionTravel {
            return FragmentActionTravel()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentActionTravelBinding.inflate(layoutInflater)
        return binding.root
    }
}