package com.example.plantguardai.models

import com.example.plantguardai.utils.UserManager

data class User(
    val id: String,
    val email: String,
    val name: String,
    val role: UserManager.UserRole,
    val joinDate: String,
    val lastLogin: String,
    val isActive: Boolean = true
) 