const fs = require('fs');
let text = fs.readFileSync('src/pages/Admin.js', 'utf8');

const replacement = `"use client";
import React, { useState } from 'react';
import { Upload, Video, Image as ImageIcon, Trash2, Link, Check, AlertCircle, Lock, Eye, EyeOff, Loader2, FileText, PenTool, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import API_URL from '../config/api';
import ReviewGenerator from '../components/ReviewGenerator';

const AdminPanel = () => {
    const { addGalleryImage, addVideoItem, addBlogItem, galleryImages, videoList, blogList, removeGalleryImage, removeVideoItem, removeBlogItem, loading } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos' | 'blogs' | 'reviews'

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password`;

text = text.replace(/"use client";[\s\n\r]*\/\/ Admin Password/, replacement);
fs.writeFileSync('src/pages/Admin.js', text);
console.log('Admin file fixed');
