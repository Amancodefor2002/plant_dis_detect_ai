package com.example.plantguardai

import android.app.Application
import com.example.plantguardai.utils.UserManager

class PlantGuardApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        UserManager.initialize(this)
    }
} 