package it.bgitu.wednesday.fragments

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import  it.bgitu.wednesday.databinding.FragmentCreateTravelBinding
import com.google.android.material.datepicker.MaterialDatePicker
import it.bgitu.wednesday.MODE_CACHE
import it.bgitu.wednesday.myrecycle.ActionListener
import it.bgitu.wednesday.myrecycle.ItemTravel
import it.bgitu.wednesday.myrecycle.TravelsAdapter
import it.bgitu.wednesday.network.SourceProviderHolder
import it.bgitu.wednesday.network.trips.ListTripsResponseBodyDto
import kotlinx.coroutines.runBlocking
import java.util.*


class FragmentCreateTravel: Fragment() {
    private lateinit var binding: FragmentCreateTravelBinding
    private lateinit var adapter: TravelsAdapter
    companion object {
        fun newInstance(): FragmentCreateTravel {
            return FragmentCreateTravel()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentCreateTravelBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val sharedPref  = activity?.getSharedPreferences("myCache", Context.MODE_PRIVATE)
        val flagMode = sharedPref!!.getBoolean(MODE_CACHE, false)

        var travels: ArrayList<ItemTravel> = arrayListOf()

        adapter = TravelsAdapter(object: ActionListener {
            override fun select(itemTravel: ItemTravel) {
                // отпрвляется в базу
                adapter.travels.remove(itemTravel)
                adapter.notifyDataSetChanged()
            }
        })
        binding.listItem.adapter = adapter
        binding.listItem.layoutManager = LinearLayoutManager(context)


        if (flagMode) {
            //запрос поездок
            travels =  arrayListOf(
                ItemTravel("Влад", "Брянск", "Москва",
                "1.3", "0.50", "20:20", "20-12-50", "200"),
                ItemTravel("Дима", "Москва", "Брянск",
                    "1.3", "0.50", "20:20", "20-12-50", "454"))
        } else {
            //запрос запросов на предку
            travels =  arrayListOf(
                ItemTravel("ыаа", "Брянск", "Москва",
                    "1.3", "0.50", "20:20", "20-12-50", "1200"),
                ItemTravel("ывааав", "Москва", "Брянск",
                    "1.3", "0.50", "20:20", "20-12-50", "50"),ItemTravel("ыаа", "Брянск", "Москва",
                    "1.3", "0.50", "20:20", "20-12-50", "1200"),
                ItemTravel("ывааав", "Москва", "Брянск",
                    "1.3", "0.50", "20:20", "20-12-50", "50"),ItemTravel("ыаа", "Брянск", "Москва",
                    "1.3", "0.50", "20:20", "20-12-50", "1200"),
                ItemTravel("ывааав", "Москва", "Брянск",
                    "1.3", "0.50", "20:20", "20-12-50", "50"))
        }

        var allTrips: ListTripsResponseBodyDto = ListTripsResponseBodyDto()
        runBlocking {
            try {
                allTrips = SourceProviderHolder.sourcesProvider.getTripsSource().getAllTrip()
                println(allTrips)
            }catch (e: Exception) {
                println("Ошибка " + e)
            }
        }

        adapter.travels = travels


    }

}