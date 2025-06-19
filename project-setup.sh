#!/bin/bash

echo "🚀 Setting up GQ Security Platform (Web & Mobile)"

# Create main project structure
mkdir -p GQSecurity/{web,mobile,shared}

# Web Project Setup
cd GQSecurity/web
npx create-next-app@latest . --typescript --tailwind --app --src-dir --router --eslint --import-alias "@/*"

# Mobile Project Setup (React Native)
cd ../mobile
npx react-native init GQSecurityApp --template react-native-template-typescript

# Shared Code Setup
cd ../shared
npm init -y
npm install typescript @types/node --save-dev

# Create shared types and utilities
mkdir -p src/{types,utils,constants,api}

echo "✅ Project structure created successfully!"