#!/usr/bin/env python3
import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False
    return True

def start_server():
    """Start the FastAPI server"""
    try:
        print("🚀 Starting Certificate Verification API server...")
        print("📍 Server will be available at: http://localhost:8000")
        print("📖 API documentation at: http://localhost:8000/docs")
        print("🔍 Health check at: http://localhost:8000/health")
        print("\n" + "="*50)
        
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Failed to start server: {e}")

if __name__ == "__main__":
    print("🔧 Setting up Certificate Verification API...")
    
    # Change to the python_backend directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Install requirements
    if install_requirements():
        # Start the server
        start_server()
    else:
        print("❌ Setup failed. Please check the error messages above.")