package it.bgitu.wednesday.fragments

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager

import android.location.LocationManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory

import com.google.android.gms.maps.SupportMapFragment
import it.bgitu.wednesday.R
import it.bgitu.wednesday.databinding.FragmentFindTravelBinding
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.*
import com.google.android.material.datepicker.MaterialDatePicker
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.MaterialTimePicker.INPUT_MODE_CLOCK
import com.google.android.material.timepicker.TimeFormat
import it.bgitu.wednesday.MODE_CACHE
import it.bgitu.wednesday.MainActivity
import it.bgitu.wednesday.network.SourceProviderHolder
import it.bgitu.wednesday.network.reqTrips.ReqTripsRequestBodyDto
import it.bgitu.wednesday.network.trips.TripsRequestBodyDto
import it.bgitu.wednesday.utils.ToastNotify
import kotlinx.coroutines.runBlocking
import java.util.*
import kotlin.collections.ArrayList

class FragmentFindTravel : Fragment(), OnMapReadyCallback, GoogleMap.OnMapClickListener,
    GoogleMap.OnMarkerClickListener {
    private lateinit var binding: FragmentFindTravelBinding
    private lateinit var googleMap: GoogleMap
    private lateinit var locationManager: LocationManager

    private var arrayListOfMarker: ArrayList<Marker> = arrayListOf()
    private var maxMarkersCount: Int = 1
    private var countPlace = 1
    private var dateString: String? = null
    private var dateFormat = "yyyy-MM-ddTHH:mm:ss.SSSZ"

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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setLocation()

        val sharedPref = activity?.getSharedPreferences("myCache", Context.MODE_PRIVATE)
        val isPassenger = !sharedPref!!.getBoolean(MODE_CACHE, false)

        binding.title.text = "Ввод точки: start"

        if (isPassenger) {
            binding.layoutToInclude.buttonCreate.text = "Создать заявку"
        }


        binding.bottomAddPoint.setOnClickListener {
            if (arrayListOfMarker.size == 1) {
                googleMap.clear()
                maxMarkersCount++
                binding.title.text = "Ввод точки: END"
            } else if (arrayListOfMarker.size >= 2) {
                binding.groupVisible.visibility = View.GONE
                binding.layoutToInclude.root.visibility = View.VISIBLE
            }

        }

        binding.bottomRemovePoint.setOnClickListener {
            googleMap.clear()
            maxMarkersCount = 1
            arrayListOfMarker = arrayListOf()
            binding.title.text = "Ввод точки: START"
        }

        binding.bottomSetGeo.setOnClickListener {
            if (arrayListOfMarker.size < maxMarkersCount) {
                setLocation()
            }
        }

        binding.layoutToInclude.buttonCountainer.setOnClickListener {
            if (countPlace < 4) {
                countPlace++
                binding.layoutToInclude.numberPlace.text = "Количестко мест: $countPlace"
            }
        }

        binding.layoutToInclude.buttonMinus.setOnClickListener {
            if (countPlace > 1) {
                countPlace--
                binding.layoutToInclude.numberPlace.text = "Количестко мест: $countPlace"
            }
        }

        binding.layoutToInclude.buttonBack.setOnClickListener {
            binding.groupVisible.visibility = View.VISIBLE
            binding.layoutToInclude.root.visibility = View.GONE
        }

        binding.layoutToInclude.buttonCreate.setOnClickListener {
            if (binding.layoutToInclude.price.text.isEmpty()) {
                ToastNotify(context, "Введите цену")
                return@setOnClickListener;
            } else if (binding.layoutToInclude.price.text.isEmpty()) {
                ToastNotify(context, "Введите дату")
                return@setOnClickListener;
            } else if (binding.layoutToInclude.price.text.isEmpty()) {
                ToastNotify(context, "Введите время")
                return@setOnClickListener;
            }

            val from: String = arrayListOfMarker.get(0).position.latitude.toString() +
                    "|" + arrayListOfMarker.get(0).position.longitude.toString()
            val to: String = arrayListOfMarker.get(1).position.latitude.toString() +
                    "|" + arrayListOfMarker.get(1).position.longitude.toString()

            runBlocking {
                try {
                    if (isPassenger) {
                        SourceProviderHolder
                            .sourcesProvider
                            .getReqTripsSource()
                            .createReqTrip(
                                ReqTripsRequestBodyDto(
                                from, to,
                                dateString!!,
                                countPlace,
                                Integer.parseInt(binding.layoutToInclude.price.text.toString())
                            )
                            )
                    } else {
                        SourceProviderHolder
                            .sourcesProvider
                            .getTripsSource()
                            .createTrip(TripsRequestBodyDto(
                                from, to,
                                dateString!!,
                                countPlace,
                                Integer.parseInt(binding.layoutToInclude.price.text.toString())
                            ))
                    }
                    activity
                        ?.supportFragmentManager!!
                        .beginTransaction()
                        .replace(R.id.fragment_container, FragmentActionTravel.newInstance())
                        .commit()
                    MainActivity().updateMeInfo()
                } catch (e: Exception) {
                    println(e.message)
                }
            }
        }

        binding.layoutToInclude.setDate.setOnClickListener {
            openDatePicker()
        }

        binding.layoutToInclude.setTime.setOnClickListener {
            openTimePicker()
        }

    }

    override fun onMapReady(googleMap: GoogleMap) {
        this.googleMap = googleMap

        // Установка слушателя кликов по карте
        this.googleMap.setOnMapClickListener(this)
        this.googleMap.setOnMarkerClickListener(this)

    }

    override fun onMapClick(latLng: LatLng) {
        // Добавление маркера на карту
        if (arrayListOfMarker.size < maxMarkersCount) {
            val marker = googleMap.addMarker(MarkerOptions().position(latLng).title("Маркер"))

            when (arrayListOfMarker.size) {
                0 -> marker!!.tag = "start"
                1 -> marker!!.tag = "end"
            }

            marker!!.position.latitude
            arrayListOfMarker.add(marker)
            println("aad : " + marker.tag)
        }

    }

    override fun onMarkerClick(marker: Marker): Boolean {
        // Проверка, что кликнули на нужном маркере
        if (binding.groupVisible.visibility == View.GONE) {
            return false
        }

        for (markerSaved in arrayListOfMarker) {
            if (marker.tag == markerSaved.tag) {
                arrayListOfMarker.remove(markerSaved)
                println("remove : " + markerSaved.tag)
                break
            }
        }
        marker.remove()
        return true
    }

    //private methods
    private fun setLocation() {

        // проверяем что разрешение получено
        locationManager = activity?.getSystemService(Context.LOCATION_SERVICE) as LocationManager

        // Проверяем разрешения на использование местоположения
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                requireActivity(),
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ),
                1
            )
            return
        }

        // Получаем местоположение пользователя
        val location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)
        val lat = LatLng(location!!.latitude, location.longitude)

        val mapFragment = childFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync { map ->

            // Добавление маркера
            googleMap = map

            // Добавление маркера
            val markerOptions = MarkerOptions()
                .position(lat)
                .title("you")
            val marker = googleMap.addMarker(markerOptions)
            when (arrayListOfMarker.size) {
                0 -> marker!!.tag = "start"
                1 -> marker!!.tag = "end"
            }
            arrayListOfMarker.add(marker!!)
            println("aad : " + marker.tag)

            // Установка позиции камеры
            val cameraPosition = CameraPosition.Builder()
                .target(lat)
                .zoom(12f)
                .build()
            googleMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
        }
        mapFragment.getMapAsync(this)
    }

    private fun openDatePicker() {
        val builder = MaterialDatePicker.Builder
            .datePicker()
            .setSelection(MaterialDatePicker.todayInUtcMilliseconds())
            .setTitleText("Select a date")
        val picker = builder.build()

        picker.addOnPositiveButtonClickListener { dateInMillis ->
            val calendar = Calendar.getInstance()
            var date = Date(calendar.timeInMillis)

            calendar.timeInMillis = dateInMillis

            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val day = calendar.get(Calendar.DAY_OF_MONTH)
            val selectedDate = "$day/${month + 1}/$year"

            dateString = String.format("%d-%02d-%02d", year, month + 1, day)
            binding.layoutToInclude.date.text = dateString
        }

        picker.show(childFragmentManager, picker.toString())

    }

    private fun openTimePicker() {
        val picker =
            MaterialTimePicker.Builder()
                .setInputMode(INPUT_MODE_CLOCK)
                .setTimeFormat(TimeFormat.CLOCK_24H)
                .setHour(12)
                .setMinute(10)
                .setTitleText("Select Appointment time")
                .build()

        picker.addOnPositiveButtonClickListener {
            val timeString = String.format("%02d:%02d", picker.hour, picker.minute)
            dateString += "T${timeString}:00.000Z"
            binding.layoutToInclude.time.text = timeString
        }

        picker.show(childFragmentManager, picker.toString())
    }

}

