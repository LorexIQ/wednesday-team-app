package it.bgitu.wednesday.fragments

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.MODE_CACHE
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

    @SuppressLint("SetTextI18n")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val infTravel = if (Const.ME?.selfTrip != null) Const.ME?.selfTrip else Const.ME?.trip
        val infReqTravel = Const.ME?.requestTrip

        if (infTravel != null) {
            binding.sity1.text = infTravel.fromName.split(",")[0]
            binding.sity2.text = infTravel.toName.split(",")[0]
            binding.date.text = infTravel.date.substring(0, 10)
            binding.time.text = infTravel.date.split("T")[1]
            binding.price.text = infTravel.priceForPlace.toString()
            binding.numberPlace.text = infTravel.places.toString()
            binding.noPalace.text = infTravel.placesIsFilled.toString()
        } else if (infReqTravel != null) {
            binding.sity1.text = infReqTravel.fromName.split(",")[0]
            binding.sity2.text = infReqTravel.toName.split(",")[0]
            binding.date.text = infReqTravel.date.substring(0, 10)
            binding.time.text = infReqTravel.date.split("T")[1]
            binding.price.text = infReqTravel.priceForPlace.toString()
            binding.numberPlace.text = (infReqTravel.addPassengers + 1).toString()
            binding.noPalace.text = "N/A"
        }

        binding.buttonCancel.setOnClickListener {
            runBlocking {
                try {
                    if (Const.ME?.selfTrip == null)
                        if (Const.ME?.tripId != null) {
                            SourceProviderHolder.sourcesProvider.getTripsSource().leaveTrip()
                        } else {
                            SourceProviderHolder.sourcesProvider.getReqTripsSource().deleteReqTrip()
                        }
                    else
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