package it.bgitu.wednesday.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.R
import it.bgitu.wednesday.databinding.FragmentActionTravelBinding
import it.bgitu.wednesday.network.Const
import it.bgitu.wednesday.network.SourceProviderHolder
import kotlinx.coroutines.runBlocking
import java.util.*

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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val infTravel = Const.ME?.selfTrip

        binding.sity1.text = infTravel?.from
        binding.sity2.text = infTravel?.to
        binding.date.text = infTravel?.date?.substring(0, 7)
        binding.time.text = infTravel?.date?.split("T")?.get(0)
        binding.price.text = infTravel?.priceForPlace.toString()
        binding.numberPlace.text = infTravel?.places.toString()
        binding.noPalace.text = infTravel?.placesIsFilled.toString()

        binding.time.text = Const.ME?.selfTrip?.date?.split("T")?.get(1) ?: "00:00"

        binding.buttonCancel.setOnClickListener {
            runBlocking {
                try {
                    SourceProviderHolder.sourcesProvider.getTripsSource().deleteTrip()
                    activity
                        ?.supportFragmentManager!!
                        .beginTransaction()
                        .replace(R.id.fragment_container, FragmentFindTravel.newInstance())
                        .commit()
                } catch (e: Exception) {
                    println(e)
                }
            }
        }
    }
}