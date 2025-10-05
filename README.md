# NEETaspire - NEET Preparation Platform

A comprehensive React-based web application for NEET 2026 preparation with integrated study tools, practice tests, and community features.

## Features

### 🔐 Authentication
- **Secure Login/Signup**: Email and password-based authentication
- **Auto Username Generation**: Unique usernames generated from user names
- **Supabase Integration**: Robust backend with PostgreSQL database

### 🏠 Home Dashboard  
- **Welcome Interface**: Personalized greeting for logged-in users
- **Quick Access Menu**: Easy navigation to all platform features
- **Modern UI**: Cosmic-themed interface matching NEETaspire branding

### 💬 Chat System
- **Real-time Chat**: Connect with fellow NEET aspirants
- **Text Messaging**: Send and receive messages instantly
- **Username Display**: Unique usernames for identification
- **Message History**: Persistent chat history

### 📚 Practice Mode
- **Subject Selection**: Choose from Physics, Chemistry, Botany, Zoology
- **Chapter Selection**: Individual chapters or "All Chapters" option
- **Customizable Tests**: 10-100 questions per practice session
- **Detailed Results**: Complete performance analysis with explanations

### ⏱️ Test Mode
- **Multi-Subject Tests**: Select any combination of subjects/chapters
- **180 Question Limit**: Maximum questions from selected chapters
- **3-Hour Timer**: Countdown timer with visual warnings
- **Question Palette**: Easy navigation between questions
- **Comprehensive Results**: Subject-wise analysis and detailed scoring

### 📊 Analytics & Results
- **Performance Tracking**: Score percentages and accuracy metrics
- **Question-wise Analysis**: Detailed breakdown of correct/incorrect/unattempted
- **Subject-wise Performance**: Individual subject scoring and analysis
- **Time Tracking**: Monitor time taken for completion

## Technology Stack

- **Frontend**: React 18, React Router DOM
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Styling**: Custom CSS with cosmic theme
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Row Level Security

## Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `email`: VARCHAR (Unique)
- `name`: VARCHAR
- `phone`: VARCHAR
- `username`: VARCHAR (Unique)
- `created_at`: TIMESTAMP

### Questions Table
- `id`: SERIAL (Primary Key)
- `chapter`: VARCHAR
- `subject`: VARCHAR
- `question`: TEXT
- `option_a`: TEXT
- `option_b`: TEXT
- `option_c`: TEXT
- `option_d`: TEXT
- `answer`: VARCHAR(1)
- `explanation`: TEXT
- `created_at`: TIMESTAMP

### Chat Messages Table
- `id`: SERIAL (Primary Key)
- `sender_id`: UUID (Foreign Key)
- `sender_username`: VARCHAR
- `message`: TEXT
- `created_at`: TIMESTAMP

### Test Results Table
- `id`: SERIAL (Primary Key)
- `user_id`: UUID (Foreign Key)
- `test_type`: VARCHAR
- `subjects`: JSONB
- `chapters`: JSONB
- `total_questions`: INTEGER
- `correct_answers`: INTEGER
- `incorrect_answers`: INTEGER
- `unattempted`: INTEGER
- `score_percentage`: DECIMAL
- `time_taken`: INTEGER
- `detailed_results`: JSONB
- `created_at`: TIMESTAMP

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   - Create a new Supabase project
   - Run the SQL commands from `src/supabaseClient.js`
   - Update environment variables if needed

3. **Upload Questions Database**
   - Use the provided CSV file with 100,000+ NEET questions
   - Upload to Supabase using the dashboard or bulk import

4. **Start Development Server**
   ```bash
   npm start
   ```

## CSV Upload Instructions

The platform supports CSV files with the following format:
```
Chapter,Subject,Question,Option_A,Option_B,Option_C,Option_D,Answer,Explanation
```

Upload your question database through Supabase dashboard or use the bulk import feature.

## Features Coming Soon

- **NEET Premium**: Most predicted questions bank
- **Video Explanations**: Enhanced learning with video content
- **Performance Analytics**: Advanced insights and recommendations
- **Mobile App**: Native mobile applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and queries, contact the development team or create an issue in the repository.

---

**NEETaspire** - Your ultimate companion for NEET 2026 success! 🚀
