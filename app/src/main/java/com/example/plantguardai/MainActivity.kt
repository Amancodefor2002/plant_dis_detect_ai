package com.example.plantguardai

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.plantguardai.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupClickListeners()
        setupBottomNavigation()
    }

    private fun setupClickListeners() {
        binding.scanButton.setOnClickListener {
            startActivity(Intent(this, CameraActivity::class.java))
        }

        binding.uploadButton.setOnClickListener {
            // TODO: Will implement image upload functionality
            Toast.makeText(this, "Image upload feature coming soon!", Toast.LENGTH_SHORT).show()
        }

        binding.searchInput.setOnClickListener {
            // TODO: Will implement search functionality
            Toast.makeText(this, "Search feature coming soon!", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupBottomNavigation() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_home -> {
                    // Already on home
                    true
                }
                R.id.navigation_history -> {
                    Toast.makeText(this, "History coming soon!", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.navigation_community -> {
                    Toast.makeText(this, "Community feature coming soon!", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.navigation_settings -> {
                    Toast.makeText(this, "Settings coming soon!", Toast.LENGTH_SHORT).show()
                    true
                }
                else -> false
            }
        }
    }
} 