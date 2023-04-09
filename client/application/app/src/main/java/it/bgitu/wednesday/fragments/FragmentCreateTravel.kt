package it.bgitu.wednesday.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import  it.bgitu.wednesday.databinding.FragmentCreateTravelBinding
import com.google.android.material.datepicker.MaterialDatePicker
import java.util.*


class FragmentCreateTravel: Fragment() {
    private lateinit var binding: FragmentCreateTravelBinding

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

        binding.buttonSetDate.setOnClickListener {
            openDatePicker()

        }
    }

    private fun openDatePicker() {
        val builder = MaterialDatePicker.Builder
            .datePicker()
            .setSelection(MaterialDatePicker.todayInUtcMilliseconds())
            .setTitleText("Select a date")
        val picker = builder.build()

        picker.addOnPositiveButtonClickListener { dateInMillis ->
            val calendar = Calendar.getInstance()
            calendar.timeInMillis = dateInMillis

            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val day = calendar.get(Calendar.DAY_OF_MONTH)
            val selectedDate = "$day/${month + 1}/$year"

            binding.mainText.text = selectedDate
        }

        picker.show(childFragmentManager, picker.toString())

    }
}