package com.example.plant_disease_detection

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.plant_disease_detection.databinding.ActivityDetectionBinding

class DetectionActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDetectionBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetectionBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Get the image path or URI from intent
        val imagePath = intent.getStringExtra(EXTRA_IMAGE_PATH)
        if (imagePath != null) {
            // Load and display the image
            val bitmap = if (imagePath.startsWith("content://")) {
                // Load from URI
                val uri = Uri.parse(imagePath)
                val inputStream = contentResolver.openInputStream(uri)
                BitmapFactory.decodeStream(inputStream)
            } else {
                // Load from file path
                BitmapFactory.decodeFile(imagePath)
            }
            
            if (bitmap != null) {
                binding.capturedImage.setImageBitmap(bitmap)
                startDetection()
            } else {
                finish() // Close activity if image loading fails
            }
        } else {
            finish() // Close activity if no image
        }
    }

    private fun startDetection() {
        // Show progress
        binding.progressBar.visibility = View.VISIBLE
        binding.detectionStatus.text = "Analyzing plant..."
        binding.resultText.visibility = View.GONE

        // Simulate detection process (replace with actual ML model)
        binding.progressBar.postDelayed({
            // Hide progress
            binding.progressBar.visibility = View.GONE
            binding.detectionStatus.text = "Analysis Complete"
            
            // Show result
            binding.resultText.text = "Your plant appears to be healthy.\n\nConfidence: 95%"
            binding.resultText.visibility = View.VISIBLE
        }, 3000) // Simulated 3-second analysis
    }

    companion object {
        const val EXTRA_IMAGE_PATH = "image_path"
    }
} 