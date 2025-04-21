package com.example.plantguardai

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.plantguardai.utils.UserManager
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

class SignupActivity : AppCompatActivity() {
    private lateinit var fullNameInputLayout: TextInputLayout
    private lateinit var emailInputLayout: TextInputLayout
    private lateinit var passwordInputLayout: TextInputLayout
    private lateinit var confirmPasswordInputLayout: TextInputLayout

    private lateinit var fullNameInput: TextInputEditText
    private lateinit var emailInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText
    private lateinit var confirmPasswordInput: TextInputEditText

    private lateinit var signupButton: MaterialButton
    private lateinit var loginLink: View
    private lateinit var backButton: View
    private lateinit var googleSignInButton: SignInButton
    private lateinit var googleSignInClient: GoogleSignInClient

    companion object {
        private const val RC_SIGN_IN = 9001
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        // Configure Google Sign In
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        initializeViews()
        setupListeners()
    }

    private fun initializeViews() {
        fullNameInputLayout = findViewById(R.id.fullNameInputLayout)
        emailInputLayout = findViewById(R.id.emailInputLayout)
        passwordInputLayout = findViewById(R.id.passwordInputLayout)
        confirmPasswordInputLayout = findViewById(R.id.confirmPasswordInputLayout)

        fullNameInput = findViewById(R.id.fullNameInput)
        emailInput = findViewById(R.id.emailInput)
        passwordInput = findViewById(R.id.passwordInput)
        confirmPasswordInput = findViewById(R.id.confirmPasswordInput)

        signupButton = findViewById(R.id.signupButton)
        loginLink = findViewById(R.id.loginLink)
        backButton = findViewById(R.id.backButton)
        googleSignInButton = findViewById(R.id.googleSignInButton)
    }

    private fun setupListeners() {
        signupButton.setOnClickListener { validateAndSignup() }
        loginLink.setOnClickListener { navigateToLogin() }
        backButton.setOnClickListener { onBackPressedDispatcher.onBackPressed() }
        googleSignInButton.setOnClickListener { startGoogleSignIn() }
    }

    private fun startGoogleSignIn() {
        val signInIntent = googleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == RC_SIGN_IN) {
            try {
                val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                val account = task.getResult(ApiException::class.java)
                // Handle successful sign in
                val email = account.email
                if (email != null) {
                    // Create user in your system
                    if (!UserManager.userExists(email)) {
                        UserManager.addUser(
                            email = email,
                            password = "", // No password needed for Google Sign In
                            fullName = account.displayName ?: "Google User"
                        )
                        Toast.makeText(this, "Account created successfully!", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this, "Account already exists. Please log in.", Toast.LENGTH_SHORT).show()
                    }
                    navigateToLogin()
                }
            } catch (e: ApiException) {
                Toast.makeText(this, "Google sign in failed: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun validateAndSignup() {
        // Reset errors
        fullNameInputLayout.error = null
        emailInputLayout.error = null
        passwordInputLayout.error = null
        confirmPasswordInputLayout.error = null

        val fullName = fullNameInput.text.toString().trim()
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString()
        val confirmPassword = confirmPasswordInput.text.toString()

        when {
            TextUtils.isEmpty(fullName) -> {
                fullNameInputLayout.error = "Please enter your full name"
                return
            }
            TextUtils.isEmpty(email) -> {
                emailInputLayout.error = "Please enter your email"
                return
            }
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                emailInputLayout.error = "Please enter a valid email address"
                return
            }
            email == "admin@plantguard.com" -> {
                emailInputLayout.error = "This email is reserved"
                return
            }
            TextUtils.isEmpty(password) -> {
                passwordInputLayout.error = "Please enter a password"
                return
            }
            password.length < 8 -> {
                passwordInputLayout.error = "Password must be at least 8 characters"
                return
            }
            password != confirmPassword -> {
                confirmPasswordInputLayout.error = "Passwords do not match"
                return
            }
            else -> handleSignup(fullName, email, password)
        }
    }

    private fun handleSignup(fullName: String, email: String, password: String) {
        // Store user credentials
        UserManager.addUser(email, password, fullName)
        
        Toast.makeText(this, "Account created successfully! Please log in.", Toast.LENGTH_SHORT).show()
        navigateToLogin()
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
} 