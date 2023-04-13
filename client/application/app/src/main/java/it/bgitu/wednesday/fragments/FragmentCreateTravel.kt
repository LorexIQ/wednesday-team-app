package it.bgitu.wednesday.fragments

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import  it.bgitu.wednesday.databinding.FragmentCreateTravelBinding
import it.bgitu.wednesday.MODE_CACHE
import it.bgitu.wednesday.myrecycle.ActionListener
import it.bgitu.wednesday.myrecycle.ItemTravel
import it.bgitu.wednesday.myrecycle.TravelsAdapter
import it.bgitu.wednesday.network.SourceProviderHolder
import it.bgitu.wednesday.network.reqTrips.ReqTripsResponseBodyDto
import it.bgitu.wednesday.network.trips.TripsJoinRequestBodyDto
import it.bgitu.wednesday.network.trips.TripsResponseBodyDto
import it.bgitu.wednesday.utils.ToastNotify
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
                runBlocking {
                    try {
                        if (flagMode) {
                            SourceProviderHolder.sourcesProvider.getReqTripsSource().acceptReqTrip(itemTravel.id.toString())
                            adapter.travels.remove(itemTravel)
                        } else {
                            SourceProviderHolder.sourcesProvider.getTripsSource().joinTrip(itemTravel.id.toString())
                            adapter.travels.remove(itemTravel)
                        }
                    }catch (e: Exception) {
                        ToastNotify(context, e.message ?: "Ошибка добавления")
                    }
                }

                adapter.notifyDataSetChanged()
            }
        })
        binding.listItem.adapter = adapter
        binding.listItem.layoutManager = LinearLayoutManager(context)


        if (flagMode) {
            runBlocking {
                try {
                    for (el in SourceProviderHolder.sourcesProvider.getReqTripsSource().getAllReqTrip()) {
                        travels.add(ReqTripsSourceToItemTravel(el))
                    }
                } catch (e: Exception) {
                    println("Ошибка " + e)
                }
            }

        } else {
            runBlocking {
                try {
                    for (el in SourceProviderHolder.sourcesProvider.getTripsSource().getAllTrip()) {
                        travels.add(TripsResponseBodyDtoToItemTravel(el))
                    }
                }catch (e: Exception) {
                    println("Ошибка " + e)
                }
            }
        }


        adapter.travels = travels


    }

    private fun TripsResponseBodyDtoToItemTravel(el: TripsResponseBodyDto):ItemTravel {
        with (el) {
            val itemTravel: ItemTravel = ItemTravel(
                el.id,
                el.driver.name ?: el.driver.phone,
                el.fromName ?: " ",
                el.toName ?: "",
                "${(0..5).random()}." + "${(0..9).random()}",
                "${(0..5).random()}." + "${(0..9).random()}",
                el.date?.split("T")?.get(1)?.substring(0, 5) ?: "",
                el.date?.substring(0, 10) ?: " ",
                    el.priceForPlace.toString()
            )
            return itemTravel
        }

    }

    private fun ReqTripsSourceToItemTravel(el: ReqTripsResponseBodyDto):ItemTravel {
        with (el) {
            val itemTravel: ItemTravel = ItemTravel(
                el.id,
                el.owner.name ?: el.owner.phone,
                el.fromName ?: " ",
                el.toName ?: "",
                "${(0..5).random()}." + "${(0..9).random()}",
                "${(0..5).random()}." + "${(0..9).random()}",
                el.date?.split("T")?.get(1)?.substring(0, 5) ?: "",
                el.date?.substring(0, 10) ?: " ",
                el.priceForPlace.toString()
            )
            return itemTravel
        }

    }

}