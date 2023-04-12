package it.bgitu.wednesday.myrecycle

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import it.bgitu.wednesday.databinding.ItemTravelBinding

interface ActionListener {
    fun select(itemTravel: ItemTravel)
}

class TravelsAdapter (private val actionListener: ActionListener):
    RecyclerView.Adapter<TravelsAdapter.TravelsViewHolder>(), View.OnClickListener {

    var travels: ArrayList<ItemTravel> = arrayListOf()
        set(newValue) {
            field = newValue
            notifyDataSetChanged()
        }

    class TravelsViewHolder (
        val binding: ItemTravelBinding
    ) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TravelsViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemTravelBinding.inflate(inflater, parent, false)

        binding.buttonAdd.setOnClickListener(this)

        return TravelsViewHolder(binding)
    }

    override fun getItemCount(): Int = travels.size

    override fun onBindViewHolder(holder: TravelsViewHolder, position: Int) {
        val travel = travels[position]

        with(holder.binding) {
            name.text = travel.name
            start.text= travel.startCity
            end.text= travel.endCity
            endDis.text = "~" + travel.endCityDistance +" км"
            startDis.text ="~" +  travel.startCityDistance +" км"
            time.text = travel.time
            date.text = travel.date
            price.text = travel.price + "р."
            buttonAdd.tag = travel
        }
    }

    override fun onClick(v: View) {
        val travel = v.tag as ItemTravel
        actionListener.select(travel)
    }
}