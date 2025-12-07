# SnackVerse - E-Commerce Platform

## Project Overview
SnackVerse is a web-based e-commerce platform designed for purchasing snacks. The project features user registration and login authentication, product browsing, shopping cart management, and checkout functionality with receipt generation.

---

## How to Run the Project

### Prerequisites
- **Web Browser**: Chrome, Firefox, Safari, Edge, or any modern web browser
- **No installation required** - This is a client-side web application

### Setup Instructions

1. **Clone or Download the Repository**
   - Clone the repository or download all project files to a local directory
   - Ensure all files are in the same directory

2. **Open the Application**
   - Open `index.html` in your web browser
   - Alternatively, right-click `index.html` and select "Open with" → your preferred browser

3. **Navigate Through the Application**
   - Start at the About Us page (index.html)
   - Create a new account via the Registration page
   - Log in with your registered credentials
   - Browse and purchase products

---

## Login Credentials

### Test Account (Pre-registered)
To test the application, you can create a new account through the registration page with the following requirements:

**Registration Requirements:**
- **TRN Format**: XXX-XXX-XXX (e.g., 123-456-789)
- **Age**: Must be at least 18 years old
- **Email**: Valid email format (e.g., user@example.com)
- **Password**: Minimum 8 characters
- **Phone Number**: Valid phone format
- **Gender**: Select from dropdown

**Example Test Credentials:**
- **TRN**: 123-456-789
- **Password**: TestPass123 (minimum 8 characters)

*Note: User credentials are stored locally in the browser's localStorage. They will persist across sessions until the browser cache is cleared.*

---

## Group Members

| Name | Role | ID |
|------|------|-----|
| Ajani Adlam | Developer | |
| Daynea Chambers | Developer | 2400660 |
| Carlos Rodriguez | Developer | |
| Latanya Sweeney | Developer | |
| Katrina Watson | Developer | |


## Frameworks & Tools Used

### Frontend Technologies
- **HTML5** - Markup structure
- **CSS3** - Styling and responsive design
- **JavaScript (Vanilla)** - Client-side logic and interactivity

### Data Storage
- **localStorage** - Local browser storage for user registration data and shopping cart items

### Development Tools
- **Git** - Version control
- **GitHub Pages** - Hosting and deployment

### Browser APIs Used
- **DOM API** - Document manipulation
- **localStorage API** - Data persistence
- **Form Validation API** - Input validation

---

## Project Structure

```
latanyasweeneyia2.github.io/
├── index.html              # About Us / Home page
├── register.html           # User registration page
├── register.js             # Registration logic and validation
├── login.html              # User login page
├── login.js                # Login authentication logic
├── Products.html           # Product listing page
├── products.js             # Product management and filtering
├── Cart.html               # Shopping cart page
├── cart.js                 # Cart functionality (add, remove, update)
├── checkout.html           # Checkout page
├── checkout.js             # Checkout processing
├── receipt.html            # Order receipt page
├── receipt.js              # Receipt generation
├── reset.html              # Password reset page
├── reset.js                # Password reset logic
├── style.css               # Global stylesheet
```

---

## Key Features

### 1. User Authentication
- User registration with validation
- Login authentication using localStorage
- Account lockout after 3 failed login attempts
- Password reset functionality

### 2. Product Management
- Browse available snacks
- Product details and pricing

### 3. Shopping Cart
- Add/remove items from cart
- Update item quantities
- Real-time cart total calculation
- Cart persistence using localStorage

### 4. Checkout & Orders
- Secure checkout process
- Order total calculation with taxes
- Receipt generation
- Order history tracking

## Technical Details

### Data Validation

**Registration Validation:**
- All fields are required
- Age verification (minimum 18 years)
- Email format validation
- TRN format: XXX-XXX-XXX (9 digits with dashes)
- Password minimum length: 8 characters
- Password confirmation matching
- Duplicate TRN prevention

**Login Validation:**
- Both TRN and password required
- Case-sensitive password matching
- Account lockout after 3 failed attempts

---

## File Descriptions

### HTML Files
- **index.html** - Welcome and about page with navigation
- **register.html** - Registration form
- **login.html** - Login form
- **Products.html** - Product catalog
- **Cart.html** - Shopping cart display
- **checkout.html** - Order checkout
- **receipt.html** - Order confirmation and receipt
- **reset.html** - Password recovery

### JavaScript Files
- **register.js** - Handles user registration and data validation
- **login.js** - Manages login authentication
- **products.js** - Controls product display and filtering
- **cart.js** - Manages shopping cart operations
- **checkout.js** - Processes orders
- **receipt.js** - Generates order receipts
- **reset.js** - Handles password reset

### CSS
- **style.css** - Contains all styling for the application

## Troubleshooting

### Issue: Login not working
**Solution**: 
- Ensure you have registered an account first
- Check that TRN and password are entered correctly
- Clear browser cache and try again
- Make sure browser allows localStorage

### Issue: Cart items disappearing
**Solution**:
- Check if browser's localStorage is enabled
- Don't clear browser cache/history while using the app
- Try using a different browser

### Issue: Password reset not working
**Solution**:
- Verify the TRN is correct and registered
- Enter matching passwords
- Password must be at least 8 characters
