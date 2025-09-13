# Authenticity Validator for Academia

A comprehensive digital platform for detecting and preventing fake degrees and certificates using AI-powered verification.

## Features

### 🤖 AI-Powered Verification
- **OCR Text Extraction**: Advanced image preprocessing and text extraction
- **Machine Learning Validation**: Pattern recognition and similarity matching
- **Database Cross-Verification**: Real-time verification against institutional databases
- **Confidence Scoring**: AI-generated confidence scores for verification results

### 🔍 Certificate Processing
- **Multi-Format Support**: PNG, JPG, JPEG image formats
- **Real-time Processing**: Live progress tracking with detailed stages
- **Data Extraction**: Automatic extraction of student details, grades, and institutional information
- **Format Validation**: Institution-specific certificate format verification

### 📊 Comprehensive Dashboard
- **Verification Statistics**: Real-time analytics and trends
- **Institution Management**: Verified institution database
- **Fraud Detection**: Alert system for suspicious activities
- **Activity Monitoring**: Recent verification history and patterns

### 🏛️ Institution Integration
- **Bulk Upload Support**: Mass certificate verification capabilities
- **API Integration**: RESTful APIs for institutional systems
- **Role-Based Access**: Different access levels for various user types
- **Audit Trails**: Complete verification history and logs

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication
- **Vite** for development and building

### Backend (Python)
- **FastAPI** for REST API
- **OpenCV** for image processing
- **Tesseract OCR** for text extraction
- **scikit-learn** for machine learning
- **Pandas** for data processing
- **Pillow** for image manipulation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Tesseract OCR

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authenticity-validator
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Python Dependencies**
   ```bash
   cd python_backend
   pip install -r requirements.txt
   ```

4. **Install Tesseract OCR**
   
   **Ubuntu/Debian:**
   ```bash
   sudo apt-get install tesseract-ocr
   ```
   
   **macOS:**
   ```bash
   brew install tesseract
   ```
   
   **Windows:**
   Download from: https://github.com/UB-Mannheim/tesseract/wiki

### Running the Application

1. **Start the Python Backend**
   ```bash
   cd python_backend
   python start_server.py
   ```
   The API will be available at `http://localhost:8000`

2. **Start the Frontend**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### API Documentation

Once the Python backend is running, visit:
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Verified Institutions**: http://localhost:8000/institutions

## Usage

### Certificate Verification Process

1. **Upload Certificate**: Drag and drop or select an image file
2. **AI Processing**: The system will:
   - Preprocess the image for optimal OCR
   - Extract text using Tesseract OCR
   - Parse and structure the certificate data
   - Verify against institutional databases
   - Generate confidence scores and flags

3. **Review Results**: View detailed verification results including:
   - Extracted certificate information
   - Verification confidence score
   - Matched fields and discrepancies
   - Institution verification status
   - AI-generated flags and alerts

### Supported Certificate Formats

The system can process certificates from various institutions with different formats:
- **Ranchi University**: Format `RU/[DEPT]/YYYY/XXX`
- **NIT Jamshedpur**: Format `NIT/[DEPT]/YYYY/XXXX`
- **Jharkhand University**: Format `JU/[DEPT]/YYYY/XXX`

## AI Verification Process

### 1. Image Preprocessing
- Noise reduction using OpenCV
- Adaptive thresholding for better text clarity
- Morphological operations for cleanup

### 2. OCR Text Extraction
- Tesseract OCR with custom configuration
- Character whitelist for academic documents
- Multi-language support

### 3. Data Extraction
- Regex pattern matching for structured data
- Named entity recognition for student information
- Course and institution identification

### 4. Verification Logic
- Database cross-referencing
- Text similarity analysis using TF-IDF
- Format validation against institutional standards
- Confidence scoring based on multiple factors

### 5. Fraud Detection
- Anomaly detection for suspicious patterns
- Duplicate certificate identification
- Invalid institution flagging
- Temporal validation (graduation dates)

## Security Features

- **Data Privacy**: Secure handling of student information
- **Access Control**: Role-based permissions
- **Audit Logging**: Complete verification trails
- **Encryption**: Secure data transmission
- **Rate Limiting**: API abuse prevention

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the API documentation at `/docs`

## Roadmap

- [ ] PDF document support
- [ ] Blockchain integration for certificate hashing
- [ ] Mobile application
- [ ] Advanced fraud detection algorithms
- [ ] Multi-language OCR support
- [ ] Real-time institutional API integration
- [ ] Batch processing capabilities
- [ ] Advanced analytics and reporting