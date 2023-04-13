package it.bgitu.wednesday.fragments

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.SoundEffectConstants
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.fragment.app.Fragment
import it.bgitu.wednesday.R
import it.bgitu.wednesday.databinding.ActivityMainBinding
import it.bgitu.wednesday.databinding.FragmentLoginBinding
import it.bgitu.wednesday.databinding.FragmentRegisterBinding
import it.bgitu.wednesday.network.Const
import it.bgitu.wednesday.network.SourceProviderHolder
import it.bgitu.wednesday.network.auth.AuthSource
import it.bgitu.wednesday.utils.ToastNotify
import kotlinx.coroutines.runBlocking

class FragmentReg : Fragment() {
    private lateinit var binding: FragmentRegisterBinding
    private lateinit var authAPi: AuthSource;

    companion object {
        fun newInstance(): FragmentReg {
            return FragmentReg()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentRegisterBinding.inflate(layoutInflater)
        authAPi = SourceProviderHolder.sourcesProvider.getAuthSource()
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.registerButton.setOnClickListener { signUp() }
        binding.haveAccountAuth.setOnClickListener { redirectToLogin() }

        val phoneET: EditText = binding.numberRegister
        phoneET.addTextChangedListener(object: TextWatcher {
            lateinit var oldText: String;

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                oldText = s.toString()
            }
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                if (s.toString().isEmpty()) {
                    phoneET.setText(oldText)
                    phoneET.setSelection(1)
                }
            }
            override fun afterTextChanged(s: Editable?) {}
        })
    }

    private fun signUp() {
        val phoneNumber = binding.numberRegister.text.toString()
        val password = binding.passRegister.text.toString()
        val passwordRepeat = binding.passRegisterRepeat.text.toString()

        if (password.length < 8 || password.length > 20) {
            ToastNotify(context, "Длина пароля должна быть больше 8 и меньше 20")
            return
        }

        if (password != passwordRepeat) {
            ToastNotify(context, "Пароли не совпадают")
            return;
        }

        runBlocking {
            try {
                val token = SourceProviderHolder.sourcesProvider.getAuthSource().registration(phoneNumber, password, Const.DEVICE_TOKEN ?: "")
                Const.TOKEN = token;
                activity?.getSharedPreferences("myCache", Context.MODE_PRIVATE)!!.edit().putString(token, "").apply()
                Const.TOKEN = token;
                activity
                    ?.getSharedPreferences("myCache", Context.MODE_PRIVATE)!!
                    .edit()
                    .putString(Const.TOKEN_CACHE, token)
                    .apply()
                ActivityMainBinding
                    .inflate(layoutInflater)
                    .bottomNavigation
                    .selectedItemId = R.id.item_1
                activity
                    ?.supportFragmentManager!!
                    .beginTransaction()
                    .replace(R.id.fragment_container, FragmentHome.newInstance())
                    .commit()
                ToastNotify(context, "Вы вошли")
            } catch (e: Exception)  {
                println(e)
                ToastNotify(context, "Неверный логин или пароль")
            }
        }
    }

    @SuppressLint("CommitTransaction", "ResourceType")
    private fun redirectToLogin() {
        val fragment = FragmentLogIn.newInstance()
        activity?.supportFragmentManager!!.beginTransaction().replace(R.id.fragment_container, fragment).commit()
    }
}